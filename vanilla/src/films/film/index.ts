import { onAuthStateChanged } from 'firebase/auth';

import { FilmsService } from '../../services/films/FilmsService';

import { displayFilmDetails } from '../../utils/filmDetails/displayFilmDetails';

import { displayFilmNotFound } from '../../utils/filmDetails/renderFilmNotFound';

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
        displayFilmNotFound();
      }
    } else {
      document.location = '/';
    }
  }
});
