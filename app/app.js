import $ from 'jquery';

import {
  debounce
} from 'min-dash';

var propertiesPanelModule = require('bpmn-js-properties-panel');
import propertiesProviderModule from './custom-modeler/custom/provider/magic';
import magicModdleDescriptor from './custom-modeler/custom/descriptors/magic';

import pizzaDiagram from '../resources/pizza-collaboration.bpmn';

import customElements from './custom-elements.json';

import CustomModeler from './custom-modeler';

var modeler = new CustomModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    magic: magicModdleDescriptor
  },
  keyboard: {
    bindTo: document
  }
});

modeler.importXML(pizzaDiagram, function(err) {

  if (err) {
    console.error('something went wrong:', err);
  }

  modeler.get('canvas').zoom('fit-viewport');

  modeler.addCustomElements(customElements);
});


// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;
