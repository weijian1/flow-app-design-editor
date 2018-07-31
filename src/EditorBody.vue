<template>
  <div class="editor-body" :style="propertyCss | Obj2CSS" 
                            @click="unselectElemnt"
                            tabindex="-1" v-cloak>
        <div :id="id" class="sortable-wrapper">
            <ul class="list-sortable">
                <template v-for="(element, index) in value.elements">
                    <component :is="`element-${element.elementable_type}`" v-model="value.elements[index]" :ref="`component_${index}`" :index="index" :key="index"></component>
                </template>
            </ul>
        </div>
      
  </div>
</template>

<script>
import Obj2CSS from './Filters/Obj2CSS'
import Vue from 'vue'
import ElementTitle from './Elements/Title.vue'
import ElementText from './Elements/Text.vue'
import ElementBlank from './Elements/Blank.vue'
import ElementSearch from './Elements/Search.vue'
import ElementBanner from './Elements/Banner.vue'
import ElementCommodity from './Elements/Commodity.vue'

import EditorMinxin  from './Mixins/Editor'

export default {
    components: {
        ElementTitle,
        ElementText,
        ElementBlank,
        ElementSearch,
        ElementBanner,
        ElementCommodity
    },
    mixins: [ EditorMinxin ],
    data() {
        return {
            selectElementIndex: null,
        };
    },
    props: {
        value: {
            required: true
        },
        editorStyle: {
            required: true
        },
        id: {
            required: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            let that = this;
            $(that.$el).find('.list-sortable').sortable({
                axis: 'y',
                placeholder: "ui-state-highlight",
                containment: $(that.$el).parents('.flow-editor'),
                opacity: .7,
                start(event, ui) {

                },
                drag() {

                },
                beforeStop(event, ui) {
                    //  通过移动方式
                    if (! ui.item.context.classList.contains('ui-draggable')) {
                        let newElementIndex = $(ui.item[0]).index();
                        let elementVm = $(ui.item.context).children('.element-box')[0].__vue__.$parent;
                        let oldElementIndex = elementVm.index;

                        let elements = JSON.parse(JSON.stringify(that.value.elements));
                        let temp = elements[newElementIndex];
                        elements[newElementIndex] = elements[oldElementIndex];
                        elements[oldElementIndex] = temp;

                        that.value.elements = elements;
                    } else {
                        let index = $(ui.helper).index();
                        $(ui.helper).remove();
                        that.editorParent.onElementBeforeDragStop({
                            event,
                            ui,
                            index
                        });
                    }
                }
            });
        });
    },
    methods: {
        unselectElemnt(e) {
            
        },
    },
    watch: {
    },
    computed: {
        pageSize() {
            let pageSize = {
                width: this.editorStyle.width
            };
            let minHeight = this.editorStyle.height - this.editorStyle.navbar.height;
            if (this.value.property.height < minHeight) {
                pageSize.height = minHeight;
            }
            pageSize.height = this.value.property.height;

            return pageSize;
        },
        propertyCss() {
            let pageProperty = this.value.property;
            let cssProperty = {};
            let minHeight = this.editorStyle.height - this.editorStyle.navbar.height;
            if (pageProperty.height < minHeight) {
                cssProperty.height = minHeight;
            }
            cssProperty.height = pageProperty.height;

            if (pageProperty.type == 1) {
                cssProperty.backgroundColor = pageProperty.backgroundColor;
            } else if (pageProperty.type == 2) {
                cssProperty.backgroundImage = pageProperty.backgroundImage;
                cssProperty.backgroundRepeat = 'no-repeat';
                cssProperty.backgroundSize = 'cover';
            }

            return cssProperty;
        }
    },
    filters: {
        Obj2CSS
    }
}
</script>

<style lang="scss" scoped>
    .editor-body {
        width: 100%;
        height: 603px;
        position: relative;
        background-color: white;
        box-shadow: -1px 1px 0 #f2f2f2, 1px 1px 0 #f2f2f2;

        &:focus {
            outline: 0;
        }

        .sortable-wrapper {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .list-sortable {
            margin: 0;
            padding: 0;
            list-style-type: none;
            height: 100%;
        }

        .sortable-wrapper::-webkit-scrollbar {
            width: 7px;
        }
        .sortable-wrapper::-webkit-scrollbar-thumb {
            background-color: rgba(50,50,50,.2);
            border-radius: 40px;
        }
        .sortable-wrapper::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
</style>
