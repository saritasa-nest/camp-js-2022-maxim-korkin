import { onAuthStateChanged } from 'firebase/auth';
import { Modal } from 'materialize-css';

import { FilmsService } from '../../services/films/FilmsService';
import { displayFilmDetails } from '../../features/filmDetails/displayFilmDetails';
import { renderFilmNotFound } from '../../features/filmDetails/renderFilmNotFound';
import { confirmDeletion } from '../../features/filmDetails/confirmDeletion';
import { initEditLink } from '../../features/filmDetails/initEditLink';
import { auth } from '../../firebase/firebase';
import { checkPrimaryKeyFromSearchParamsAndInitPage } from '../../utils/checkPrimaryKeyFromSearchParamsAndInitPage';

/**
 * Function which inits film details page.
 * @param primaryKey - Primary key of the film.
 */
async function initFilmDetails(primaryKey: number): Promise<void> {
  const film = await FilmsService.fetchFilmByPrimaryKey(primaryKey);

  if (film !== null) {
    displayFilmDetails(film);

    const modelElems = document.querySelectorAll('.modal');
    Modal.init(modelElems);

    const confirmDeletionButton = document.querySelector<HTMLButtonElement>('.confirm-deletion-btn');

    confirmDeletionButton?.addEventListener('click', () => {
      confirmDeletion(primaryKey);
    });

    initEditLink(primaryKey);
  } else {
    renderFilmNotFound();
  }
}

onAuthStateChanged(auth, user => {
  if (user === null) {
    document.location = '/';
  } else {
    checkPrimaryKeyFromSearchParamsAndInitPage(initFilmDetails, renderFilmNotFound);
  }
});
