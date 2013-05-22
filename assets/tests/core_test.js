function DOM() {
};

DOM.prototype = {
    find: function(selector) {
        var nodeList = document.querySelectorAll(selector);
        return (nodeList.length === 1) ? nodeList[0] : nodeList;
    },

    css: function(domNode, styles) {
        for (prop in styles) {
            domNode.style[prop] = styles[prop];
        }
    },

    hide: function(domNode) {
        this.css(domNode, {"display": "none"});
    },
    show: function(domNode) {
        this.css(domNode, {"display": "block"});
    },
    toggle: function(domNode) {
        if (this.isVisible(domNode)) {
            this.hide(domNode);
        } else {
            thid.show(domNode);
        }
    },
    isVisible: function(domNode) {
        return /^((?!none).)*$/.test(domNode.style.display) && /^((?!hidden).)*$/.test(domNode.style.visibility)
    },

    insertBefore: function(domNode, nodeToInsert) {
        domNode.parentNode.insertBefore(nodeToInsert, domNode);
    },

    data: function(domNode, key, value) {
        if (arguments.length === 3) {
            domNode.setUserData(key, value);
        } else {
            return domNode.getUserData(key);
        }
    },

    bind: function(context, method) {
        return function() {
            return context[name].apply(context, arguments);
        }
    }
}
var $ = new DOM();


TestCase('DOM TEST', {
    "test Assert we can get all dom node matching a selector": function () {
        // Given
        var d = document.createElement("div");
        document.querySelector('body').appendChild(d);
        d = document.createElement("div");
        document.querySelector('body').appendChild(d);
        d = document.createElement("div");
        d.setAttribute("id", "toto");
        document.querySelector('body').appendChild(d);

        // When
        var allDivs = $.find('div');
        var divToto = $.find("#toto");

        // Then
        assertEquals("we should have 3 div in the dom", 3, allDivs.length);
        assertEquals(d, divToto);
    },

    "test we could apply style to node": function() {
        // Given
        var n = document.createElement('div');
        n.setAttribute('id', 'test-node');
        document.querySelector('body').appendChild(n);
        var node = $.find('#test-node')[0];

        // When
        $.css(node, {
            border: "1px solid red",
            color: "blue"
        });

        // Then
        assertEquals("1px solid red", node.style.border);
    },
    "test we can hide a node": function() {
        // Given
        var n = document.createElement('div');
        n.setAttribute('id', 'test-node');
        document.querySelector('body').appendChild(n);

        var node = $.find('#test-node')[0];
        assertTrue($.isVisible(node));

        // When
        $.hide(node);

        // Then
        assertEquals("none", node.style.display);
        assertFalse($.isVisible(node));
    },
    "test we can show a node": function() {
        // Given
        var n = document.createElement('div');
        n.setAttribute('id', 'test-node');
        document.querySelector('body').appendChild(n);

        var node = $.find('#test-node')[0];
        $.hide(node);
        assertFalse($.isVisible(node));

        // When
        $.show(node);

        // Then
        assertEquals("block", node.style.display);
        assertTrue($.isVisible(node));
    },

    "test we can set or get data on node": function() {
        // Given
        var n = document.createElement('div');
        n.setAttribute('id', 'test-node');
        document.querySelector('body').appendChild(n);
        var node = $.find("#test-node");

        // When
        $.data(node, "mydata", "myvalue");

        // Then
        assertEquals("myvalue", $.data(node, "mydata"));
    },

    "test We can bind method call to set the context": function() {
        // Given
        var n = document.createElement('div');
        n.setAttribute('id', 'toto');
        document.body.appendChild(n);
        var obj = {
            click: function(e) {
                e.preventDefault();
                // Then
                assertEquals(this, obj);
            }
        }
        n.addEventListener('click', $.bind(obj, 'click'), true);

        // When
        n.click();
    }
});