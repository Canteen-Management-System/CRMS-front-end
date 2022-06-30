import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiUrl = "/token/";
const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const config = {
  headers: {
    authorization: `Bearer ${getJwt()}`,
  },
};

async function login(username, password) {
  const data = await http.post(apiUrl, { username, password });
  const accessToken = data.data.access;
  const refreshToken = data.data.refresh;
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(ACCESS_TOKEN);
    return jwtDecode(jwt);
  } catch (ex) {
    return false;
  }
}

function getJwt() {
  try {
    return localStorage.getItem(ACCESS_TOKEN);
  } catch (err) {
    return null;
  }
}

// http.setJwt(getJwt());

const auth = {
  login,
  logout,
  getCurrentUser,
  getJwt,
  config,
};

export default auth;
