import { readFileSync } from 'fs';

import {
  bootstrapViewer,
  bootstrapModeler,
  inject
} from 'test/TestHelper';

import coreModule from 'lib/core';
import rendererModule from 'lib/draw';

import domQuery from 'min-dom/lib/query';

function checkErrors(done) {
  return function(err, warnings) {
    expect(warnings).to.be.empty;
    expect(err).not.to.exist;
    done();
  };
}


describe('draw - bpmn renderer', function() {

  it('should render activity markers', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/activity-markers.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render association markers', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/associations.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render activity markers (combination)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/activity-markers-combination.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render conditional flows', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/conditional-flow.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render conditional default flows', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/conditional-flow-default.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render NO conditional flow (gateway)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/conditional-flow-gateways.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render conditional flow (typed task)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/conditional-flow-typed-task.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render data objects', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/data-objects.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render events', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/events.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render events (interrupting)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/events-interrupting.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render event subprocesses (collapsed)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/event-subprocesses-collapsed.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render event subprocesses (expanded)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/event-subprocesses-expanded.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render gateways', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/gateways.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render group', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/group.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render message marker', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/message-marker.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render pools', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/pools.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render pool collection marker', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/pools-with-collection-marker.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render task types', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/task-types.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render text annotations', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/text-annotation.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render flow markers', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/flow-markers.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render xor gateways blank and with X', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/xor.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render boundary events with correct z-index', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/boundary-event-z-index.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render boundary events without flowNodeRef', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/boundary-event-without-refnode.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render boundary event only once if referenced incorrectly via flowNodeRef (robustness)', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/boundary-event-with-refnode.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render gateway event if attribute is missing in XML', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/gateway-type-default.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it.skip('should render colors', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/colors.bpmn', 'utf-8');
    bootstrapViewer(xml)(checkErrors(done));
  });


  it('should render call activity', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/call-activity.bpmn', 'utf-8');

    bootstrapViewer(xml)(function(err) {

      if (err) {
        return done(err);
      }

      inject(function(elementRegistry) {

        var callActivityGfx = elementRegistry.getGraphics('CallActivity');

        // make sure the + marker is shown
        expect(domQuery('[data-marker=sub-process]', callActivityGfx)).to.exist;

        done();
      })();
    });

  });


  it('should render adhoc sub process', function(done) {
    var xml = readFileSync('test/fixtures/bpmn/draw/activity-markers-simple.bpmn', 'utf-8');

    bootstrapViewer(xml)(function(err) {

      if (err) {
        return done(err);
      }

      inject(function(elementRegistry) {

        var callActivityGfx = elementRegistry.getGraphics('AdHocSubProcess');

        // make sure the + marker is shown
        expect(domQuery('[data-marker=adhoc]', callActivityGfx)).to.exist;

        done();
      })();
    });

  });


  it('should add random ID suffix to marker ID', function(done) {

    var xml = readFileSync('test/fixtures/bpmn/simple.bpmn', 'utf-8');
    bootstrapViewer(xml)(function(err) {

      if (err) {
        return done(err);
      }

      inject(function(canvas) {
        var svg = canvas._svg;
        var markers = svg.querySelectorAll('marker');

        expect(markers[0].id).to.match(/^sequenceflow-end-white-black-[A-Za-z0-9]+$/);
      })();

      done();
    });
  });


  it('should properly render colored markers', function(done) {

    var xml = readFileSync('test/fixtures/bpmn/draw/colors.bpmn', 'utf-8');
    bootstrapViewer(xml)(function(err) {

      if (err) {
        return done(err);
      }

      inject(function(canvas) {
        var svg = canvas._svg;
        var markers = svg.querySelectorAll('marker');

        expect(markers).to.have.length(5);
        expect(markers[0].id).to.match(/^sequenceflow-end-white-black-[A-Za-z0-9]{25}$/);
        expect(markers[4].id).to.match(/^messageflow-start-white-fuchsia-[A-Za-z0-9]{25}$/);
      })();

      done();
    });
  });


  describe('path', function() {

    var diagramXML = readFileSync('test/fixtures/bpmn/simple-cropping.bpmn', 'utf-8');

    var testModules = [ coreModule, rendererModule ];

    beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));

    describe('circle', function() {

      it('should return a circle path', inject(function(canvas, elementRegistry, graphicsFactory) {

        // given
        var eventElement = elementRegistry.get('StartEvent_1');

        // when
        var startPath = graphicsFactory.getShapePath(eventElement);

        // then
        expect(startPath).to.equal('M247,343m0,-18a18,18,0,1,1,0,36a18,18,0,1,1,0,-36z');
      }));


      it('should return a diamond path', inject(function(canvas, elementRegistry, graphicsFactory) {

        // given
        var gatewayElement = elementRegistry.get('ExclusiveGateway_1');

        // when
        var gatewayPath = graphicsFactory.getShapePath(gatewayElement);

        // then
        expect(gatewayPath).to.equal('M418,318l25,25l-25,25l-25,-25z');
      }));


      it('should return a rounded rectangular path', inject(function(canvas, elementRegistry, graphicsFactory) {

        // given
        var subProcessElement = elementRegistry.get('SubProcess_1');

        // when
        var subProcessPath = graphicsFactory.getShapePath(subProcessElement);

        // then
        expect(subProcessPath).to.equal('M584,243l330,0a10,10,0,0,1,10,10l0,180a10,10,0,0,1,-10,10' +
        'l-330,0a10,10,0,0,1,-10,-10l0,-180a10,10,0,0,1,10,-10z');
      }));


      it('should return a rectangular path', inject(function(canvas, elementRegistry, graphicsFactory) {

        // given
        var TextAnnotationElement = elementRegistry.get('TextAnnotation_1');

        // when
        var TextAnnotationPath = graphicsFactory.getShapePath(TextAnnotationElement);

        // then
        expect(TextAnnotationPath).to.equal('M368,156l100,0l0,80l-100,0z');
      }));

    });

  });

});
