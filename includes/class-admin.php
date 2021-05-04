<?php
namespace VueJSApp;

/**
 * Admin Pages Handler
 */
class Admin {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug       = 'vue-js-app';

        $hook = add_menu_page( __( 'VueJS App', 'vue-js-app' ), __( 'VueJS App', 'vue-js-app' ), $capability, $slug, [ $this, 'plugin_page' ], 'dashicons-text' );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'App', 'vue-js-app' ), $capability, 'admin.php?page=' . $slug . '#/' );
        }

        add_action( 'load-' . $hook, [ $this, 'init_hooks'] );
    }

    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts() {
        wp_enqueue_style( 'vuejsapp-admin' );
        wp_enqueue_script( 'vuejsapp-admin' );

        $vue_js_app = apply_filters( 'vue_js_app_localized_script', array(
            'nonce' => wp_create_nonce( 'vue_js_app' ),
        ) );

        wp_localize_script( 'vuejsapp-admin', 'vueJSApp', $vue_js_app );

        do_action( 'vue_js_app_admin_after_scripts_loaded' );
    }

    /**
     * Render our admin page
     *
     * @return void
     */
    public function plugin_page() {
        ?>
        <div class="error hide-if-js">
            <p><?php _e( 'VueJS App requires JavaScript. Please enable JavaScript from your browser settings.', 'vue-js-app' ); ?></p>
        </div>

        <?php
        echo '<div class="wrap"><div id="vue-js-app"></div></div>';
    }
}
