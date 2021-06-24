import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Install from './components/Install';
import Options from './components/Options';
import ModalResult from './components/ModalResult';
import Examples from './components/Examples';
import ExamplesOpenOn from './components/Examples-openOn';
import ExamplesWidth from './components/Examples-width';
import ExamplesPassingData from './components/Examples-passingData';
import ExamplesStack from './components/Examples-stack';

Vue.use(VueRouter);

const routes = [{
  path: '*',
  redirect: '/home'
}, {
  path: '/',
  redirect: '/home'
}, {
  name: 'Home',
  path: '/home',
  component: Home
}, {
  name: 'Install',
  path: '/install',
  component: Install
}, {
  name: 'Options',
  path: '/options',
  component: Options
}, {
  name: 'ModalResult',
  path: '/modal-result',
  component: ModalResult
}, {
  name: 'Examples',
  path: '/examples',
  component: Examples,
  redirect: '/examples/open-on',
  children: [{
    name: 'ExamplesOpenOn',
    path: '/examples/open-on',
    component: ExamplesOpenOn,
  }, {
    name: 'ExamplesWidth',
    path: '/examples/width',
    component: ExamplesWidth,
  }, {
    name: 'ExamplesPassingData',
    path: '/examples/passing-data',
    component: ExamplesPassingData,
  }, {
    name: 'ExamplesStack',
    path: '/examples/stack',
    component: ExamplesStack,
  }]
}];

export default new VueRouter({
  base: '/vue-modal/',
  routes,
  scrollBehavior(to) {
    if (to.name === 'Home') {
      return {
        x: 0,
        y: 0
      };
    }

    return {
      x: 0,
      y: 550
    };
  }
});
