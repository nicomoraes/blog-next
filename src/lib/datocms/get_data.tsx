type CacheType = 'force-cache' | 'no-store';

export const getData = async (
  query: string,
  cacheType: CacheType = 'force-cache'
) => {
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
      cache: cacheType,
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
