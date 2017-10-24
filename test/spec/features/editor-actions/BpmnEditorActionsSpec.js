import { readFileSync } from 'fs';

import { bootstrapModeler, inject } from 'test/TestHelper';

var pick = require('lodash-es/pick').default;

var getBBox = require('diagram-js/lib/util/Elements').getBBox;

var getParent = require('lib/features/modeling/util/ModelingUtil').getParent;


var bpmnEditorActionsModule = require('lib/features/editor-actions').default,
    modelingModule = require('lib/features/modeling').default,
    coreModule = require('lib/core').default;

var basicXML = readFileSync('test/fixtures/bpmn/nested-subprocesses.bpmn', 'utf-8'),
    collaborationXML = readFileSync('test/fixtures/bpmn/collaboration.bpmn', 'utf-8');



describe('features/editor-actions', function() {

  describe('#moveToOrigin', function() {

    function testMoveToOrigin(xml) {

      return function() {

        beforeEach(bootstrapModeler(xml, { modules: [ bpmnEditorActionsModule, modelingModule, coreModule ] }));

        it('should move to origin', inject(function(editorActions) {
          // given
          var elements = editorActions.trigger('selectElements'),
              boundingBox;

          // when
          editorActions.trigger('moveToOrigin');

          boundingBox = getBBox(elements);

          // then
          expect(pick(boundingBox, [ 'x', 'y' ])).to.eql({ x: 0, y: 0 });
        }));
      };
    }

    describe('single process', testMoveToOrigin(basicXML));

    describe('collaboration', testMoveToOrigin(collaborationXML));

    describe('subprocesses', function() {

      beforeEach(bootstrapModeler(basicXML, { modules: [ bpmnEditorActionsModule, modelingModule, coreModule ] }));

      it('should ignore children of subprocesses', inject(function(editorActions, elementRegistry) {
        // given
        var startEvent = elementRegistry.get('StartEvent_3'),
            startEventParent = getParent(startEvent);

        // when
        editorActions.trigger('moveToOrigin');

        // then
        expect(getParent(startEvent)).to.equal(startEventParent);
      }));
    });

  });

});
