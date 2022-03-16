/**
 * Function for setting href of the link with the correct primary key.
 * @param primaryKey - Primary key of the link.
 */
export const initEditLink = (primaryKey: number): void => {
  const editLink = document.querySelector<HTMLAnchorElement>('.edit-link');

  if (editLink !== null) {
    editLink.href = `/films/edit/?pk=${primaryKey}`;
  }
};
