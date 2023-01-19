const BASE_URL = "http://43.201.103.199";

const configWithBody = (method, body) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const GET = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`, { method: "GET" });
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw Error(data);
};

const POST = async (url, bodyData) => {
  const response = await fetch(
    `${BASE_URL}/${url}`,
    configWithBody("POST", bodyData)
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw Error(data);
};

const PATCH = async (url, bodyData) => {
  const response = await fetch(
    `${BASE_URL}/${url}`,
    configWithBody("PATCH", bodyData)
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw Error(data);
};

const DELETE = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`, { method: "DELETE" });
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  throw Error(data);
};

const fetchAPI = {
  GET,
  POST,
  PATCH,
  DELETE,
};

export default fetchAPI;
