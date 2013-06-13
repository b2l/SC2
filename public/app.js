;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
    var DOM = require('./CORE/DOM.js');


})();
},{"./CORE/DOM.js":2}],2:[function(require,module,exports){
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