const axios = require('axios');

const geocodeAddress = async (address) => {
  const apiKey = '67ddb11b267749d4946a6f96d139fc7f'; // 🔑 replace with your OpenCage key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    if (res.data.results.length === 0) {
      throw new Error('No location found for address');
    }
    const { lat, lng } = res.data.results[0].geometry;
    return { lat, lng };
  } catch (err) {
    console.error('Geocoding error:', err.message);
    return null;
  }
};

module.exports = geocodeAddress;
