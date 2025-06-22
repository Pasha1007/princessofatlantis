<?php

//ini_set('display_errors', 1);

//require_once '/var/www/html/rk_test/classes/session/session_factory.class.php'; // added 11022020

$SessionHandler = SessionFactory::CreateSession('redis');
$SessionHandler->init();


$_SESSION['acdc'] = 'acid';
$_SESSION['god'] = 'shiva';

$count = 0;
if (isset($_SESSION['count']))
    $count = $_SESSION['count'];

$_SESSION['count'] = $count + 1;

print_r($_SESSION);
