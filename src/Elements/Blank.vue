<template>
    <li>
        <element-border element-title="空白占位" :selected="selected">
            <template v-if="value.blank.property">
                <div class="content-blank" :style="{ height: value.blank.property.height } | Obj2CSS"></div>
            </template>
        </element-border>
    </li>
</template>

<script>
import Obj2CSS from './../Filters/Obj2CSS'
import ElementBorder from './../ElementBorder.vue'
import MixinElement from './../Mixins/Element'
export default {
    mixins: [ MixinElement ],
    props: {
        value: {
            required: true
        }
    },
    components: {
        ElementBorder
    },
    computed: {

    },
    filters: {
        Obj2CSS
    }
}
</script>


<style lang="scss" scoped>

</style>
