import Promise from 'promise-polyfill';

import eventBus from './eventBus';
import utils from './utils/utils';

let MODAL_DEFAULTS = {};

class ModalResult {
  constructor(id, promise, modalOptions) {
    if (!id) throw new Error('id');
    if (!promise) throw new Error('promise');
    if (!modalOptions) throw new Error('modalOptions');

    this._id = id;
    this._promise = promise;
    this._modalOptions = modalOptions;
  }

  get promise() {
    return this._promise;
  }

  /**
   * @param {Object} [modal]
   * @param {Object} [modal.props] - any props you want to update
   */
  show(modal = {}) {
    const modalOptions = Object.assign(this._modalOptions, modal);

    return showModal(modalOptions, this._id);
  }

  hide() {
    const modalOptions = Object.assign({
      id: this._id
    }, this._modalOptions);

    eventBus.$emit('hideModal', modalOptions);
  }
}

function showModal(modalOptions, existingId) {
  if (!modalOptions) throw new Error('modalOptions is required');
  if (!modalOptions.component) throw new Error('modalOptions.component is required');

  const id = existingId || utils.generateGuid();

  modalOptions = Object.assign({}, MODAL_DEFAULTS, modalOptions);

  modalOptions.id = id;
  modalOptions.openOn = modalOptions.openOn || 'left';

  const promise = new Promise(resolve => {
    eventBus.$emit('showModal', modalOptions);

    eventBus.$once(`hideModal-${modalOptions.id}`, payload => {
      return resolve(payload.data);
    });
  });

  return new ModalResult(id, promise, modalOptions);
}

function showModalStack(modalOptions) {
  if (!modalOptions || !modalOptions.length) throw new Error('modalOptions must be an array');

  const modalResults = modalOptions.map((modalOption) => {
    return showModal(modalOption, this._id);
  });

  return modalResults;
}

function hideAllModals() {
  eventBus.$emit('hideAllModals');
}

function setModalDefaults(defaults) {
  if (!defaults) return;

  MODAL_DEFAULTS = defaults;
}

export default {
  showModal,
  showModalStack,
  hideAllModals,
  setModalDefaults
};
