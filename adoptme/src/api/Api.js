export const baseUrl = "http://localhost:8080/api";

export function toImageUrl(avatarId) {
  return baseUrl + "/users/avatar/" + avatarId;
}
