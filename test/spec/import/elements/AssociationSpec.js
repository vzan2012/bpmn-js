import { readFileSync } from 'fs';

import { bootstrapViewer, inject } from 'test/TestHelper';


describe('import - associations', function() {

  describe('should import association', function() {

    it('connecting task -> text annotation', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.text-annotation.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // when
        inject(function(elementRegistry) {

          var association = elementRegistry.get('Association_1');

          // then
          expect(association).to.exist;

          done();
        })();

      });
    });


    it('connecting boundary -> compensate task', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.compensation.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // when
        inject(function(elementRegistry) {

          var association = elementRegistry.get('Association_1');

          // then
          expect(association).to.exist;

          done();
        })();

      });
    });

  });


  describe('should import data association', function() {

    function expectRendered(elementIds) {

      inject(function(elementRegistry, canvas) {

        elementIds.forEach(function(id) {

          var element = elementRegistry.get(id);

          // then
          expect(element).to.exist;

          // data associations always rendered on root
          expect(element.parent).to.eql(canvas.getRootElement());
        });
      })();
    }


    it('task -> data object -> task', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.data-association.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // then
        expectRendered([
          'DataInputAssociation',
          'DataOutputAssociation'
        ]);

        done();
      });
    });


    it('data input -> task -> data output', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.data-input-output.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // then
        expectRendered([
          'DataInputAssociation',
          'DataOutputAssociation'
        ]);

        done();
      });
    });


    it('in collaboration', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.collaboration.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // then
        expectRendered([
          'DataInputAssociation',
          'DataOutputAssociation'
        ]);

        done();

      });
    });


    it('catch event -> data object -> throw event', function(done) {

      var xml = readFileSync(__dirname + '/AssociationSpec.events.bpmn', 'utf-8');

      // given
      bootstrapViewer(xml)(function(err) {

        if (err) {
          return done(err);
        }

        // then
        expectRendered([
          'DataInputAssociation',
          'DataOutputAssociation'
        ]);

        done();
      });
    });

  });

});