<template>
    <li>
        <element-border element-title="优惠券" :selected="selected">
            <template v-if="value.coupon.property">
                <img class="content-img" :src="imgPath" />
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
        imgPath() {
            if (process.env.NODE_ENV == 'development') {
                return require(`../assets/images/elements/coupon/element-style-${this.value.coupon.property.styleNo}.png`);
            } else {
                return `static/elements/coupon/element-style-${this.value.coupon.property.styleNo}.png`;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .content-img {
        max-height: 100%;
        max-width: 100%;
    }
</style>
