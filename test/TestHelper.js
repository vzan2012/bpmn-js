import { readFileSync } from 'fs';

export * from './helper';

import { insertCSS } from './helper';

insertCSS('diagram-js.css', readFileSync('node_modules/diagram-js/assets/diagram-js.css', 'utf-8'));

insertCSS('bpmn-embedded.css', readFileSync('assets/bpmn-font/css/bpmn-embedded.css', 'utf-8'));

insertCSS('diagram-js-testing.css',
  '.test-container .result { height: 500px; }' + '.test-container { height: 1000px !important }'
);


// add suite specific matchers
global.chai.use(require('chai-match'));
global.chai.use(require('./matchers/BoundsMatchers'));
global.chai.use(require('./matchers/ConnectionMatchers'));
global.chai.use(require('./matchers/JSONMatcher'));
