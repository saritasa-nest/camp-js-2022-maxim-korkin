import { auth } from '../../firebase/firebase';
import { Film } from '../../interfaces/films/film/Film';

/**
 * Function for handling row click which checks if the user is signed in and if not opens sign in window.
 * @param pk - Primary key of the film in the clicked row.
 */
const handleClick = (pk: number): void => {
  if (auth.currentUser === null) {
    const signin = document.querySelector<HTMLAnchorElement>('.nav-signin');

    if (signin !== null) {
      signin.click();
    }
  } else {
    document.location = `/films/film/?pk=${pk}`;
  }
};

/**
 * Function renders films to the films table.
 * @param films - Array with the films.
 */
export const renderFilms = (films: Film[]): void => {
  const filmsTableBody = document.querySelector('.films-table-body');

  if (filmsTableBody !== null) {
    filmsTableBody.innerHTML = '';
    films.forEach(film => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${film.episodeId}</td>
        <td>${film.title}</td>
        <td>${film.releaseDate}</td>
        <td>${film.producer}</td>
        <td>${film.director}</td>
      `;

      filmsTableBody.append(row);

      row.onclick = () => {
        handleClick(film.pk);
      };
    });
  }
};
