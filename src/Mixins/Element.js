import EditorMinxin  from './Editor'

export default {
    mixins: [ EditorMinxin ],
    data() {
        return {
            selected: false,
            isLoadFinish: false,
            elementIndex: ''
        }
    },
    props: {
        index: {
            required: true
        }
    },
    mounted() {
        this.elementIndex = this.index;
        this.$children[0].$on('elementchange', (selected) => {
            if (selected) {
                this.editorParent.onElementChange(this.elementIndex);
            } else {
                this.editorParent.onElementChange(null);
            }

            this.selected = selected;
        });

        this.$children[0].$on('elementdelete', (selected) => {
            this.editorParent.onDeleteElement(this.elementIndex);
        });

        this.$children[0].$on('elementdbclick', () => {
            this.editorParent.onElementDblClick(this.elementIndex);
        });

        this.$nextTick((e) => {
            setTimeout(() => {
                this.isLoadFinish = true;
            }, 50);
        });
    },
    methods: {
        unselect() {
            this.selected = false;
        },
        select() {
            this.selected = true;
        }
    }
}