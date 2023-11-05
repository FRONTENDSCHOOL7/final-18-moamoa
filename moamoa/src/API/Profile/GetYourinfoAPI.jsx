const GetYourinfoAPI = async (infoUrl, token) => {
  const resultUrl = 'https://api.mandarin.weniv.co.kr' + infoUrl;
  try {
    const res = await fetch(resultUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    // console.log(`json : ${json}`);
    return json;
  } catch (error) {
    console.error('An error occurred while fetching data:', error.message);
  }
};

export default GetYourinfoAPI;
