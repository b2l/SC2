function DOM() {
}

DOM.prototype = {
    find: function(selector) {
        return document.querySelectorAll(selector);
    },

    css: function(domNode, styles) {
        for (prop in styles) {
            domNode.style[prop] = styles[prop];
        }
    }
}

module.exports = DOM;