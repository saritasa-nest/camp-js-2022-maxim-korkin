import { AuthService } from '../../services/auth/AuthService';

/**
 * Function for changing navbar when the user signs in.
 * @param email - Email to show at the nav bar.
 */
export function changeNavBarOnSignIn(email: string): void {
  const navBarButtons = document.querySelector('#nav-mobile');
  if (navBarButtons !== null) {
    navBarButtons.innerHTML = `
    <li>
      <div>${email}</div>
    </li>
    <li>
      <a class="signout">Sign Out</a>
    </li>`;

    const signOutButton = document.querySelector('.signout');
    if (signOutButton !== null) {
      signOutButton.addEventListener('click', () => {
        AuthService.signOutUser();
      });
    }
  }
}
