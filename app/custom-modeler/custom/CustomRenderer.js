import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  componentsToPath,
  createLine
} from 'diagram-js/lib/util/RenderUtil';

import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  create as svgCreate
} from 'tiny-svg';

/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(eventBus, styles) {

  BaseRenderer.call(this, eventBus, 2000);

  var computeStyle = styles.computeStyle;

  this.canRender = function(element) {
    //return is(element, 'bpmn:ServiceTask');
    return /^custom:/.test(element.type);
  };

  /**
   * Dessine l'icon avec son image qui provient du URL
   * @param parent
   * @param shape
   * @returns {Element}
   */
  this.drawShape = function(parent, shape) {
    var url = shape.url;

    var iconSvg = svgCreate('image', {
      x: 0,
      y: 0,
      width: shape.width,
      height: shape.height,
      href: url
    });

    svgAppend(parent, iconSvg);

    return iconSvg;
  };

}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = [ 'eventBus', 'styles' ];


CustomRenderer.prototype.canRender = function(element) {
  return /^custom:/.test(element.type);
};

