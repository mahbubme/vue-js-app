<?php

/**
 * Access capability for this app
 *
 * @since 1.0.0
 */
function vue_js_app_access_capability() {
    return apply_filters( 'vue_js_app_access_capability', 'manage_options' );
}

/**
 * Get option table data of this plugin
 *
 * @since 1.0.0
 */
function vue_js_app_options() {
    return get_option( VUE_JS_APP_OPTION_NAME );
}

/**
 * Update options
 *
 * @since 1.0.0
 *
 * @return array
 */
function vue_js_app_get_option( $name ) {
    $options = vue_js_app_options();
    return $options[$name];
}

/**
 * Update options
 *
 * @since 1.0.0
 *
 * @return void
 */
function vue_js_app_update_option( $name, $value ) {
    $options           = vue_js_app_options();
    $options[$name]    = $value;

    update_option( VUE_JS_APP_OPTION_NAME, $options );
}