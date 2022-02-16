import { onAuthStateChanged } from 'firebase/auth';
import { Modal } from 'materialize-css';

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
    const params = new URLSearchParams(location.search);

    const primaryKey = params.get('pk');

    if (primaryKey !== null) {
      const film = await FilmsService.fetchFilmByPrimaryKey(Number(primaryKey));

      if (film !== null) {
        displayFilmDetails(film);

        const modelElems = document.querySelectorAll('.modal');
        Modal.init(modelElems);

        const confirmDeletionButton = document.querySelector<HTMLButtonElement>('.confirm-deletion-btn');

        confirmDeletionButton?.addEventListener('click', () => {
          confirmDeletion(Number(primaryKey));
        });

        initEditLink(Number(primaryKey));
      } else {
        renderFilmNotFound();
      }
    } else {
      document.location = '/';
    }
  }
});
