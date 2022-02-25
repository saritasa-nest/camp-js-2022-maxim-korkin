import { onAuthStateChanged } from 'firebase/auth';
import { Modal } from 'materialize-css';

import { getSearchParam } from '../../utils/getSearchParam';
import { FilmsService } from '../../services/films/FilmsService';
import { displayFilmDetails } from '../../features/filmDetails/displayFilmDetails';
import { renderFilmNotFound } from '../../features/filmDetails/renderFilmNotFound';
import { confirmDeletion } from '../../features/filmDetails/confirmDeletion';
import { initEditLink } from '../../features/filmDetails/initEditLink';
import { auth } from '../../firebase/firebase';

onAuthStateChanged(auth, async user => {
  if (user === null) {
    document.location = '/';
  } else {
    const primaryKey = Number(getSearchParam('pk'));

    if (!isNaN(primaryKey) && primaryKey !== 0) {
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
    } else {
      renderFilmNotFound();
    }
  }
});
