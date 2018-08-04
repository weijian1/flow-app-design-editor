<template>
    <div class="statusbar" :style="statusBarStyle">

    </div>
</template>

<script>
export default {
    data() {
        return {
            statusBarStyle: {
                backgroundImage: `url(${require('./../assets/images/statusbar.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
            }
        }
    }
}
</script>

<style scoped>
    .statusbar {
        height: 22px;
    }
</style>
