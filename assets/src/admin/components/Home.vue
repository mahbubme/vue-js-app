<template>
    <div class="home">
        <div id="tabs" class="container">
            <div class="tabs">
                <router-link to="/" v-bind:class="[ activetab === 'settings' ? 'active' : '' ]">{{ __('Settings', 'vue-js-app') }}</router-link>
                <router-link to="/?tab=table" v-bind:class="[ activetab === 'table' ? 'active' : '' ]">{{ __('Table', 'vue-js-app') }}</router-link>
                <router-link to="/?tab=graph" v-bind:class="[ activetab === 'graph' ? 'active' : '' ]">{{ __('Graph', 'vue-js-app') }}</router-link>
            </div>

            <div class="content">
                <template v-if="activetab === 'settings'">
                    <div class="tabcontent" v-if="loaded">
                      <form @submit.prevent="updateSettings">
                          <div class="vue-js-app-setting-row">
                              <div class="vue-js-app-setting-label">
                                  <label>{{ __('Numrows', 'vue-js-app') }}</label>
                              </div>
                              <div class="vue-js-app-setting-field">
                                  <select v-model="settings.numrows">
                                      <option disabled value="">{{ __('Please select one', 'vue-js-app') }}</option>
                                      <option
                                          v-for="numrow in numrowsOptions"
                                          :value="numrow.value"
                                      >
                                          {{numrow.label}}
                                      </option>
                                  </select>
                                  <p class="desc">{{ __('How many rows on the table you want to show.', 'vue-js-app') }}</p>
                              </div>
                          </div>
                          <div class="vue-js-app-setting-row">
                              <div class="vue-js-app-setting-label">
                                  <label>{{ __('Humandate', 'vue-js-app') }}</label>
                              </div>
                              <div class="vue-js-app-setting-field">
                                  <label>
                                      <input type="checkbox" v-model="settings.humandate">
                                      {{ __('Human readable date format', 'vue-js-app') }}
                                  </label>
                                  <p class="desc">{{ __('Enable if you want to show human readable date format on date column in the table.', 'vue-js-app') }}</p>
                              </div>
                          </div>
                          <div class="vue-js-app-setting-row">
                              <div class="vue-js-app-setting-label">
                                  <label>{{ __('Emails', 'vue-js-app') }}</label>
                              </div>
                              <div class="vue-js-app-setting-field" v-for="(email, index) in settings.emails" :data-index="index">
                                  <input type="email" placeholder="example@example.com" v-model="settings.emails[index]">
                                  <button @click.prevent="addNewEmail" class="vue-js-app-button btn-control">{{ __('+', 'vue-js-app') }}</button>
                                  <button @click.prevent="removeEmail(index)" class="vue-js-app-button btn-control danger">{{ __('-', 'vue-js-app') }}</button>
                              </div>

                              <div class="vue-js-app-setting-field">
                                  <p class="desc">{{ __('You can add up to 5 emails.', 'vue-js-app') }}</p>
                              </div>
                          </div>

                          <div class="vue-js-app-setting-row">
                            <button type="submit" class="vue-js-app-button">{{ __('Update Settings', 'vue-js-app') }}</button>
                          </div>

                            <div class="notice notice-success" v-if="settingsUpdated">
                                <p>{{ __('Settings Updated', 'vue-js-app') }}</p>
                            </div>
                        </form>
                    </div>
                    <div v-else class="vue-js-app-loading">{{ __('Loading...', 'vue-js-app') }}</div>
                </template>

                <template v-if="activetab === 'table'">
                    <Table />
                </template>
                <template v-if="activetab === 'graph'">
                    <Graph />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Table from './Table.vue';
import Graph from './Graph.vue';
import { mapState } from 'vuex';

export default {

    name: 'Home',

    components: {
        Table,
        Graph
    },

    data () {
        return {
            loaded: false,
            settingsUpdated: false,
            activetab: 'settings',
            numrowsOptions: [
             {
                value: 1,
                label: this.__('One', 'vue-js-app')
             },
             {
                value: 2,
                label: this.__('Two', 'vue-js-app')
             },
             {
                value: 3,
                label: this.__('Three', 'vue-js-app')
             },
             {
                value: 4,
                label: this.__('Four', 'vue-js-app')
             },
             {
                value: 5,
                label: this.__('Five', 'vue-js-app')
             }
            ]
        }
    },

    computed: mapState({
        settings: state => state.settings,
    }),

    watch: {
        '$route.query.tab': function () {
            this.handleTabs(this.$route.query.tab);
        }
    },

    created() {
        this.setSettings();
    },


    mounted() {
        this.handleTabs(this.$route.query.tab);
    },

    methods: {
        handleTabs(query){
            if( query ){
                this.activetab = query;
            }else {
                this.activetab = 'settings';
            }
        },

        setSettings() {
            let self = this;
            self.loaded = false;

            wp.ajax.send( 'vue_js_app_settings', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                },
                success: function(response) {
                    self.$store.dispatch('settings/setSettings', response);
                    self.loaded = true;
                },
                error: function(error) {
                    alert(error);
                }
            });
        },

        updateSettings() {
            let self = this;
            self.settingsUpdated = false;

            wp.ajax.send( 'vue_js_app_update_settings', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                    settings: this.settings,
                },
                success: function(response) {
                    self.settingsUpdated = true;
                },
                error: function(error) {
                    alert(error);
                }
            });
        },

        addNewEmail() {
            if ( this.settings.emails.length >= 5 ) {
                alert(this.__('You cannot add more than 5 emails.', 'vue-js-app'));
                return;
            }

            this.$store.dispatch('settings/addNewEmail', 'example@example.com');
        },

        removeEmail(index) {
            if ( this.settings.emails.length <= 1 ) {
                alert(this.__('At least 1 email required.', 'vue-js-app'));
                return;
            }

            this.$store.dispatch('settings/removeEmail', index);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.vue-js-app-loading{
    font-size: 30px;
    color: #000;
}

.container {
    min-width: 420px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

.clear{
    clear: both;
}

#tabs{
    .tabs {
        overflow: hidden;
        background-color: #fff;
        font-size: 14px;
        margin: 0 0 30px 0;
        padding: 0 20px;

        ul{
            list-style-type: none;
            margin-left: 20px;
        }

        a{
            float: left;
            cursor: pointer;
            border-bottom: 2px solid #fff;
            box-shadow: none;
            color: #666;
            display: inline-block;
            margin-right: 30px;
            padding: 20px 0 18px 0;
            text-decoration: none;

            &.active{
                background-color: #fff;
                color: #484848;
                border-bottom: 2px solid #FF982D;
                cursor: default;
            }

            &:hover{
                border-color: #999;
            }
        }
    }

    .content{
        .tabcontent{
            .tablenav{
                display: none;
            }

            #chart_div{
                margin-top: 20px;
            }

            .refresh-graph{
                text-align: center;
                margin-top: 30px;

                button{
                    font-size: 20px;
                }
            }
        }
    }
}

.vue-js-app-setting-row{
    padding: 20px 0;
    font-size: 14px;
    line-height: 1.3;

    p{
        font-size: 14px;
        line-height: 1.3;
    }

    .vue-js-app-setting-label{
        display: block;
        float: left;
        width: 200px;
        padding: 0 20px 0 0;

        label{
            display: block;
            font-weight: 600;
            font-size: 1.1em;
        }
    }

    .vue-js-app-setting-field{
        display: block;
        margin: 0 0 20px 200px;

        input[type="select"],
        input[type="text"],
        input[type="email"] {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 3px;
            box-shadow: none;
            color: #333;
            display: inline-block;
            vertical-align: middle;
            padding: 7px 12px;
            margin: 0 10px 0 0;
            width: 400px;
            min-height: 35px;

        }

        .desc{
            font-style: italic;
            color: #777;
            margin: 8px 0 0;
        }
    }

}

.vue-js-app-button{
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    margin: 0;
    padding: 8px 16px;
    min-height: 35px;
    background-color: #0085ba;
    border-color: #0073aa #006799 #006799;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-shadow: none;
    box-shadow: none;
    outline: none;
    box-shadow: 0 1px 0 #006799;

    &:hover{
        background: #0073aa;
        border-color: #006799;
        box-shadow: inset 0 2px 0 #006799;
    }

    &.btn-control{
        padding: 3px 14px;
        font-size: 24px;
    }

    &.danger{
        background-color: red;
        border-color: red;
    }
}
</style>
