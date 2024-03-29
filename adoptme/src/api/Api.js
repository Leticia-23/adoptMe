export const baseUrl = "http://localhost:8080/api";

// Helpers

function serverRequest(path, requestOptions, tokenOverride = null) {
  let token = null;
  if (tokenOverride) {
    token = tokenOverride;
  } else {
    token = localStorage.getItem("token");
  }

  // Add sesion token to the request if logged
  if (token) {
    if (!tokenOverride) token = JSON.parse(token);
    if (token) requestOptions.headers["Authorization"] = "Bearer " + token;
  }

  return fetch(baseUrl + path, requestOptions).then(async (response) => {
    console.log("Response fetch: ", response);
    if (response.ok) {
      if (response.status === 204) {
        return "No content succes";
      } else {
        return await response.json();
      }
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

function patchRequest(path, body) {
  let requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return serverRequest(path, requestOptions);
}

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

function deleteRequest(path, body) {
  let requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return serverRequest(path, requestOptions);
}

// Functions
export async function login_api({ email, password }) {
  return postRequest("/auth/login", arguments[0]);
}

export async function createUser({ name, email, password, repeatPassword }) {
  return postRequest("/auth/signup", arguments[0]);
}

export async function logout_api() {
  return postRequest("/auth/logout");
}

export async function deleteOwnAccount_api() {
  return deleteRequest("/users", {});
}

export async function banUserAccount(userId = null) {
  return deleteRequest("/users/" + userId, {});
}

export async function getSelfInformation() {
  return getRequest("/users/info/me");
}

export async function getUserInformation(id = null) {
  return getRequest("/users/" + id);
}

export async function getSelfInstitutionInfo() {
  return getRequest("/institutions/info/me");
}

export async function getInstitutionInfo(id = null) {
  return getRequest("/institutions/" + id);
}

export async function banInstitutionAccount(institutionId = null) {
  return deleteRequest("/institutions/" + institutionId, {});
}

export async function getInstitutions_api() {
  return getRequest("/institutions");
}

export async function getAdoptAnimals_api() {
  return getRequest("/animals");
}

export async function getAdoptedAnimals_api() {
  return getRequest("/animals/adopted");
}

export async function getPublicAnimal_api(animalId = null) {
  return getRequest("/animals/public/" + animalId);
}

export async function getPrivateAnimal_api(animalId = null) {
  return getRequest("/animals/" + animalId);
}

export async function getUsers_api() {
  return getRequest("/users");
}

export async function registerInstitution_api({
  name,
  email,
  password,
  repeatPassword,
}) {
  return postRequest("/auth/signup/institution", arguments[0]);
}

export async function getInstitutionAnimals(institutionId = null) {
  return getRequest("/institutions/" + institutionId + "/animals");
}

export async function registerAnimal_api(
  animal_name,
  specie,
  breed,
  sex,
  description,
  photo
) {
  return postRequest("/animals", arguments[0]);
}

export async function updateUser_api(
  new_name,
  biography,
  actual_password,
  password,
  repeatPassword,
  avatar
) {
  return patchRequest("/users/profile", arguments[0]);
}

export async function updateInstitution_api(
  new_name,
  web_URL,
  avatar,
  actual_password,
  password,
  repeatPassword,
  phoneNumber,
  information
) {
  return patchRequest("/institutions/profile", arguments[0]);
}

export async function banAnimal(animalId = null) {
  return deleteRequest("/animals/" + animalId, {});
}

export async function updateAnimal_api(
  new_animal_name,
  description,
  bornDate,
  size,
  color,
  danger,
  sterile,
  adopted,
  adoptionDate,
  photo,
  animalId
) {
  console.log(arguments[0]);
  console.log(arguments[0].animalId);
  return patchRequest("/animals/" + arguments[0].animalId, arguments[0]);
}

export async function uploadAvatar({ imgFile = null }) {
  let path = "/images/avatar";

  let data = new FormData();
  data.append("avatar", imgFile);

  let requestOptions = {
    method: "POST",
    headers: {},
    body: data,
  };
  return serverRequest(path, requestOptions);
}
