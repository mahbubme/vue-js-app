<?php
namespace VueJSApp;

/**
 * Scripts and Styles Class
 */
class Assets {

    function __construct() {

        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', array( $this, 'register' ), 5 );
        } else {
            add_action( 'wp_enqueue_scripts', array( $this, 'register' ), 5 );
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register() {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : VUEJSAPP_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, VUEJSAPP_VERSION );
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts() {
        $prefix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'vuejsapp-vendor' => [
                'src'       => VUEJSAPP_ASSETS . '/js/vendor.js',
                'version'   => filemtime( VUEJSAPP_PATH . '/assets/js/vendor.js' ),
                'in_footer' => true
            ],
            'vuejsapp-admin' => [
                'src'       => VUEJSAPP_ASSETS . '/js/admin.js',
                'deps'      => [ 'wp-util', 'vuejsapp-vendor' ],
                'version'   => filemtime( VUEJSAPP_PATH . '/assets/js/admin.js' ),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'vuejsapp-admin' => [
                'src' =>  VUEJSAPP_ASSETS . '/css/admin.css'
            ],
        ];

        return $styles;
    }

}
