<?php
$_REDIS_CONN = array(
		'servers' => array(
			'server1' => array(
			'host' => 'redis-core1', #'192.168.132.30',
			'port' => 6379,
			'password' => '',
			'db'   => 0)));

define('YES', 1);
define('NO', 0);
define('SESSION_EXPIRE_TIME', 3600);
define('REDIS_CONFIG', serialize($_REDIS_CONN));
