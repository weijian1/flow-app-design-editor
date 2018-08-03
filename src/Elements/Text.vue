<template>
    <li>
        <element-border element-title="文字模块" :selected="selected">
            <template v-if="value.text.property">
                <p class="content-text">{{ value.text.property.text }}</p>
            </template>
        </element-border>
    </li>
</template>

<script>
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

    }
}
</script>


<style lang="scss" scoped>
.content-text {
    margin: 0;
    min-height: 30px;
    word-break: break-all;
}
</style>
