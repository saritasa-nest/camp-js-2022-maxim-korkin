/**
 * Function appends the new section to the element with the given selector.
 * @param selector - Parent element's selector.
 * @param html - Inner HTML of the new section.
 */
export const appendSectionToSelector = (selector: string, html: string): void => {
  const container = document.querySelector(selector);

  if (container !== null) {
    const newElement = document.createElement('section');

    newElement.innerHTML = html;

    container.append(newElement);
  }
};
