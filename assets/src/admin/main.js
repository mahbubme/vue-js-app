import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store';
import commonMixins from './mixins/common';
import { setLocaleData, __, _x, _nx, sprintf } from '@wordpress/i18n';

// mixin
Vue.mixin( commonMixins );
Vue.mixin({
    methods: {
        __,
        _x,
        _nx,
        sprintf
    }
});

setLocaleData(window.vueJSApp.locale_data, 'vue-js-app');

Vue.config.productionTip = false

new Vue({
    el: '#vue-js-app',
    router,
    store,
    render: h => h(App)
});
