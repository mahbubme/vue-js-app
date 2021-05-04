<?php
namespace VueJSApp;

/**
 * i18n class
 */
class i18n {

    public function __construct() {
        add_filter( 'vue_js_app_localized_script', array( $this, 'add_i18n_data' ) );
    }

    public function add_i18n_data( $localized_data ) {
        $localized_data['locale_data'] = $this->get_jed_locale_data( 'vue-js-app' );

        return $localized_data;
    }

    /**
     * Returns Jed-formatted localization data.
     *
     * @since 1.0.0
     *
     * @param  string $domain Translation domain.
     *
     * @return array
     */
    function get_jed_locale_data( $domain ) {
        $translations = get_translations_for_domain( $domain );

        $locale = array(
            '' => array(
                'domain' => $domain,
                'lang'   => is_admin() ? get_user_locale() : get_locale(),
            ),
        );

        if ( ! empty( $translations->headers['Plural-Forms'] ) ) {
            $locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
        }

        foreach ( $translations->entries as $msgid => $entry ) {
            $locale[ $msgid ] = $entry->translations;
        }

        return $locale;
    }
}