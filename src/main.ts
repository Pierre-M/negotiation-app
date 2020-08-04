import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import VScrollLock from 'v-scroll-lock';
import { NegotiationService, NEGOTIATION_SERVICE_KEY } from '@/services/NegotiationService';
import { WEATHER_SERVICE_KEY, WeatherService } from '@/services/WeatherService';
import i18n from './i18n';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VScrollLock);

new Vue({
    render: h => h(App),
    i18n,
    provide: {
        [NEGOTIATION_SERVICE_KEY]: new NegotiationService(),
        [WEATHER_SERVICE_KEY]: new WeatherService({ appId: 'ec02d5d2df7e4f5a7164cbf5e7580a73' }),
    },
}).$mount('#app');
