<template>
    <div :id="id" class="draggable-wrapper">
        <ul class="list-draggable">
            <slot></slot>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'flow-draggable',
    props: {
        id: {
            type: String,
            required: true
        },
        sortableId: {
            type: String,
            required: true
        },
        elementAppendTo: {
            type: String,
            default: 'parent'
        }
    },
    mounted() {
        let that = this;
        $(this.$el).children('.list-draggable').children().draggable({
            connectToSortable: `#${that.sortableId} .list-sortable`,
            helper: "clone",
            revert: "invalid",
            containment: "document",
            appendTo: that.elementAppendTo,
            opacity: .7,
            start() {
                
            },
            drag() {

            }
        });
    }
}
</script>

<style lang="scss" scoped>
.draggable-wrapper {
    background: #F2F2F6;
    .list-draggable {
        width: 100%;
        height: 100%;
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>


