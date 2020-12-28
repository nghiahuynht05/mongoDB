function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
//=============COMMON================
define('SUCCESS', 200);
define('ERROR', 304);


//==============USER==================
define('USER_EXISTED', 10001);
define('USER_NOTFOUND', 10002);
define('isACTIVE', 10003);
define('WORNG_PASSWORD', 10004);