de_iteratec_beacon.util = (function() {
    function isDefined(v) {
        if(typeof(v) === 'undefined') {
            return false;
        }

        return true;
    }

    function isSet(v) {
        return (isDefined(v) && v != null);
    }

    function isEmpty(v) {
        return !isDefined(v) || v.length == 0;
    }


    return {
        isDefined: isDefined,
        isSet: isSet,
        isEmpty: isEmpty
    };

})();
