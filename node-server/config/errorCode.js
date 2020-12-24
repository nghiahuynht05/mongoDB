function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}
//= =============COMMON================
define('SUCCESS', 200);
define('ERROR', 304);