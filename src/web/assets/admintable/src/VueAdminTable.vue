<template>
    <div>
        <component
                v-bind:is="type"
                ref="table"
                :url="url"
                :data="settings.data ? settings.data : {}"
                :columns="settings.columns"
                :options="settings.options"
                v-on:pagination="onPageChange"
        >
            <!--Status Name-->
            <div class="vueadmintable-status-name" slot="statusName" slot-scope="props">
                <span v-if="props.row.status !== undefined" class="status" :class="{enabled: props.row.status}"></span>
                <a v-if="props.row.url" href="props.row.url">{{ props.row.name }}</a>
                <span v-if="!props.row.url">{{ props.row.name }}</span>
            </div>

            <!--Checkbox-->
            <div slot="checkbox" slot-scope="props">
                <checkbox
                    :id="props.row.id"
                    :index="props.index"
                    :checks="checks"
                    :select-all="isSelectAllCheck"
                    v-on:addCheck="addCheck"
                    v-on:removeCheck="removeCheck"
                    v-on:mounted="addId"
                    :ref="'checkbox-' + props.row.id"
                ></checkbox>
            </div>

            <!--Delete-->
            <div slot="delete" slot-scope="props">
                <delete-button
                        :id="props.row.id"
                        :name="props.row.name"
                        :action-url="settings.deleteAction"
                        :index="props.index"
                        v-on:remove="removeRow"
                ></delete-button>
            </div>

            <!--Action Buttons-->
            <div slot="beforeFilter">
                <div class="selectallcontainer">
                    <div v-on:click="handleSelectAll" class="btn" role="checkbox" tabindex="0" aria-checked="false">
                        <div class="checkbox" :class="{ checked: isSelectAllCheck === true, indeterminate: isSelectAllCheck === false && checks.length }"></div>
                    </div>
                </div>

                <div v-for="(action,index) in settings.actions" :key="index" v-if="checks.length && settings.actions.length">
                    <action-button
                            :label="action.label"
                            :icon="action.icon"
                            :action="action.action"
                            :actions="action.actions"
                            :ids="checks"
                            v-on:reload="reload"
                    >
                    </action-button>
                </div>
            </div>
        </component>
    </div>
</template>
<script>
    /* eslint-disable */
    /* global Craft */
    import actionButton from './js/components/AdminTableActionButton';
    import checkbox from './js/components/AdminTableCheckbox';
    import deleteButton from './js/components/AdminTableDeleteButton'

    export default {
        components: {
            actionButton,
            checkbox,
            deleteButton,
        },

        props: [
            'settings'
        ],

        data() {
            return {
                ids: [],
                checks: [],
                count: 0,
                limit: 0,
                isSelectAllCheck: false,
            }
        },

        methods: {
            addId(id) {
                if (this.ids.indexOf(id) === -1) {
                    this.ids.push(id);
                }
            },

            onPageChange() {
                this.checks = [];
            },

            addCheck(id) {
                if (this.checks.indexOf(id) === -1) {
                    this.checks.push(id);
                }
            },

            removeCheck(id) {
                let key = this.checks.indexOf(id);
                if (key >= 0) {
                    this.checks.splice(key, 1);
                }
            },

            handleSelectAll() {
                this.isSelectAllCheck = !this.isSelectAllCheck;
            },

            deselectAll() {
                this.checks = [];
            },

            removeRow(index) {
                if (this.settings.data[index]) {
                    this.settings.data.splice(index, 1);
                    this.$refs.table.refresh();
                }
            }
        },

        computed: {
            isAllChecked() {
                let checkLimit = this.count > this.limit ? this.limit : this.count;

               return this.checks.length >= checkLimit
            },

            type() {
                return this.settings.url ? 'v-server-table' : 'v-client-table';
            },

            url() {
                return this.settings.url ? Craft.getActionUrl(this.settings.url) : '';
            },
        },

        watch: {
        },

        mounted() {
            this.count = this.$refs.table.count;
            this.limit = this.$refs.table.limit;
        }
    }
</script>

<style style="scss">
    .vueadmintable-status-name {
        font-weight: bold;
    }

    .VueTables__table {
        width: 100%;
    }
</style>