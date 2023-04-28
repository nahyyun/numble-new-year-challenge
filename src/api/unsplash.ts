export const fetchRandomImage = async () => {
  const response = await fetch(`https://api.unsplash.com/photos/random`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
  });
  const {
    urls: { regular },
  } = await response.json();

  return regular;
};
