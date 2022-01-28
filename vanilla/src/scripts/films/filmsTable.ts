import { Modes } from '../../utils/enums/filmsPaginationModes';

import { displayPageOfFilms } from '../../utils/films/displayPageOfFilms';

import { FirstAndLastFilms } from './../../interfaces/films/FirstAndLastFilms';

const firstAndLastFilms: FirstAndLastFilms = { firstFilm: null, lastFilm: null };

displayPageOfFilms(firstAndLastFilms, Modes.Init);
