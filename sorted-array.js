if (typeof module === 'object') {
    module.exports = SortedArray;
}

SortedArray.prototype.insert = function(element) {
    var array = this.array;
    var index = array.length;
    array.push(element);

    while (index) {
        var i = index,
            j = --index;

        if (this.mapper(array[i]) < this.mapper(array[j])) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    return this;
};

SortedArray.prototype.search = function(element) {
    var low = 0;
    var array = this.array;
    var high = array.length;

    while (high > low) {
        var index = (high + low) / 2 >>> 0;
        var cursor = array[index];

        var mappedCursor = this.mapper(cursor);
        var mappedElement = this.mapper(element);

        if (mappedCursor < mappedElement) low = index + 1;
        else if (mappedCursor > mappedElement) high = index;
        else return index;
    }

    return -1;
};

SortedArray.prototype.remove = function(element) {
    var index = this.search(element);
    if (index >= 0) this.array.splice(index, 1);
    return this;
};

function SortedArray() {
    var index = 0;
    this.array = [];

    var length;

    var last = arguments[arguments.length - 1];
    if (typeof last === 'function') {
        length = arguments.length - 1;
        this.mapper = last;
    } else {
        length = arguments.length;
        this.mapper = function(element) {
            return element;
        };
    }

    while (index < length) this.insert(arguments[index++]);
}
