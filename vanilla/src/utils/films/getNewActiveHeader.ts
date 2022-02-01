import { OrderingFields } from '../enums/OrderingFields';

/**
 * Function which finds correct table header by ordering field and returns it.
 * @param orderingField - Current ordering field to find right header.
 * @returns Table header element or null if nothing was found.
 */
export const getNewActiveHeader = (orderingField: OrderingFields): Element | null => {
  switch (orderingField) {
    case OrderingFields.EpisodeId:
      return document.querySelector('.episode-id-header');
    case OrderingFields.Title:
      return document.querySelector('.title-header');
    case OrderingFields.ReleaseDate:
      return document.querySelector('.release-date-header');
    case OrderingFields.Producer:
      return document.querySelector('.producer-header');
    case OrderingFields.Director:
      return document.querySelector('.director-header');
    default:
      return null;
  }
};
