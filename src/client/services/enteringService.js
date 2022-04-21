const url = "https://one-aviation.herokuapp.com";

export const signInPost = (data) => {
  return fetch(url + "/api/v1/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
