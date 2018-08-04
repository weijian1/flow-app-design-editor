<template>
    <li>
        <element-border element-title="商品模块" :selected="selected">
            <div class="element-inner" v-if="value.commodity.property">
                <img class="content-img" :src="imgPath" />
            </div>
        </element-border>
    </li>
</template>

<script>
import ElementBorder from './../ElementBorder.vue'
import MixinElement from './../Mixins/Element'
import Obj2CSS from './../Filters/Obj2CSS'
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
        imgPath() {
            if (process.env.NODE_ENV == 'development') {
                return require(`../assets/images/elements/commodity/element-style-${this.value.commodity.property.styleNo}.png`);
            } else {
                return `static/elements/commodity/element-style-${this.value.commodity.property.styleNo}.png`;
            }
        }
    },
    filters: {
        Obj2CSS
    }
}
</script>


<style lang="scss" scoped>
    .content-img {
        max-height: 100%;
        max-width: 100%;
    }
</style>
