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