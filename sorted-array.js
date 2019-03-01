var SortedArray = (function () {
    var SortedArray = defclass({

        constructor: function (array, compare) {
            this.array   = [];
            this.compare = compare || compareDefault;
            var length   = array.length,
                index    = 0;
            while (index < length) this.insert(array[index++]);
        },
        insert: function (element) {
            var array   = this.array,
                compare = this.compare,
                high    = array.length-1,
                low     = 0,
                pos = -1,
                index,
                ordering;

            // The array is sorted. You must find the position of new element in O(log(n)), not O(n).
            while (high >= low) {
                index    = (high + low) / 2 >>> 0;
                ordering = compare(array[index], element);                
                if (ordering < 0) low  = index + 1;
                else if (ordering > 0) high = index - 1;
                else {
                    pos = index;
                    break;
                };
            }

            if (pos === -1) {
                // if element was not found, high < low.
                pos = high;
            }
            // This assures that equal elements inserted after will be in a higher position in array.
            // They can be equal for comparison purposes, but different objects with different data.
            // Respecting the chronological order can be important for many applications.
            pos++;
            high = array.length-1;
            while ((pos < high) && (compare(element, array[pos]) === 0)){
                pos++;
            }
            index = array.length;
            // Just to increase array size.
            array.push(element);            
            // Much faster. No need to elements swap.
            while (index > pos) {
                array[index] = array[--index];
            }
            // Set the new element on its correct position.
            array[pos] = element;

            return this;
        },
        search: function (element) {
            var array   = this.array,
                compare = this.compare,
                high    = array.length-1,
                low     = 0,
                // In most languages, inner variable declaration makes the code slower.
                index,
                ordering;

            while (high >= low) {
                index    = (high + low) / 2 >>> 0;
                ordering = compare(array[index], element);

                     if (ordering < 0) low  = index + 1;
                else if (ordering > 0) high = index - 1;
                else return index;
            }

            return -1;
        },
        remove: function (element) {
            var index = this.search(element);
            if (index >= 0) this.array.splice(index, 1);
            return this;
        }
    });

    SortedArray.comparing = function (property, array) {
        return new SortedArray(array, function (a, b) {
            // This should be faster than calling functions.
            // Besides, this way it is not needed to create useless function to return property value.
            return compareDefault(a[property], b[property]);
        });
    };

    return SortedArray;

    function defclass(prototype) {
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    }

    function compareDefault(a, b) {
        // Equality has a very low chance to happen. It should be the last option.
        if (a < b)
            return -1;
        else if (a > b)
            return 1;
        else
            return 0;
    }
}());

if (typeof module === "object") module.exports = SortedArray;
if (typeof define === "function" && define.amd)
    define(function () { return SortedArray; });
