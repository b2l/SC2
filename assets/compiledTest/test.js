;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
/* Unit test wrapper - simply add a require for your test file here and it will be auto test */

require('./core_test');
},{"./core_test":2}],2:[function(require,module,exports){
var DOM = require('../javascripts/CORE/DOM.js');


function setup() {
    document.querySelector('body').innerHTML = "";
}


test("test Assert we can get all dom node matching a selector", function () {
    setup();

    // Given
    var d = document.createElement("div");
    document.querySelector('body').appendChild(d);
    d = document.createElement("div");
    document.querySelector('body').appendChild(d);
    var expectedDomNode = document.createElement("div");
    expectedDomNode.setAttribute("id", "toto");
    document.querySelector('body').appendChild(expectedDomNode);

    // When
    var allDivs = DOM.find('div');
    var divToto = DOM.find("#toto");

    // Then
    equal(allDivs.length, 3);
    equal(expectedDomNode.getAttribute('id'), divToto.getAttribute('id'));
});

test("test we could apply style to node", function() {
    setup();

    // Given
    var n = document.createElement('div');
    n.setAttribute('id', 'test-node');
    document.querySelector('body').appendChild(n);
    var node = DOM.find('#test-node');

    // When
    DOM.css(node, {
        border: "1px solid red",
        color: "blue"
    });

    // Then
    equal(node.style.border, "1px solid red");
});

test("test we can hide a node", function() {
    setup();

    // Given
    var n = document.createElement('div');
    n.setAttribute('id', 'test-node');
    document.querySelector('body').appendChild(n);

    var node = DOM.find('#test-node');
    ok(DOM.isVisible(node));

    // When
    DOM.hide(node);

    // Then
    equal("none", node.style.display);
    ok(!DOM.isVisible(node));
});
test("test we can show a node", function() {
    setup();

    // given
    var n = document.createElement('div');
    n.setAttribute('id', 'test-node');
    document.querySelector('body').appendChild(n);

    var node = DOM.find('#test-node');
    DOM.hide(node);
    ok(!DOM.isVisible(node));

    // when
    DOM.show(node);

    // then
    equal("block", node.style.display);
    ok(DOM.isVisible(node));
});

test("test we can set or get data on node", function() {
    setup();

    // Given
    var n = document.createElement('div');
    n.setAttribute('id', 'test-node');
    document.querySelector('body').appendChild(n);
    var node = DOM.find("#test-node");

    // When
    DOM.data(node, "mydata", "myvalue");

    // Then
    equal("myvalue", DOM.data(node, "mydata"));
});

test("test We can bind method call to set the context", function() {
    setup();

    // Given
    var n = document.createElement('div');
    n.setAttribute('id', 'toto');
    document.querySelector('body').appendChild(n);
    var obj = {
        click: function() {
            // Then
            deepEqual(this, obj);
        }
    }
    n.onclick = DOM.bind(obj, 'click');

    // When
    n.onclick();
});
},{"../javascripts/CORE/DOM.js":3}],3:[function(require,module,exports){
var DOM = {
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
            this.show(domNode);
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
            domNode[key] = value;
        } else {
            return domNode[key];
        }
    },

    bind: function(context, name) {
        return function() {
            if (!context[name]) return;
            return context[name].apply(context, arguments);
        }
    }
};
module.exports = DOM;
},{}]},{},[1])
;