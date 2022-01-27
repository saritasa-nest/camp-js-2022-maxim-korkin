import { startObservingUserActions } from './utils/startObservingUserActions';

document.addEventListener('DOMContentLoaded', () => {
  const elems: NodeListOf<Element> = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

startObservingUserActions();
