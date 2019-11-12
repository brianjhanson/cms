<template>
    <div
      class="checkbox"
      :class="{ checked: isChecked }"
      v-on:click.prevent="handleClick"
      :title="'Select'|t('app')"></div>
</template>

<script>
    export default {
        name: 'AdminTableCheckbox',
        props: {
            id: Number,
            checked: Boolean,
            selectAll: Boolean,
            checks: Array,
            data: Object,
            index: Number,
        },

        data() {
            return {
            }
        },

        computed: {
            isChecked() {
                return this.checks && this.checks.indexOf(this.id) !== -1
            }
        },

        methods: {
            handleClick() {
                if (this.isChecked) {
                    this.$emit('removeCheck', this.id);
                } else {
                    this.$emit('addCheck', this.id);
                }
            }
        },

        created() {},

        watch: {
            selectAll() {
                if (this.selectAll === true) {
                    this.$emit('addCheck', this.id);
                } else if (this.selectAll === false) {
                    this.$emit('removeCheck', this.id);
                }
            }
        },

        mounted() {
            this.$emit('mounted', this.id);
        }
    }
</script>

<style scoped>

</style>