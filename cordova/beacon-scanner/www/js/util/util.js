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
        return !isSet(v) || v.length == 0;
    }

    /**
     * @return boolean true: if we're running on a phone, false: we're running in a desktop browser
     */
    function isOnPhone() {
        return (document.URL.indexOf( 'http://' ) === -1) && (document.URL.indexOf( 'https://' ) === -1);
    }


    return {
        isDefined: isDefined,
        isSet: isSet,
        isEmpty: isEmpty,
        isOnPhone: isOnPhone
    };

})();
