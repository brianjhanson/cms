/* global Craft */
/* global Garnish */

import Vue from 'vue'
import {t} from '../../pluginstore/src/js/filters/craft'
// import {mapState} from 'vuex'
import store from './js/store/adminTable'
import App from './App'
import AdminTablePagination from './js/components/AdminTablePagination'
import VueAdminTable from './VueAdminTable'
// eslint-disable-next-line
import {ServerTable, ClientTable, Event} from 'vue-tables-2'
import {craftTemplate} from './js/templates/craft.jsx'

Vue.filter('t', t)

Garnish.$doc.ready(function() {
    Craft.initUiElements()
    const ADMIN_TABLE = document.querySelector('#admin-table');
    const ADMIN_TABLE_PAGINATION = document.querySelector('#admin-table-pagination');

    if (ADMIN_TABLE) {

        window.adminTableApp = new Vue({
            render: createElement => {
                let context = {
                    props: {...ADMIN_TABLE.dataset}
                };

                return createElement(App, context);
            },
            store,

            components: {
                App,
            },

            data() {
                return {

                }
            },

            computed: {

            },

            watch: {

            },

            methods: {

            }
        }).$mount('#admin-table')
    }

    if (ADMIN_TABLE_PAGINATION) {

        window.adminTablePagination = new Vue({
            render: createElement => {
                let context = {
                    props: {...ADMIN_TABLE_PAGINATION.dataset}
                };

                return createElement(AdminTablePagination, context);
            },
            store,

            components: {
                AdminTablePagination,
            },

            data() {
                return {

                }
            },

            computed: {

            },

            watch: {

            },

            methods: {

            }
        }).$mount('#admin-table-pagination')
    }

})

// eslint-disable-next-line
Craft.VueAdminTable = Garnish.Base.extend(
    {
        settings: {
            actions: [],
            container: '.vue-admin-table',
            options: {
                filterPlaceholder: Craft.t('app', 'Search'),
                filterable: false,
                // skin: 'data fullwidth collapsible',
                sortable: [],
            },
        },

        defaultColumnClasses: {
            delete: 'thin'
        },

        init: function(settings) {

            if (settings.options) {
                settings.options = {...this.settings.options,...settings.options};
            } else {
                settings.options = this.settings.options;
                settings.options.columnClasses = this.defaultColumnClasses;
            }

            this.setSettings(settings, Craft.VueAdminTable.defaults);

            var dataSettings = this.settings;
            Vue.use(ClientTable, {}, false, 'bootstrap3', craftTemplate);
            // Vue.use(ClientTable);
            Vue.use(ServerTable);

            return new Vue({
                components: {
                    VueAdminTable
                },
                data() {
                    return {};
                },
                render: (h) => {
                    return h(VueAdminTable, {
                        props: {
                            settings: dataSettings
                        }
                    })
                },
            }).$mount(this.settings.container);
        },

    },
    {
        defaults: {
            test: 'one'
        }
    }
);
