import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL);

export function start_mongo(): Promise<MongoClient> {
	return client.connect();
}
export async function disconnect(): Promise<void> {
	await client.close();
}

export default client.db('portfolio');
