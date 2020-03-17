export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const openModal = content => ({
  type: MODAL_OPEN,
  content,
});

export const closeModal = () => ({
  type: MODAL_CLOSE,
});
