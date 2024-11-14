import type { PageLoad } from './$types';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { WAKATIME_TOKEN } from '$env/static/private';

// Set up caching for Axios
const axiosInstance = axios.create();
const cachedAxios = setupCache(axiosInstance);

// Store the encoded token
const encodedToken = Buffer.from(`${WAKATIME_TOKEN}:`).toString('base64');

export const load: PageLoad = async () => {
	let humanReadableTime: string;

	try {

		const response = await cachedAxios.get(
			'https://wakatime.com/api/v1/users/current/all_time_since_today',
			{
				headers: {
					Authorization: `Basic ${encodedToken}`
				},
				cache: {
					ttl: 1000 * 60 * 5 // Cache request for 5 minutes to prevent spam, this only applies to the edge instance the user is using
				}
			}
		);

		humanReadableTime = response.data.data.text;
	} catch (error) {
		console.error('Error fetching data from Wakatime API:', error);
		humanReadableTime = 'Failed to fetch data';
	}

	return {
		time: humanReadableTime
	};
};
