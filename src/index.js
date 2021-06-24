import VueModal from './components/Modal';
import vueModalService from './service';

// expose component and service to global scope
if (typeof window !== 'undefined' && window.Vue) {
  if (window.vue2ModalDebug) {
    console.log('installing Vue js plugin - browser'); //eslint-disable-line
  }

  window.Vue.use({
    install(NewVue) {
      NewVue.component('modal', VueModal);
      NewVue.prototype.$showModal = vueModalService.showModal;
      NewVue.prototype.$showModalStack = vueModalService.showModalStack;
      NewVue.prototype.$hideAllModals = vueModalService.hideAllModals;
      NewVue.prototype.$setModalDefaults =
        vueModalService.setModalDefaults;
    }
  });

  window.vueModalService = vueModalService;
}

export default {
  install: function(NewVue) {
    NewVue.component('modal', VueModal);
    NewVue.prototype.$showModal = vueModalService.showModal;
    NewVue.prototype.$showModalStack = vueModalService.showModalStack;
    NewVue.prototype.$hideAllModals = vueModalService.hideAllModals;
    NewVue.prototype.$setModalDefaults =
      vueModalService.setModalDefaults;
  },
  VueModal,
  vueModalService
};
