import { AuthService } from './../services/AuthService';

/**
 * Function for changing navbar when the user signs in.
 * @param email - Email to show at the nav bar.
 */
export function changeNavBarOnSignIn(email: string): void {
  const navBarButtons: Element | null = document.querySelector('#nav-mobile');
  if (navBarButtons != null) {
    navBarButtons.innerHTML = `
    <li>
      <div>${email}</div>
    </li>
    <li>
      <a class="signout-btn">Sign Out</a>
    </li>`;

    const signOutButton: Element | null = document.querySelector('.signout-btn');
    if (signOutButton != null) {
      signOutButton.addEventListener('click', () => {
        AuthService.signOutUser();
      });
    }
  }
}
