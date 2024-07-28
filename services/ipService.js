const axios = require('axios');

async function fetchIPData(ip) {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching IP data');
  }
}

module.exports = { fetchIPData };
