import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { WAKATIME_TOKEN } from '$env/static/private';

// Set up caching for Axios
const axiosInstance = axios.create();
const cachedAxios = setupCache(axiosInstance);

// Store the encoded token
const encodedToken = Buffer.from(`${WAKATIME_TOKEN}:`).toString('base64');

export const GET: RequestHandler = async () => {
	let humanReadableTime: string;

	try {
		const response = await cachedAxios.get(
			'https://wakatime.com/api/v1/users/current/all_time_since_today',
			{
				headers: {
					Authorization: `Basic ${encodedToken}`
				},
				cache: {
					ttl: 1000 * 60 * 5 // Cache request for 5 minutes
				}
			}
		);

		humanReadableTime = response.data.data.text;
	} catch (error) {
		console.error('Error fetching data from Wakatime API:', error);
		humanReadableTime = 'Failed to fetch data';
	}

	// Set caching headers for the browser
	const headers = {
		'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
		Expires: new Date(Date.now() + 300 * 1000).toUTCString() // Set expiration date
	};

	return json(
		{
			time: humanReadableTime
		},
		{ headers }
	);
};
