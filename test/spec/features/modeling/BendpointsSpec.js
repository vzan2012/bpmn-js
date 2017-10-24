import { readFileSync } from 'fs';

import { bootstrapModeler, inject } from 'test/TestHelper';

import modelingModule from 'lib/features/modeling';
import bendpointsModule from 'diagram-js/lib/features/bendpoints';
import coreModule from 'lib/core';


describe('features/bendpoints', function() {

  var diagramXML = readFileSync('test/fixtures/bpmn/features/drop/drop.bpmn', 'utf-8');

  var testModules = [ coreModule, bendpointsModule, modelingModule ];

  beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));


  it('should contain bendpoints', inject(function(bendpoints) {
    expect(bendpoints).to.exist;
  }));

});