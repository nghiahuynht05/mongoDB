var _ = require('lodash');

var setSubDocValue = function (obj, keys, value) {
	if (keys.length > 1) {
		try {
			obj[keys[0]] = setSubDocValue(obj[keys[0]], keys.slice(1), value);
		} catch (error) {
			var msg = "KEY_NOT_FOUND_ERROR: " + keys[0] + " is not a property of " + obj;
			throw new Error(msg);
		}
	} else {
		obj[keys[0]] = value;
	}
	return obj;
}

var validateData = function (value) {
	try {
		return JSON.parse(value);
	} catch (error) {
		return value;
	}
}

module.exports = {
	setSubDocValue,
	validateData
}