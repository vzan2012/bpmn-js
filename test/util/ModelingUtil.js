import { invoke } from 'test/TestHelper';

import { getCenter } from 'diagram-js/lib/layout/LayoutUtil';

import isArray from 'lodash-es/isArray';
import map from 'lodash-es/map';
import pick from 'lodash-es/pick';
import assign from 'lodash-es/assign';


function normalizeDelta(delta) {
  return assign({ x: 0, y: 0 }, delta);
}


export function getRelativeCenter(element, delta) {

  var normalizedDelta = normalizeDelta(delta);

  var center = getCenter(element);

  return {
    x: center.x + normalizedDelta.x,
    y: center.y + normalizedDelta.y
  };
}


export function function getElement(id) {

  // assume
  expect(id).to.exist;

  return invoke(function(elementRegistry) {
    return elementRegistry.get(id.id || id);
  });
}


export function appendShape(source, shape, distance, target, connection, connectionParent) {

  source = getElement(source);
  target = target && getElement(target);
  connectionParent = connectionParent && getElement(connectionParent);

  return invoke(function(rules, modeling) {

    var allowed = rules.allowed('shape.append', {
      source: source,
      shape: shape,
      target: target
    });

    // assume append to be allowed
    expect(allowed).to.eql(true);
  });

}


export function moveElements(elements, distance, target, isAttach, hints) {

  var actualElements = elements.map(function(e) {
    var actualElement = getElement(e);

    // assume the elements we want to move exist
    expect(actualElement).to.exist;

    return actualElement;
  });


  invoke(function(elementRegistry, modeling, rules) {

    var delta = normalizeDelta(distance);

    var allowed = rules.allowed('elements.move', {
      shapes: actualElements,
      delta: delta,
      target: target
    });

    // assume we can actually move
    expect(allowed).to.eql(typeof isAttach === 'boolean' ? 'attach' : true);

    // perform actual move
    modeling.moveElements(actualElements, delta, target, isAttach, hints);
  });
}


export function getBounds() {

  var args = Array.prototype.slice.call(arguments);

  if (isArray(args[0])) {
    args = args[0];
  }

  return map(args, function(e) {

    e = getElement(e);

    if (e.waypoints) {
      return null;
    }

    return pick(e, [ 'x', 'y', 'width', 'height' ]);
  });
}