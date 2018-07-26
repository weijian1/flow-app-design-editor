<template>
    <div class="element-box" :class="{ selected: this.mouseEnter || this.selected }"
        @click="elementClick"
         @dblclick="elementDblClick"
         @mouseenter="elementEnter"
         @mouseleave="elementLeave">
         <div class="element-header" v-show="this.mouseEnter">
             <span>{{elementTitle}}</span>
             <span @click="deleteElement">删除</span>
         </div>
        <div class="element-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        elementTitle: {
            required: true
        },
      selected: {
          required: true
      },
    },
    data() {
        return {
            mouseEnter: false,
        }
    },
    methods: {
      notifySelect() {
          if (this.selected == false) {
              this.$emit('elementchange', true);
          }
      },
      elementClick() {
          this.notifySelect();
      },
      elementDblClick() {
          this.$emit('elementdbclick');
      },
      elementEnter() {
          this.mouseEnter = true;
      },
      elementLeave() {
          this.mouseEnter = false;
      },
      deleteElement(e) {
          e.preventDefault();
          this.$emit('elementdelete');
      }
    }
}
</script>

<style lang="scss" scoped>
.element-box {
    box-sizing: border-box;
    position: relative;
    min-height: 30px;
    border: solid 1px transparent;
    &.selected {
        border: solid 1px #000;
    }
    .element-header {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 30px;
        background: rgba(0, 0, 0, .5);
        color: white;
        font-size: 12px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        span:last-child {
            cursor: pointer;
        }
    }
}
</style>

