/**
 * Function for changing navbar when the user signs out.
 */
export default function changeNavBarOnSignIn(): void {
  const navBarButtons: Element | null = document.querySelector('#nav-mobile');
  if (navBarButtons) {
    navBarButtons.innerHTML = `
  <li>
    <a class="modal-trigger" href="#signin">Sign In</a>
  </li>
  <li>
    <a class="modal-trigger" href="#signup">Sign Up</a>
  </li>`;
  }
}
