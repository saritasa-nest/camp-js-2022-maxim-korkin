import { startObservingUserActions } from './utils/startObservingUserActions';

// dotenv.config({ path: '../.env' });

document.addEventListener('DOMContentLoaded', () => {
const elems: NodeListOf<Element> = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

startObservingUserActions();
