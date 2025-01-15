<?php
require_once 'session/session_factory.class.php';

$SessionHandler = SessionFactory::CreateSession('db');
$SessionHandler->init();
