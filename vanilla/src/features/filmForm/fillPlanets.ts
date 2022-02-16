import { Planet } from '../../interfaces/planets/domain/Planet';

/**
 * Function for adding checkboxes with possible planets to the film form.
 * @param form - Form in which to add planets.
 * @param planets - List of planets.
 */
export const fillPlanets = (form: HTMLFormElement, planets: Planet[]): void => {
  const planetsContainer = form.querySelector<HTMLFieldSetElement>('.planets-container');

  if (planetsContainer !== null) {
    planets.forEach(planet => {
      planetsContainer.innerHTML += `
        <label>
          <input type="checkbox" name="planet" value="${planet.pk}">
          <span>${planet.name}</span>
        </label>
      `;
    });
  }
};
