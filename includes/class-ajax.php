<?php
namespace VueJSApp;

/**
 * The ajax handler class
 */
class Ajax {

    public function __construct() {

        // backend ajax requests
        add_action( 'wp_ajax_vue_js_app_get_data', array( $this, 'get_the_data' ) );
        add_action( 'wp_ajax_vue_js_app_update_settings', array( $this, 'update_settings' ) );
        add_action( 'wp_ajax_vue_js_app_settings', array( $this, 'get_all_settings' ) );
    }

    /**
     * Administrator validation
     *
     * @return void
     */
    public function check_admin() {
        if ( ! current_user_can( vue_js_app_access_capability() ) ) {
            wp_send_json_error( __( 'You do not have sufficient permission.', 'vue-js-app' ) );
        }
    }

    /**
     * Get data from API endpoint
     *
     * @return void
     */
    public function get_the_data() {
        check_ajax_referer( 'vue_js_app' );
        $this->check_admin();

        $post_data   = wp_unslash( $_POST );
        $key         = 'vue_js_app_data';
        $data        = get_transient( $key );

        if ( isset( $post_data['refresh'] ) && $post_data['refresh']  == 'true' ) {
            $data = false;
            delete_transient( $key );
        }

        if ( false === $data ) {
            $request_uri = 'https://miusage.com/v1/challenge/2/static/';
            $request     = wp_remote_get( $request_uri );

            if ( is_wp_error( $request ) || '200' != wp_remote_retrieve_response_code( $request ) )
                return;

            $data = json_decode( wp_remote_retrieve_body( $request ) );

            if ( empty( $data ) ) {
                return;
            }

            set_transient( $key, $data, HOUR_IN_SECONDS );
        }

        wp_send_json_success( $data );
    }

    /**
     * Get the values of all settings
     *
     * @return void
     */
    public function get_all_settings() {
        check_ajax_referer( 'vue_js_app' );
        $this->check_admin();

        return wp_send_json_success( vue_js_app_options() );
    }

    /**
     * Update setting
     *
     * @return void
     */
    public function update_settings() {
        check_ajax_referer( 'vue_js_app' );
        $this->check_admin();

        $settings           = wp_unslash( $_POST['settings'] );
        $options_to_update  = array();

        if ( isset( $settings['numrows'] )  && !empty( $settings['numrows'] ) ) {
            $numrows = intval( $settings['numrows'] );
            $min     = 1;
            $max     = 5;

            if ( ( $min <= $numrows ) && ( $numrows <= $max ) ) {
                $options_to_update['numrows'] = $numrows;
            }
        }

        if( isset( $settings['humandate'] ) && !empty( $settings['humandate'] ) ) {
            $humandate = $settings['humandate'] === 'true'? true: false;
            $options_to_update['humandate'] = $humandate;
        }

        if ( isset( $settings['emails'] ) && !empty( $settings['emails'] ) && is_array( $settings['emails'] ) ) {
            $emails = array();

            foreach ( $settings['emails'] as $email ) {
                if ( is_email( sanitize_email( $email ) ) ) {
                    $emails[] = $email;
                }
            }

            if ( !empty( $emails ) ) {
                $options_to_update['emails'] = $emails;
            }
        }

        if ( ! empty( $options_to_update ) ) {
            foreach ($options_to_update as $name => $value) {
                vue_js_app_update_option( $name, $value );
            }
        }

        wp_send_json_success();
    }

}
