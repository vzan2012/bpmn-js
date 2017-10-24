import { readFileSync } from 'fs';

import 'test/TestHelper';


import TestContainer from 'mocha-test-container-support';

import Modeler from 'lib/Modeler';


describe('direct editing - touch integration', function() {

  var container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });


  function createModeler(xml, done) {
    var modeler = new Modeler({ container: container });

    modeler.importXML(xml, function(err) {
      done(err, modeler);
    });
  }


  it('should work on modeler (manual test)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/simple.bpmn', 'utf-8');
    createModeler(xml, done);
  });


  it('should edit labels via double tap (manual test)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/features/label-editing/labels.bpmn', 'utf-8');
    createModeler(xml, done);
  });

});
