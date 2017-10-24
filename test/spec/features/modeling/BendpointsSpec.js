import { readFileSync } from 'fs';

import { bootstrapModeler, inject } from 'test/TestHelper';

var modelingModule = require('lib/features/modeling').default,
    bendpointsModule = require('diagram-js/lib/features/bendpoints').default,
    coreModule = require('lib/core').default;


describe('features/bendpoints', function() {

  var diagramXML = readFileSync('test/fixtures/bpmn/features/drop/drop.bpmn', 'utf-8');

  var testModules = [ coreModule, bendpointsModule, modelingModule ];

  beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));


  it('should contain bendpoints', inject(function(bendpoints) {
    expect(bendpoints).to.exist;
  }));

});