import { readFileSync } from 'fs';

import 'test/TestHelper';

var Modeler = require('lib/Modeler').default;

var TestContainer = require('mocha-test-container-support');

function delay(fn) {
  setTimeout(fn, 10);
}


describe.skip('scenario - successive reopening', function() {

  var container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });


  var boundaryXML = readFileSync('test/fixtures/bpmn/boundary-events.bpmn', 'utf-8'),
      containersXML = readFileSync('test/fixtures/bpmn/containers.bpmn', 'utf-8'),
      flowMarkersXML = readFileSync('test/fixtures/bpmn/flow-markers.bpmn', 'utf-8'),
      simpleXML = readFileSync('test/fixtures/bpmn/simple.bpmn', 'utf-8');

  var allDiagrams = [
    boundaryXML,
    containersXML,
    flowMarkersXML,
    simpleXML
  ];

  it('should import 100 diagrams', function(done) {

    // this test needs time
    this.timeout(30000);

    var count = 0;

    // given
    var modeler = new Modeler({ container: container });

    modeler.on('import.done', function(event) {

      console.log('imported #' + count);

      if (event.error) {
        console.error('ERROR', event.error);
      }

      if (event.warnings && event.warnings.length) {
        console.warn('WARNINGS', event.warnings );
      }
    });

    function finish(err) {
      modeler.destroy();

      done(err);
    }

    function importNext() {

      if (count === 100) {
        return finish();
      }

      var i = count % allDiagrams.length;

      var xml = allDiagrams[i];

      // when
      modeler.importXML(xml, function(err) {

        count++;

        if (err) {
          return finish(err);
        }

        delay(importNext);
      });
    }

    // when
    importNext();
  });

});
