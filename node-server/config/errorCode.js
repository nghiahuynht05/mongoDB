function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

//= ==============VALIDATION==============
define('VALIDATION_ERROR', 400000);
define('AUTHORIZATION_ERROR', 400001);
define('MODULE_PERMISSION_DENIED', 400003);
define('FILE_CONTENT_INVALID', 400005);

//=============COMMON================
define('SUCCESS', 200);
define('ERROR', 304);


//==============USER==================
define('USER_EXISTED', 10001);
define('USER_NOTFOUND', 10002);
define('isACTIVE', 10003);
define('WORNG_PASSWORD', 10004);