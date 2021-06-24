import Vue from 'vue';
import VueModal from '../src/index';

import App from './components/App';
import Sidebar from './components/Sidebar';
import Modal1 from './components/Modal1';
import Modal2 from './components/Modal2';
import Modal3 from './components/Modal3';
import Modal4 from './components/Modal4';
import router from './router';

Vue.use(VueModal);

Vue.component('sidebar', Sidebar);
Vue.component('modal-1', Modal1);
Vue.component('modal-2', Modal2);
Vue.component('modal-3', Modal3);
Vue.component('modal-4', Modal4);

new Vue({
    template: '<App></App>',
    router,
    components: {
      App
    }
  })
  .$mount('#app');
