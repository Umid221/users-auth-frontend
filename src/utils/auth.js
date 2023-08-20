export function isAuthenticated() {
  const accessToken = localStorage.getItem("userAuthAccessToken");
  return !!accessToken;
}
