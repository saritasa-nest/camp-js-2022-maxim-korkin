import { AuthService } from './../services/AuthService';

/**
 * Function for changing navbar when the user signs in.
 * @param userName - Username to show in the nav bar.
 */
export default function changeNavBarOnSignIn(userName: string): void {
  const navBarButtons: Element | null = document.querySelector('#nav-mobile');
  if (navBarButtons) {
    navBarButtons.innerHTML = `
    <li>
      <div>${userName}</div>
    </li>
    <li>
      <a class="signout-btn">Sign Out</a>
    </li>`;

    const signOutButton: Element | null = document.querySelector('.signout-btn');
    if (signOutButton) {
      signOutButton.addEventListener('click', () => {
        AuthService.signOutUser();
      });
    }
  }
}
