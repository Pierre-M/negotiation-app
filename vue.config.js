module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/ui/styles/_index.scss";`,
            },
        },
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'messages',
            enableInSFC: false,
        },
    },
};
