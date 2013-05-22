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