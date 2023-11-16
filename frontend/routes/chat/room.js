const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get(`/api/chat/room/:slug`, async (req, res) => {

    try {
		const apiRes = await fetch(`${process.env.API_URL}/chat/room/${req.params.slug}/`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when trying to get room',
		});
    }
});

module.exports = router;