import FlowDraggable from './src/FlowDraggable.vue'
import FlowAppDesignEditor from './src/FlowAppDesignEditor.vue'
import Vue from 'vue'

require('jquery');
require('jquery-ui-bundle');
require('jquery-ui-bundle/jquery-ui.min.css');

require('./src/assets/scss/style.scss');

const components = [
    FlowDraggable,
    FlowAppDesignEditor
];

function install(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
}


export default install;