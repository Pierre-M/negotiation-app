import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import { NegotiationService, NegotiationServiceKey } from '@/services/NegotiationService';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
    render: h => h(App),
    provide: {
        [NegotiationServiceKey]: new NegotiationService(),
    },
}).$mount('#app');
