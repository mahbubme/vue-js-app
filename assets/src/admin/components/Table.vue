<template>
    <div v-if="loaded" class="tabcontent">
        <list-table
            :columns="columns"
            :rows="rows"
            :actions="[]"
            :bulk-actions="[]"
            :show-cb="false"
        >
        </list-table>

        <div class="vue-js-app-setting-row">
            <h3>{{ __('Emails', 'vue-js-app') }}</h3>
            <ul class="vue-js-app-email-list">
                <li v-for="email in settings.emails">{{email}}</li>
            </ul>
        </div>
    </div>

    <div v-else class="vue-js-app-loading">{{ __('Loading...', 'vue-js-app') }}</div>
</template>


<script>
import ListTable from 'vue-wp-list-table';
import { mapState } from 'vuex';

export default {

    name: 'Table',

    components: {
        ListTable
    },

    data () {
        return {
            loaded: false,
            rows: [],
            columns: {}
        };
    },

    computed: mapState({
        settings: state => state.settings,
    }),

    async mounted(){
        this.prepareTable();
    },

    methods: {
        prepareTable() {
            let self    = this;
            self.loaded = false;

            wp.ajax.send( 'vue_js_app_get_data', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                },
                success: function(response) {
                    self.prepareTableColumns(response.table.data.headers);
                    self.prepareTableRows(response.table.data.rows);
                    self.loaded= true;
                },
                error: function(error) {
                    console.log(error);
                }
            });
        },

        prepareTableColumns( columns ) {
            let self = this;

            columns.forEach(function( column ) {
               self.columns[column.toLowerCase()] = { 'label' : column }
            })
        },

        prepareTableRows( rows ) {
            self = this;
            rows = rows.slice(0, self.settings.numrows);

            if ( self.settings.humandate ) {
                rows.forEach(function( row ) {
                    row.date = self.getTimeFromDate(row.date);
                })
            }

            self.rows = rows;
        }
    }
};
</script>

<style lang="less">
    ul{
        &.vue-js-app-email-list {
            list-style: inherit;
            margin-left: 20px;

            li{
                color: #3a3030;
            }
        }
    }
</style>