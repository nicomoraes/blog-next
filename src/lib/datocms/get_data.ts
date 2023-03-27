export const getData = async (query: string, options?: RequestInit) => {
  try {
    const res = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `${query}`,
      }),
      ...options,
    });
    return await res.json();
  } catch (error) {
    return console.log(error);
  }
};
