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
        }
    },
    mounted() {
        let that = this;
        $(this.$el).children('.list-draggable').children().draggable({
            connectToSortable: `#${that.sortableId} .list-sortable`,
            helper: "clone",
            revert: "invalid",
            containment: "document",
            opacity: .7,
            start() {
                
            },
            drag() {

            },
            stop(event, ui) {

                let index = $(ui.helper).index();
                $(ui.helper).remove();
                that.$emit('dragstop', {
                    event,
                    ui,
                    index
                });
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.draggable-wrapper {
    background: #f5f5f4;
    .list-draggable {
        list-style-type: none;
    }
}
</style>


