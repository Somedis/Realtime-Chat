const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/chat/', async (req, res) => {
    const { name, user_id } = req.body;
    const body = JSON.stringify({
		name,
		user_id
	});

    try {
		const apiRes = await fetch(`${process.env.API_URL}/chat/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: body
		});

        const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'Something went wrong when trying to create note',
		});
    }
})

module.exports = router;