const configWithBody = (method: string, body: any) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const GET = async (url: string) => {
  const response = await fetch(`/api/${url}`, { method: "GET" });
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  console.dir(data);
  throw data;
};

const POST = async (url: string, bodyData: any) => {
  const response = await fetch(`/api/${url}`, configWithBody("POST", bodyData));
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  console.dir(data);
  throw data;
};

const PATCH = async (url: string, bodyData: any) => {
  const response = await fetch(
    `/api/${url}`,
    configWithBody("PATCH", bodyData)
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  console.dir(data);
  throw data;
};

const DELETE = async (url: string) => {
  const response = await fetch(`/api/${url}`, { method: "DELETE" });
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  console.dir(data);
  throw data;
};

const fetchAPI = {
  GET,
  POST,
  PATCH,
  DELETE,
};

export default fetchAPI;
