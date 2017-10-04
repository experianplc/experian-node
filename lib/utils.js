'use-strict';

/**
 * Gets the deep value of property specified in the ns param.
 * Will always return undefined any properties don't exist or the default value
 *
 * @param {object} obj The object to inspect
 * @param {string} key Ordered properties that are the namespace to the property of interest.
 * @param {string} defaultValue The default value that will be returned if there is no value
*/
function get(obj, key, defaultValue) {
    return key.split('.').reduce((nestedObject, key) => {
        if (nestedObject && key in nestedObject) {
            return nestedObject[key];
        }
        return (defaultValue) ? defaultValue : undefined;
    }, obj);
}

module.exports.get = get;
