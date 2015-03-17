function isDefined(v) {
    if(typeof(v) === 'undefined') {
        return false;
    }

    return true;
}
exports.isDefined = isDefined;

function isSet(v) {
    return (isDefined(v) && v != null);
}
exports.isSet = isSet;

function isEmpty(v) {
    return !isDefined(v) || v.length == 0;
}
exports.isEmpty = isEmpty;

function forEachKeyAndVal(v, fkt) {
    var i;
    for(i in v) {
        if(v.hasOwnProperty(i)) {
            fkt(i, v[i]);
        }
    }
}
exports.forEachKeyAndVal = forEachKeyAndVal;

function randomNumberBetweenLowerAndUpper(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}
exports.randomNumberBetweenLowerAndUpper = randomNumberBetweenLowerAndUpper;

/**
 * see: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @return {string}
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
exports.guid = guid;