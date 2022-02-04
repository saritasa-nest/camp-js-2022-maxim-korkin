/**
 * Function for changing navbar when the user signs out.
 */
export function changeNavBarOnSignOut(): void {
  const navBarButtons = document.querySelector('#nav-mobile');
  if (navBarButtons !== null) {
    navBarButtons.innerHTML = `
  <li>
    <a class="modal-trigger" href="#signin">Sign In</a>
  </li>
  <li>
    <a class="modal-trigger" href="#signup">Sign Up</a>
  </li>`;
  }
}
