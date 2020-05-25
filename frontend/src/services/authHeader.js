/**
 * Constructs the JWT token authorization header required by the backend to
 * authenticate users. If the JWT token is not in localStorage, the returned
 * header is blank, which will prevent authorization in the backend.
 *
 * @returns {{Authorization: string}|{}} The authorization header, or an empty
 * object if the user is not logged in.
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}