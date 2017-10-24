import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import { componentsToPath } from 'diagram-js/lib/util/RenderUtil';

import svgAppend from 'tiny-svg/lib/append';
import svgAttr from 'tiny-svg/lib/attr';
import svgCreate from 'tiny-svg/lib/create';


export default class CustomRenderer extends BaseRenderer {

  constructor(eventBus, styles) {

    super(eventBus, 2000);

    this._styles = styles;

    var computeStyle = styles.computeStyle;

    this.handlers = {
      'custom:triangle': (parentGfx, element) => {
        return this.drawTriangle(parentGfx, element.width);
      },
      'custom:circle': (parentGfx, element, attrs) => {
        return this.drawCircle(parentGfx, element.width, element.height,  attrs);
      }
    };

    this.drawTriangle = function(parentGfx, side, attrs) {
      var halfSide = side / 2,
          points;

      points = [{ x: halfSide, y: 0 }, { x: side, y: side }, { x: 0, y: side }];

      var pointsString = points.map(function(point) {
        return point.x + ',' + point.y;
      }).join(' ');

      attrs = computeStyle(attrs, {
        stroke: '#3CAA82',
        strokeWidth: 2,
        fill: '#3CAA82'
      });

      var polygon = svgCreate('polygon');
      svgAttr(polygon, { points: pointsString });
      svgAttr(polygon, attrs);

      svgAppend(parentGfx, polygon);

      return polygon;
    };

    this.getTrianglePath = function(element) {
      var x = element.x,
          y = element.y,
          width = element.width,
          height = element.height;

      var trianglePath = [
        ['M', x + width / 2, y],
        ['l', width / 2, height],
        ['l', -width, 0 ],
        ['z']
      ];

      return componentsToPath(trianglePath);
    };

    this.drawCircle = function(parentGfx, width, height, attrs) {
      var cx = width / 2,
          cy = height / 2;

      attrs = computeStyle(attrs, {
        stroke: '#4488aa',
        strokeWidth: 4,
        fill: 'white'
      });

      var circle = svgCreate('circle');
      svgAttr(circle, {
        cx: cx,
        cy: cy,
        r: Math.round((width + height) / 4)
      });
      svgAttr(circle, attrs);

      svgAppend(parentGfx, circle);

      return circle;
    };

    this.getCirclePath = function(shape) {
      var cx = shape.x + shape.width / 2,
          cy = shape.y + shape.height / 2,
          radius = shape.width / 2;

      var circlePath = [
        ['M', cx, cy],
        ['m', 0, -radius],
        ['a', radius, radius, 0, 1, 1, 0, 2 * radius],
        ['a', radius, radius, 0, 1, 1, 0, -2 * radius],
        ['z']
      ];

      return componentsToPath(circlePath);
    };

  }

  canRender(element) {
    return /^custom\:/.test(element.type);
  }

  drawShape(visuals, element) {
    var type = element.type;
    var h = this.handlers[type];

    /* jshint -W040 */
    return h(visuals, element);
  }

  drawConnection(visuals, element) {
    var type = element.type;
    var h = this.handlers[type];

    /* jshint -W040 */
    return h(visuals, element);
  }

  getShapePath(element) {
    var type = element.type.replace(/^custom\:/, '');

    var shapes = {
      triangle: this.getTrianglePath,
      circle: this.getCirclePath
    };

    return shapes[type](element);
  }

}

CustomRenderer.$inject = [ 'eventBus', 'styles' ];
