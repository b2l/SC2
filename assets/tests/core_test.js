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