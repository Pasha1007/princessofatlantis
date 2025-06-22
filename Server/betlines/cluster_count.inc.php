<?php

require_once 'ibetlines.inc.php';

class ClusterCountLines implements iBetLines
{
    
    private $game;
    private $round;
    private $neighbourhood_indices;
    private $indexes_included_in_cluster;
    private $cluster_wins;
    private $clusters;

    public function __construct(&$game, &$round)
    {
        $this->game = $game;
        $this->round = $round;
        $this->clusters = [];
        $this->cluster_wins = [];
        $this->indexes_included_in_cluster = [];
        
    }

    public function generateBetLines()
    {
       
        // $rows is dynamic for game guardianofprosperity . 
        //Its different for different reels(cols) in FS
        //
        // check thumble with index 
        
        $elementMatrix = $this->round->matrix;
        $position = $this->round->reelPointers;
        $matrixFlatten = $this->round->matrixFlatten;
        // $position = $this->round->reelPointers;
        $screenWins = $this->round->screenWins;
		$this->round->sticky_win_round = false;
        $this->round->blastPosition = [];
		$betline = [];
		$count = 0;
        $multiplier = 1;
        do {
            $data = $this->findClusters($elementMatrix);
            $this->clusters = $data[0];
            // print_r($this->clusters);
            if (count($this->clusters) > 0){
                $count += 1;
                $sym_key = $data[1];
                $pay_line = $data[2];
                $screenWins = $data[3];
                $multiplier = $data[4];

                $thumbile_data = $this->tumble($position,$elementMatrix, $this->clusters);
                $elementMatrix = $thumbile_data[0];
                $new_symbol_s = $thumbile_data[1];
                // $new_symbol_s = $thumbile_data[1];
                $matrixPosition = $thumbile_data[2];
                $position = $thumbile_data[3];
                
                $matrixFlatten = $this->round->generateFlatMatrix($elementMatrix);
                $matrixString = array2d_to_string($elementMatrix);
                $this->round->matrixFlatten = $matrixFlatten;
                $this->round->matrix = $elementMatrix;
                // $arr["screenWins"] = $screenWins;
                $arr["new_reel"] = $matrixString;
                $arr["new_symbols"] = $new_symbol_s;
                $arr["old_reel_symbol"] = $sym_key;
                $arr["screenWins"] = $screenWins;
                $arr["multiplier"] = $multiplier;
                $arr["postions"] = $matrixPosition;
                // print_r($pay_line);
                $betline = array_merge($betline,  $pay_line);
                array_push($this->round->miscPrizes ,$arr);
            }

            $this->round->betLines = $betline;
        } while ($this->clusters);
        // print_r($betline);
        if(count($betline) > 0){
            $this->round->numBetLines = count($betline);
        }
        $this->round->miscPrizes["count"] = $count;
        $this->round->postMatrixInfo['matrixString'] = $matrixString;

        // print_r($this->round->matrix);
        
        }
        function getNeighbors($x, $y) {
            $neighbors = [];
            if ($x > 0) $neighbors[] = [$x - 1, $y]; // Up
            if ($x < $this->game->numRows - 1) $neighbors[] = [$x + 1, $y]; // Down
            if ($y > 0) $neighbors[] = [$x, $y - 1]; // Left
            if ($y < $this->game->numColumns - 1) $neighbors[] = [$x, $y + 1]; // Right
            return $neighbors;
        }
        
        // Find clusters of symbols
        function findClusters($matrix) {
            $clusters = [];
            $poped_symbol = [];
            $bet_line = [];
            $total_multiplier = 1;
            $combinedArray = [];
            $multiplier = 1;
            $visited = array_fill(0, $this->game->numRows, array_fill(0, $this->game->numColumns, false));
            
            // Use dfs here, passing required variables explicitly
            for ($x = 0; $x < $this->game->numRows; $x++) {
                for ($y = 0; $y < $this->game->numColumns; $y++) {
                    if (!$visited[$x][$y]) {
                        $cluster = [];
                        $this->dfs($x, $y, $matrix[$x][$y], $cluster, $visited, $matrix); // Pass visited, matrix, and cluster
                        if (count($cluster) >= 5) {
                            // $multiplier_data = $this->handle_cluster_mutiplier_weight_table($this->round,count($cluster),$cluster);
                            $clusters[] = $cluster;
                            // $total_multiplier *= $multiplier_data[0];
                        //         $combinedArray = array_map(function($a, $b) {
                        //             if ($a == 0 && $b == 0) {
                        //                 return 0; // If both are zero, the result should be zero
                        //             }
                        //             return ($a > 0 ? $a : 1) * ($b > 0 ? $b : 1);
                        // }, $combinedArray, $multiplier_data[1]);
                            
                            array_push($bet_line,array($matrix[$x][$y] =>count($cluster), "multiplier"=> 1 ));
                            array_push($poped_symbol,$matrix[$x][$y]);
                        }
                    }
                }
            }
         
            return array($clusters,$poped_symbol,$bet_line, $combinedArray,$total_multiplier);
        }

        function dfs($x, $y, $symbol, &$cluster, &$visited, &$matrix) {
            $stack = [[$x, $y]];
            $cluster[] = [$x, $y];
            $visited[$x][$y] = true;
            // array_push($position, ($x * 7) + $y);
            while ($stack) {
                list($cx, $cy) = array_pop($stack);
                foreach ($this->getNeighbors($cx, $cy) as list($nx, $ny)) {
                    if ($nx >= 0 && $nx < $this->game->numRows && $ny >= 0 && $ny < $this->game->numColumns && !$visited[$nx][$ny] && $matrix[$nx][$ny] == $symbol) {
                        $visited[$nx][$ny] = true;
                        $stack[] = [$nx, $ny];
                        $cluster[] = [$nx, $ny];
                    }
                }
            }
        }
    
        function tumble($reel_pointer,&$matrix, $clusters) {
        
            $newsymbol_rev = "";
            $position = [];
            foreach ($clusters as $cluster) {
                foreach ($cluster as list($x, $y)) {
                    $matrix[$x][$y] = null;  // Mark as empty
                    
                }
            }
            
            // Let symbols fall down
            for ($y = 0; $y < $this->game->numColumns; $y++) {
                $new_symbols= "";
                $num = $reel_pointer[$y];
                $column = [];
                $newsymbol = [];
                for ($x = 0; $x < $this->game->numRows; $x++) {
                    if ($matrix[$x][$y] !== null) {
                        $column[] = $matrix[$x][$y];
                    }
                    else{
                        $n = (--$num + strlen($this->game->reels[$y])) % strlen($this->game->reels[$y]);
                        array_unshift($newsymbol, $this->game->reels[$x][$n]);
                        $new_symbols.= $this->game->reels[$x][$n];
                        array_push($position, ($x * 7) + $y);
                        $reel_pointer[$y] = $n;
                    }

                }
          
                strrev($new_symbols);
                $newsymbol_rev .= strrev($new_symbols);
                $newsymbol_rev .= ";";  
                // Fill empty spaces with new symbols from the top
                if (count($column) < $this->game->numRows) {
                    $column =  array_merge($newsymbol, $column);
                    
                }
                // Update the column in the matrix
                for ($x = 0; $x < $this->game->numRows; $x++) {
                    $matrix[$x][$y] = $column[$x];
                }
            }
        return array($matrix,$newsymbol_rev, $position, $reel_pointer);
    }

    function handle_cluster_mutiplier_weight_table($round,$bust_count, $cluster){
        $scatter_Mul = array_fill(0, $this->game->numRows * $this->game->numColumns, 0);;
        $featureConfig = $round->game->symbolConfig;
        if (
            !$featureConfig or !isset($featureConfig["symbol_multiplier"]) && !isset($featureConfig["symbol_multiplier"][$round->spinType])) {
                return array(1,$scatter_Mul);
            }
        $multiplier_value = 1;
        $symbol_multiplier_config = $round->game->symbolConfig["symbol_multiplier"][$round->spinType];
        $cluster_multiplier_config = $symbol_multiplier_config[0]["cluster_win_weight"];
        foreach ($cluster_multiplier_config as $range) {
            $max_mul = $range["max_multiplier"];
            if ($bust_count >= $range['minWin'] && $bust_count <= $range['maxWin']) {
                $weigh_table = $range["weight_table"];
                // print_r($weigh_table);
                $is_multiplier = $round->getMultiplierValue($weigh_table["total_weight"], $weigh_table["value"]);
                if($is_multiplier and  $weigh_table[$is_multiplier]){
                    $multiplier_weight = $weigh_table[$is_multiplier];
                    // print_r($multiplier_weight);
                    for ($i=0; $i < $bust_count; $i++) { 
                        $mul = 0;
                        $mul = $round->getMultiplierValue($multiplier_weight["total_weight"], $multiplier_weight["value"]);
                        
                        if ($mul > 1){
                            $scatter_Mul[($cluster[$i][0]*7) + $cluster[$i][1]] = $mul;
                            $multiplier_value *= $mul;
                        }
                        if($max_mul <= $multiplier_value){
                            $multiplier_value = $max_mul;
                            break;
                        }                        
                    }
                }
                break;
            }
        }
        return array($multiplier_value,$scatter_Mul);
    }

    }

?>
