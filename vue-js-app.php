<?php
/*
Plugin Name: VueJS App
Plugin URI: https://mahbub.me/
Description: Plugin for Awesome Motive
Version: 1.0.0
Author: Mahbubur Rahman
Author URI: https://mahbub.me/
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: vue-js-app
Domain Path: /languages
*/

/**
 * Copyright (c) YEAR Your Name (email: Email). All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Vue_JS_App class
 *
 * @class Vue_JS_App The class that holds the entire Vue_JS_App plugin
 */
final class Vue_JS_App {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = '1.0.0';

    /**
     * Holds various class instances
     *
     * @var array
     */
    private $container = array();

    /**
     * Constructor for the Vue_JS_App class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
    }

    /**
     * Initializes the Vue_JS_App() class
     *
     * Checks for an existing Vue_JS_App() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Vue_JS_App();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'VUEJSAPP_VERSION', $this->version );
        define( 'VUEJSAPP_FILE', __FILE__ );
        define( 'VUEJSAPP_PATH', dirname( VUEJSAPP_FILE ) );
        define( 'VUEJSAPP_INCLUDES', VUEJSAPP_PATH . '/includes' );
        define( 'VUEJSAPP_URL', plugins_url( '', VUEJSAPP_FILE ) );
        define( 'VUEJSAPP_ASSETS', VUEJSAPP_URL . '/assets' );
        define( 'VUE_JS_APP_OPTION_NAME', 'test_project_option' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {
        $installed = get_option( 'vuejsapp_installed' );

        if ( ! $installed ) {
            $this->insert_default_options();
            update_option( 'vuejsapp_installed', time() );
        }

        update_option( 'vuejsapp_version', VUEJSAPP_VERSION );
    }

    public function insert_default_options() {
        $admin_email  = get_option( 'admin_email' );
        $default_options = array(
            'numrows'   => 5,
            'humandate' => true,
            'emails'    => array( $admin_email )
        );

        update_option( VUE_JS_APP_OPTION_NAME, $default_options );
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {
        //
    }

    /**
     * Include the required files
     *
     * @return void
     */
    public function includes() {
        // prepare the environment
        require_once VUEJSAPP_INCLUDES . '/functions.php';
        require_once VUEJSAPP_INCLUDES . '/class-assets.php';

        if ( $this->is_request( 'admin' ) ) {
            require_once VUEJSAPP_INCLUDES . '/class-i18n.php';
            require_once VUEJSAPP_INCLUDES . '/class-admin.php';
        }

        if ( $this->is_request( 'ajax' ) ) {
            require_once VUEJSAPP_INCLUDES . '/class-ajax.php';
        }
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'init', array( $this, 'init_classes' ) );

        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['i18n']  = new VueJSApp\i18n();
            $this->container['admin'] = new VueJSApp\Admin();
        }

        if ( $this->is_request( 'ajax' ) ) {
            $this->container['ajax'] = new VueJSApp\Ajax();
        }

        $this->container['assets'] = new VueJSApp\Assets();
    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'vue-js-app', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();

            case 'ajax' :
                return defined( 'DOING_AJAX' );
        }
    }

} // Vue_JS_App

$vuejsapp = Vue_JS_App::init();
