var vows = require('vows'),
    assert = require('assert');

var SortedArray = require('../sorted-array');

vows.describe(SortedArray).addBatch({
    'Constructor': {
        'when called with unordered arguments': {
            topic: function() {
                return new SortedArray(3, 1, 5, 2, 4);
            },

            'constructs a sorted array': function(topic) {
                assert.deepEqual(topic.array, [1, 2, 3, 4, 5]);
            }
        },
    }
}).export(module);
