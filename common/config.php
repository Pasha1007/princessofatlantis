<?php
if(!defined('SITE_ROOT') or !constant('SITE_ROOT')) { 
    define('SITE_ROOT', dirname(dirname(__FILE__)) . '/');
}
if(!defined('GE_ROOT') or !constant('GE_ROOT')) {
    define('GE_ROOT', SITE_ROOT . 'gameegnine/');
}
if(!defined('CLASS_ROOT') or !constant('CLASS_ROOT')) {
    define('CLASS_ROOT', SITE_ROOT . 'classes/'); 
}
if(!defined('COMMON_ROOT') or !constant('COMMON_ROOT')) {
    define('COMMON_ROOT', SITE_ROOT . 'common/'); 
}
if(!defined('SERVICES_ROOT') or !constant('SERVICES_ROOT')) {
    define('SERVICES_ROOT', SITE_ROOT . 'services/'); 
}
if(!defined('CDN_ENABLED') or !constant('CDN_ENABLED')) {
    define('CDN_ENABLED', True); 
}
if(!defined('CDN_URL') or !constant('CDN_URL')) {
    define('CDN_URL', "https://dev-games.progaindia.com/");
}

define('API_KEY', '1pGHjL4v5APT2RgS');
define('API_URL', 'https://dev-api.progaindia.com/v1/');

if(!defined('GAMES_CDN_URL') or !constant('GAMES_CDN_URL')) {
    if(defined('CDN_ENABLED') AND CDN_ENABLED === True) {
        define('GAMES_CDN_URL', CDN_URL);
	}
}
?>
