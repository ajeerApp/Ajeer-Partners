import { breakpointsVuetify } from '@vueuse/core'
import { VIcon } from 'vuetify/components/VIcon'
import { defineThemeConfig } from '@core'
import { Skins } from '@core/enums'

// ❗ Logo png must be imported with ?raw suffix
import ajeerLogo from '@images/pages/ajeer-logo-blue.png'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'

export const { themeConfig, layoutConfig } = defineThemeConfig({
    app: {
        title: 'Ajeer Partners',
        logo: h('img', { src: ajeerLogo, style: 'height:150px' }),
        contentWidth: ContentWidth.Boxed,
        contentLayoutNav: AppContentLayoutNav.Vertical,
        overlayNavFromBreakpoint: breakpointsVuetify.md + 16,
        i18n: {
            enable: false,
            defaultLocale: 'en',
            langConfig: [{
                    label: 'English',
                    i18nLang: 'en',
                    isRTL: false,
                },
                {
                    label: 'French',
                    i18nLang: 'fr',
                    isRTL: false,
                },
                {
                    label: 'Arabic',
                    i18nLang: 'ar',
                    isRTL: true,
                },
            ],
        },
        theme: 'system',
        skin: Skins.Default,
        iconRenderer: VIcon,
    },
    navbar: {
        type: NavbarType.Sticky,
        navbarBlur: true,
    },
    footer: { type: FooterType.Static },
    verticalNav: {
        isVerticalNavCollapsed: false,
        defaultNavItemIconProps: { icon: 'tabler-circle', size: 10 },
        isVerticalNavSemiDark: false,
    },
    horizontalNav: {
        type: 'sticky',
        transition: 'slide-y-reverse-transition',
    },

    /*
      // ℹ️  In below Icons section, you can specify icon for each component. Also you can use other props of v-icon component like `color` and `size` for each icon.
      // Such as: chevronDown: { icon: 'tabler-chevron-down', color:'primary', size: '24' },
      */
    icons: {
        chevronDown: { icon: 'tabler-chevron-down' },
        chevronRight: { icon: 'tabler-chevron-right', size: 18 },
        close: { icon: 'tabler-x' },
        verticalNavPinned: { icon: 'tabler-circle-dot' },
        verticalNavUnPinned: { icon: 'tabler-circle' },
        sectionTitlePlaceholder: { icon: 'tabler-separator' },
    },
})
