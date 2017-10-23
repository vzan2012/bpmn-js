'use strict';

import { forEach } from 'min-dash/lib/collection';

/**
 * These are the properties that should be ignored when cloning elements.
 *
 * @type {Array}
 */
export const IGNORED_PROPERTIES = [
  'lanes',
  'incoming',
  'outgoing',
  'artifacts',
  'default',
  'flowElements'
];


export function getProperties(descriptor, keepDefault) {
  var properties = [];

  forEach(descriptor.properties, function(property) {

    if (keepDefault && property.default) {
      return;
    }

    properties.push(property.ns.name);
  });

  return properties;
}
