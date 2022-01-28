import { Modal } from 'materialize-css';

import { startObservingUserActions } from './utils/auth/startObservingUserActions';

document.addEventListener('DOMContentLoaded', () => {
const elems: NodeListOf<Element> = document.querySelectorAll('.modal');
  Modal.init(elems);
});

startObservingUserActions();
