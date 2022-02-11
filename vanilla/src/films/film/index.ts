import { onAuthStateChanged } from 'firebase/auth';

import { FilmsService } from '../../services/films/FilmsService';
import { displayFilmDetails } from '../../features/filmDetails/displayFilmDetails';
import { renderFilmNotFound } from '../../features/filmDetails/renderFilmNotFound';

import { auth } from './../../firebase/firebase';

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
      } else {
        renderFilmNotFound();
      }
    } else {
      document.location = '/';
    }
  }
});
