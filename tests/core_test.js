var DOM = require('../assets/javascripts/CORE/DOM');

TestCase('DOM TEST', {
    "test Assert we can get all dom node matching a selector": function () {
        // Given
        var d = document.createElement("div");
        document.querySelector('body').appendChild(d);
        d = document.createElement("div");
        document.querySelector('body').appendChild(d);
        d = document.createElement("div");
        document.querySelector('body').appendChild(d);

        // When
        var allDivs = new DOM().find('div');

        // Then
        assertEquals("we should have 3 div in the dom", 3, allDivs.length);
    },

    "test we could apply style to node": function() {
        // Given
        var $ = new DOM();
        var n = document.createElement('div');
        n.setAttribute('id', 'test-node');
        document.querySelector('body').appendChild(n);

        var node = new $.find('#test-node')[0];

        // When
        $.css(node, {
            border: "1px solid red",
            color: "blue"
        });

        // Then
        assertEquals("1px solid red", node.style.border);
    }
});