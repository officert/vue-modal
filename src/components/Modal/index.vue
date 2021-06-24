<template src="./template.html">
</template>

<style lang="less" src="./styles.less"></style>

<script>
import Vue from 'vue';

import eventBus from '../../eventBus';
import domUtils from '../../utils/domUtils';

function isString(val) {
  return typeof val === 'string';
}

const Z_INDEX_BASE = 100;

const vm = {
  name: 'modal',
  components: {},
  data() {
    return {
      modals: []
    };
  },
  computed: {
    modalsVisible() {
      return this.modals.filter(modal => modal.visible).length;
    },
    modalBgVisible() {
      return this.modals.filter(modal => modal.hideBg).length === 0;
    },
    modalBgRemoved() {
      return this.modals.filter(modal => modal.removeBg).length > 0;
    },
    modalTopVisibleZIndex() {
      const visibleModals = this.modals.filter(modal => modal.visible);

      return (visibleModals.length > 0) ? Math.max(...visibleModals.map(modal => modal.styles['z-index'])) : Z_INDEX_BASE;
    }
  },
  methods: {
    getModalClasses(modal) {
      const modalClasses = {};

      if (modal.openOn === 'left') {
        modalClasses['open-on-left'] = true;
      } else if (modal.openOn === 'bottom') {
        modalClasses['open-on-bottom'] = true;
      } else if (modal.openOn === 'top') {
        modalClasses['open-on-top'] = true;
      } else {
        modalClasses['open-on-right'] = true;
      }

      if (modal.cssClass) {
        modalClasses[modal.cssClass] = true;
      }

      return modalClasses;
    },
    closeCurrentModal(data) {
      if (!this.modals || !this.modals.length) return;

      const currentModal = this.modals[this.modals.length - 1];

      this.closeModal(currentModal, data);
    },
    closeModal(modal, data) {
      if (!modal) throw new Error('modal');

      eventBus.$emit(`hideModal-${modal.id}`, {
        id: modal.id,
        data
      });

      modal.visible = false;

      if (!this.modalsVisible) {
        this.removeBodyClass();
      }

      setTimeout(() => {
        if (!modal.keepAlive) {
          const index = this.modals.indexOf(modal);

          this.removeModalStylesheet(modal);

          this.modals.splice(index, 1);
        }
      }, 300); //NOTE: need to delay removing here to allow CSS animation on .slideout to finish
    },
    onShowModal(modal) {
      const existingModal = this.modals.filter(p => p.id === modal.id)[0];

      if (existingModal) {
        existingModal.props = modal.props;
        modal = existingModal;
      }

      modal.styles = {
        'z-index': this.modals.length + Z_INDEX_BASE
      };

      if (modal.openOn === 'top' || modal.openOn === 'bottom') {
        modal.styles.width === '100%';

        if (!modal.height) {
          modal.styles.height = '900px';
        } else if (!modal.height.endsWith || !modal.height.endsWith('px')) {
          modal.styles.height = `${modal.height}px`;
        } else {
          modal.styles.height = modal.height;
        }
      } else {
        modal.styles.height === '100%';

        if (!modal.width) {
          modal.styles.width = '900px';
        } else if (!modal.width.endsWith || !modal.width.endsWith('px')) {
          modal.styles.width = `${modal.width}px`;
        } else {
          modal.styles.width = modal.width;
        }
      }

      modal.visible = true;
      modal.cssId = `modal-${modal.id}`;
      modal.stylesheetId = `modal-styles-${modal.id}`;
      modal.inlineComponent = !isString(modal.component);
      modal.componentName = isString(modal.component) ? modal.component : modal.component.name; //tuck away the actual component name

      if (window.vue2ModalDebug) {
        console.log('modal', modal);
      }

      if (!existingModal) {
        this.createModalStylesheet(modal);

        this.modals.push(modal);
      }

      this.addBodyClass();
    },
    onHideModal(modal) {
      this.closeCurrentModal(modal);
    },
    onHideAllSideOutModals() {
      (this.modals || []).reverse()
        .forEach(modal => {
          this.closeModal(modal);
        });
    },
    createModalStylesheet(modal) {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';

      const css = `@media screen and (max-width:${modal.styles.width}) {
        #${modal.cssId} {
          width: 100% !important;
        }
      }`;

      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      style.id = modal.stylesheetId;

      head.appendChild(style);
    },
    removeModalStylesheet(modal) {
      const stylesheetElements = document.querySelectorAll('link[rel=stylesheet]');

      const stylesheet = document.getElementById(modal.stylesheetId);

      for (var index = 0; index < stylesheetElements.length; index++) {
        var sheet = stylesheetElements[index];

        try {
          sheet.parentNode.removeChild(stylesheet);
        } catch (err) {}
      }
    },
    addBodyClass() {
      domUtils.addClass(document.body, 'modal-open');
    },
    removeBodyClass() {
      domUtils.removeClass(document.body, 'modal-open');
    },
    onBgClicked() {
      const currentModal = this.modals[this.modals.length - 1];

      if (!currentModal || currentModal.disableBgClick) {
        return;
      }

      this.closeCurrentModal({
        closedBy: 'bg'
      });
    },
    onEscapeKeypress(e) {
      if (e.keyCode === 27) {
        const currentModal = this.modals[this.modals.length - 1];

        if (!currentModal || currentModal.disableEscClick) {
          return;
        }

        this.closeCurrentModal({
          closedBy: 'esc'
        });
      }
    }
  },
  created() {
    document.addEventListener('keydown', this.onEscapeKeypress);

    eventBus.$on('showModal', this.onShowModal);
    eventBus.$on('hideModal', this.onHideModal);
    eventBus.$on('hideAllModals', this.onHideAllSideOutModals);
  },
  destroyed() {
    document.removeEventListener('keydown', this.onEscapeKeypress);

    eventBus.$off('showModal', this.onShowModal);
    eventBus.$off('hideModal', this.onHideModal);
    eventBus.$off('hideAllModals', this.onHideAllSideOutModals);
  }
};

export default vm;
</script>
