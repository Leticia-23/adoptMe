export const baseUrl = "http://localhost:8080/api";

export function toImageUrl(avatarId) {
  return baseUrl + "/users/avatar/" + avatarId;
}

// Helpers

function serverRequest(path, requestOptions, tokenOverride = null) {
  let token = null;
  if (tokenOverride) {
    token = tokenOverride;
  } else {
    token = localStorage.getItem("token");
  }

  // Añadimos el token de sesión a la petición si estamos loggeados
  if (token) {
    if (!tokenOverride) token = JSON.parse(token);
    if (token) requestOptions.headers["Authorization"] = "Bearer " + token;
  }

  return fetch(baseUrl + path, requestOptions).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    throw await response.json();
  });
}

function postRequest(path, body) {
  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return serverRequest(path, requestOptions);
}

/* function putRequest(path, body) {
  let requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return serverRequest(path, requestOptions);
} */

function getRequest(path, body = {}, tokenOverride = null) {
  let params = new URLSearchParams();
  for (let [key, value] of Object.entries(body)) {
    if (value) params.append(key, value);
  }

  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return serverRequest(path + "?" + params, requestOptions, tokenOverride);
}

/* function deleteRequest(path, body) {
  let requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return serverRequest(path, requestOptions);
} */

// Functions
export async function login_api({ email, password }) {
  return postRequest("/auth/login", arguments[0]);
}

export async function createUser({ name, email, password, repeatPassword }) {
  console.log(name, email, password, repeatPassword);
  return postRequest("/auth/signup", arguments[0]);
}
