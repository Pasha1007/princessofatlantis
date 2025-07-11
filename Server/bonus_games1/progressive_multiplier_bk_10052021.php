<?php
# todo need to cap 25 cap
# todo during FS, we should not reset mult till last free sins
# todo need to use amount_type as well
# todo if there are scatter wins in any of the spins, do we need to increase the pg_mult ??

class SpinMultiplier implements iBonus {
    protected $game, $round, $accountId, $symbol, $bonusGameId, $scattersCount,
              $minMult;

    public function __construct(&$game, &$round, $accountId, $bonusGameId, $symbol, $scattersCount) {
        $scattersCount['total'] = isset($scattersCount[$symbol]) ? $scattersCount[$symbol]:0;
        $this->game = $game;
        $this->round = $round;
        $this->accountId = $accountId;
        $this->scattersCount = $scattersCount;
        $this->symbol = $symbol;
        $this->bonusGameId = $bonusGameId;
        $this->maxMultplier = 25;
    }

	public function checkAndGrantBonusGame() {
        $spin_type  = $this->round->spinType;
        $this->minMult = $this->game->bonusConfig['post_win_handlers']
            [$spin_type][0]['details']['default_mult'];

        if(isset($this->round->paylineWins['details']) &&
           $this->round->paylineWins['details'] !='' ) {
            $this->applySpinMult();
		} else {
            $this->increaseWinMult();
        }

        if(isset($this->round->freeSpins) && $this->round->freeSpins['spins_left'] <= 1) {
            $details_json = json_encode(array('spin_mult' => 0));
            $this->updateMultiplier($details_json);
		}
	}

	public function getStoredMult() {
		global $db;
		$account_id = $this->accountId;
		$game_id    = $this->game->gameId;
		$spin_type  = $this->round->spinType;

		$query =<<<QR
		SELECT id, details from gamelog.other_prizes
		WHERE game_id={$game_id} AND spin_type='{$spin_type}' AND account_id={$account_id}
QR;
		$result 	= $db->runQuery($query) or ErrorHandler::handleError(1, "SPINMULT_ERR1");
		$row_count 	= $db->numRows($result);
		$row 		= array();

		if($row_count > 0) {
			$row    = $db->fetchAssoc($result) or ErrorHandler::handleError(1, "SPINMULT_ERR2");
		}

		return array($row_count, $row);
	}

	// spin_type, game_id, account_id
	public function increaseWinMult() {
		global $db;
		$account_id = $this->accountId;
		$game_id    = $this->game->gameId;
		$spin_type  = $this->round->spinType;
		$details    = '';
		$min_mult   = $this->minMult;

		$query =<<<QR
		SELECT id, details from gamelog.other_prizes
		WHERE game_id={$game_id} AND spin_type='{$spin_type}' AND account_id={$account_id}
QR;
		$result = $db->runQuery($query) or ErrorHandler::handleError(1, "SPINMULT_ERR1");
		$row_count = $db->numRows($result);
        $pgMultiplier = $min_mult;

		if($row_count == 0) {
			$details = array('spin_mult' => $min_mult);
			$details_json = json_encode($details);
			$ins_qr =<<<QR
			INSERT INTO gamelog.other_prizes (game_id, account_id, spin_type, details)
			VALUES({$game_id}, {$account_id}, '{$spin_type}', '{$details_json}')
QR;
			$db->runQuery($ins_qr);
		}
		else {
			$row    	= $db->fetchAssoc($result) or ErrorHandler::handleError(1, "SPINMULT_ERR2");
			$mul_detail_arr = json_decode($row['details'], true);

            if($mul_detail_arr['spin_mult'] >= $this->maxMultplier) {
                $this->setBonusGamesWon($mul_detail_arr['spin_mult']);
                return;
            }

			$mul_detail_arr['spin_mult']++;
            $pgMultiplier = $mul_detail_arr['spin_mult'];
			$details_json 	= json_encode($mul_detail_arr);

			$this->updateMultiplier($details_json);
		}
        $this->setBonusGamesWon($pgMultiplier);
		// TODO remove below query
		$query =<<<QR
			REPLACE INTO gamelog.other_prizes (game_id, account_id, spin_type, details)
			VALUES({$game_id}, {$account_id}, '{$spin_type}')
QR;
	}

        public function applySpinMult() {
            $details = explode(";", $this->round->paylineWins['details']);
            list($row_count, $row)  = $this->getStoredMult();
            $total_win		    = 0;
            $prev_line_win          = 0;
            $payline_wins	    = array();

            if($row_count > 0) {
                $mul_detail_arr = json_decode($row['details'], true);
                $spin_mult = $mul_detail_arr['spin_mult'];
                if($mul_detail_arr['spin_mult'] < $this->maxMultplier) {
                    $spin_mult = $mul_detail_arr['spin_mult'] + 1;
                }

                $this->setBonusGamesWon($spin_mult);
                for ($i=0; $i < count($details) ; $i++) {
                    $temp           = explode(":", $details[$i]);
                    $prev_line_win  += $temp[1];
                    $temp[1]        = $temp[1] * $spin_mult;
                    $temp_str       = implode(':', $temp);
                    $total_win      += $temp[1];

                    array_push($payline_wins, $temp_str);
                }

                $payline_wins_str = implode(';', $payline_wins);
                $this->round->paylineWins['details'] = $payline_wins_str;
                //TODO Check if scree win is also included in old total win.
                //Subtract old line win and add new line win
                $this->round->winAmount = $this->round->winAmount - $prev_line_win + $total_win;
                //$this->round->winAmount = $total_win;
                if($this->round->spinType == 'normal') {
                    $this->resetWinMult($mul_detail_arr);
                }
            }
        }

    private function setBonusGamesWon($pgMultiplier)
    {
        array_push($this->round->bonusGamesWon, Array("progressive_multiplier" => $pgMultiplier));
        array_push($this->round->bonusGamesWon, Array(
            "type" => "progressive_multiplier",
            "multiplier" => $pgMultiplier));
    }
	public function resetWinMult($mult_detail_arr) {
		$mult_detail_arr['spin_mult'] 	= 0;
		$details_json    		= json_encode($mult_detail_arr);
		$this->updateMultiplier($details_json);
	}

	public function updateMultiplier($details_json) {
		global $db;

		$account_id = $this->accountId;
		$game_id    = $this->game->gameId;
		$spin_type  = $this->round->spinType;

		$up_qr =<<<QR
		UPDATE gamelog.other_prizes SET details='{$details_json}'
		WHERE game_id={$game_id} AND spin_type='{$spin_type}' AND account_id={$account_id}
QR;

		$db->runQuery($up_qr);
	}

	public function playBonusGame($pickedPosition) {

	}

	public function loadBonusGame() {
        global $db;

        # todo TODO add amount type as well
        $query =<<<QR
        SELECT id,
               spin_type,
               details
          FROM gamelog.other_prizes
         WHERE game_id={$this->game->gameId} AND
               account_id={$this->accountId}
QR;
        $result = $db->runQuery($query) or ErrorHandler::handleError(1, "SPINMULT_ERR1");
        $row_count 	= $db->numRows($result);

		if($row_count <= 0) {
			return;
		}

        $bonusGamesData = Array();

        while($row = $db->fetchAssoc($result)) {
            $details = json_decode($row['details'], true);
            array_push(
                $this->round->prevBonusGames, Array(
                    'type' => 'progressive_multiplier',
                    'multiplier' => $details['spin_mult'],
                    'spin_type' => $row['spin_type']));
        }
        #array_push($this->round->prevBonusGames, $bonusGamesData);
	}

}
?>
