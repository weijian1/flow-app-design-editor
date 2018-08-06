<template>
    <div :id="id" class="flow-editor">
        <div class="design-editor" @click="designEditorClick">
            <editor-wrapper v-model="value" :header="appHeader" :id="id"></editor-wrapper>
        </div>
    </div>
</template>

<script>
import EditorMinxin  from './Mixins/Editor'
import EditorEvent from './Utils/EditorEvent'
import EditorWrapper from './EditorWrapper.vue'
export default {
    name: 'flow-app-design-editor',
    components: {
        EditorWrapper
    },
    mixins: [ EditorMinxin ],
    props: {
        id: {
            type: String,
            required: true
        },
        appHeader: {
            type: Object, 
            required: true
        },
        value: {
            type: Object,
            required: true
        }
    },
    mounted() {

    },
    data() {
        return {
            editorData: {
                select: {
                    elementIndex: []
                },
                currentAction: {
                    multiSelect: false
                }
            }
        }
    },
    methods: {
        // api
        insertElement(element, index = null) {
            this.unselectElemnt();
            if (index == null) {
                this.value.elements.push(element);
            } else {
                this.value.elements.splice(index, 0, element);
            }

            this.$nextTick(() => {
                this.bodyChildren.$refs[`component_${index}`][0].$children[0].elementClick();
            });
        },
        unselectElemnt() {
            let selectElementIndex = this.editorData.select.elementIndex;

            for (let i = 0; i < selectElementIndex.length; i++) {
                this.bodyChildren.$refs[`component_${selectElementIndex[i]}`][0].unselect();
            }

            this.editorData.select.elementIndex = [];
        },

        // private
        designEditorClick(e) {
            this.onElementUnselect();
        },

        // emit
        onElementUnselect() {
            this.unselectElemnt();
            this.$emit('elementchange', this.editorData.select);
        },
        onElementBeforeDragStop(event) {
            this.$emit('elementbeforeinsert', event);
        },
        onElementDblClick(elementIndex) {
            this.$emit('elementdblclick', this.editorData.select);
        },
        onElementChange(elementIndex) {
            if (this.editorData.currentAction.multiSelect == false) {
                this.unselectElemnt();
            }
            this.elementChange(elementIndex);
            this.$emit('elementchange', this.editorData.select);
        },
        onDeleteElement(elementIndex) {
            let editorEvent = new EditorEvent('deleteelement');
            editorEvent.setElementIndex(elementIndex);
            this.$emit('elementdelete', editorEvent);
            
            if (editorEvent.cancelable == false) {
                this.unselectElemnt();
                this.value.elements.splice(elementIndex, 1);
            }
        },

        // private method
        elementChange(elementIndex) {
            this.editorData.select.elementIndex.push(elementIndex);
        },

    }
}
</script>

<style lang="scss" scoped>
.flow-editor {
    background: #F2F2F6;
    .design-editor {
        width: 100%;
        height: 100%;
    }
}

</style>


