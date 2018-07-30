<template>
  <div class="editor-wrapper" :style="wrapperStyle | Obj2CSS">
      <div class="editor-content">
        <editor-header v-model="header" :navbar="defaultEditorStyle.navbar"></editor-header>
        <editor-body v-model="value" :editorStyle="defaultEditorStyle" :id="id"></editor-body>
      </div>
  </div>
</template>

<script>
import EditorHeader from './EditorHeader.vue'
import EditorBody from './EditorBody.vue'
import Obj2CSS from './Filters/Obj2CSS'

export default {
    components: {
        EditorHeader,
        EditorBody
    },
    props: {
        value: {
            required: true
        },
        header: {
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            defaultEditorStyle: {
                navbar: {
                    height: 44
                },
                width: 375,
                height: 647,
                paddingSize: 12,
                borderSize: 1
            },
            eventData: {
                currentPageHeight: 0,
                isPageDragable: false,
                maxOffset: {
                    height: 0
                },
                minPos: {
                    height: 0
                }
            }
        }
    },
    methods: {
        clickSave() {
            this.$el.querySelector('.save-btn').blur();
            this.editorParent.onSaveButtonClick();
        }
    },
    computed: {
        wrapperStyle: function() {
            let defaultEditorStyle = this.defaultEditorStyle;
            let width = defaultEditorStyle.width + defaultEditorStyle.paddingSize * 2 + defaultEditorStyle.borderSize * 2 + 10;
            
            let paddingTop = defaultEditorStyle.paddingSize,
                paddingLeft = defaultEditorStyle.paddingSize,
                paddingRight = defaultEditorStyle.paddingSize,
                paddingBottom = 1;
            return { width, paddingLeft, paddingRight, paddingTop, paddingBottom };
        }
    },
    filters: {
        Obj2CSS
    }
}
</script>

<style lang="scss" scoped>
    .editor-wrapper {
        position: relative;
        width: 411px;
        height: auto;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        margin-top: 103px;
        margin-bottom: 75px;
        border: 1px dashed #c7c6c6;
        padding: 12px;
        padding-bottom: 0;
        background: white;
        box-sizing: border-box;

        .editor-drag {
            cursor: n-resize;
            .editor-drag-tip {
                padding: 5px 10px;
                margin: 0 auto;
                line-height: 36px;
                text-align: center;
                span {
                    color: #808080;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                i.icon {
                    display: inline-block;
                    width: 10px;
                    height: 12px;
                }
            }
        }
        &.resize, &.move, &.rotate {
            pointer-events: none;
        }

        button.save-btn {
            position: absolute;
            right: -54px;
            bottom: 40px;
            width: 36px;
            height: 36px;
            background: #4d4d4d;
            border-radius: 36px;
            border: none;
            i {
                display: block;
                width: 18px;
                height: 18px;
                position: relative;
                margin: 0 auto;
            }
            svg {
                width: 18px;
                height: 18px;
                fill: white;
            }
            &:hover {
                background: black;
                svg {
                    fill: white;
                }
            }
        }
    }
</style>
