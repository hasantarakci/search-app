const BASE_URL = "http://localhost:3000";

function getFetchOptions(method, requestBody) {
  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(requestBody),
  };

  return fetchOptions;
}

function fetchFunction(api) {
  return new Promise((resolve, reject) => {
    const fetchOptions = getFetchOptions("GET");

    fetch(BASE_URL + api, fetchOptions)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const fetchPhones = (
  page,
  successCallback,
  errorCallback,
  notFoundCallback
) => {
  fetchFunction(`/phones?_page=${page}&_limit=12`)
    .then((response) => {
      if (!response.ok) {
        if (errorCallback) errorCallback();
        return;
      }

      if (response.status === 204) {
        if (notFoundCallback) notFoundCallback();
        return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        if (successCallback)
          successCallback(data, response.headers.get("X-TOTAL-COUNT"));
      });
    })
    .catch(() => {
      if (errorCallback) errorCallback();
    });
};

export const fetchFilteredPhones = (
  text,
  successCallback,
  errorCallback,
  notFoundCallback
) => {
  fetchFunction(`/phones?q=${text}`)
    .then((response) => {
      if (!response.ok) {
        if (errorCallback) errorCallback();
        return;
      }

      if (response.status === 204) {
        if (notFoundCallback) notFoundCallback();
        return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        if (successCallback) successCallback(data);
      });
    })
    .catch(() => {
      if (errorCallback) errorCallback();
    });
};
