const express = require('express');
const router = express.Router();
const { fetchIPData } = require('../services/ipService');
const { validateRequest } = require('../validators/requestValidator');

router.post('/', async (req, res) => {
  const { error } = validateRequest(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { reqId, ip } = req.body;

  try {
    const ipData = await fetchIPData(ip);
    const result = {
      reqId: reqId,
      country: ipData.country_code,
      lat: ipData.latitude,
      lon: ipData.longitude
    };
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
});

module.exports = router;
