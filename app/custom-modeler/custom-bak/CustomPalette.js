import {
  assign
} from 'min-dash';



/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(
    palette, create, elementFactory,
    spaceTool, lassoTool, handTool,
    globalConnect, translate) {

    this._palette = palette;
  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  this._handTool = handTool;
    this._globalConnect = globalConnect;
    this._translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
    'handTool',
    'globalConnect',
    'translate'
];


PaletteProvider.prototype.getPaletteEntries = function(element) {

  var actions  = {},
      create = this._create,
      elementFactory = this._elementFactory,
      spaceTool = this._spaceTool,
        lassoTool = this._lassoTool,
        handTool = this._handTool,
        globalConnect = this._globalConnect,
        translate = this._translate;


  function createAction(type, group, className, title, options, url) {

    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      imageUrl: url,
      title: title || 'Create ' + shortType,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  function createParticipant(event, collapsed) {
    create.start(event, elementFactory.createParticipantShape(collapsed));
  }

  assign(actions, {
    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      title: translate('Activate the hand tool'),
      action: {
        click: function(event) {
          handTool.activateHand(event);
        }
      }
    },
    'custom-letterA': createAction(
      'custom:letterA', 'custom', 'icon-custom-letter','','', 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Font_A.svg'
    ),
    'custom-letterB': createAction(
        'custom:letterB', 'custom', 'icon-custom-letter','','', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Font_B.svg'
    ),
    'custom-letterC': createAction(
        'custom:letterC', 'custom', 'icon-custom-letter','','', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Font_C.svg'
    ),
    'custom-separator': {
      group: 'custom',
      separator: true
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: 'Activate the lasso tool',
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'space-tool': {
      group: 'tools',
      className: 'bpmn-icon-space-tool',
      title: 'Activate the create/remove space tool',
      action: {
        click: function(event) {
          spaceTool.activateSelection(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    }

  });

  return actions;
};
