import { PaginationModes } from '../../enums/films/PaginationModes';
import { OrderingFields } from '../../enums/films/OrderingFields';

/**
 * Function which adds event listeners to table headers for changing ordering field.
 * @param header - Table header element.
 * @param orderingField - Field to order by.
 * @param displayFunction - Function which fetches and displays films in the table.
 */
export const addHeaderPagination = (header: Element | null, orderingField: OrderingFields, displayFunction: Function): void => {
  if (header !== null) {
    header.addEventListener('click', () => {
      displayFunction(PaginationModes.Init, orderingField);
    });
  }
};
