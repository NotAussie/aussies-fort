import { promises as fs } from 'fs';
import path from 'path';

export interface Post {
	id: string;
	metadata: {
		title: string;
		createdAt: Date;
		updatedAt?: Date;
		summary: string;
		authors: string[];
	};
	content: string;
}

// Function to load all posts
export async function loadPosts(): Promise<Post[]> {
	const postsDirectory = path.join(process.cwd(), 'src/content/posts');
	const filenames = await fs.readdir(postsDirectory);

	return Promise.all(
		filenames.map(async (filename) => {
			const filePath = path.join(postsDirectory, filename);
			return await gatherPostData(filePath, filename);
		})
	);
}

// Function to load a single post by ID
export async function loadPostById(id: string): Promise<Post | null> {
	const filePath = path.join(process.cwd(), `src/content/posts/${id}.svelte`);
	try {
		return await gatherPostData(filePath, id);
	} catch (error: unknown) {
		if (error instanceof Error) {
			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
				// File not found
				console.warn(`Post with ID ${id} not found.`);
				return null; // Return null if the file wasn't found
			} else {
				console.error(`Failed to load post with ID ${id}:`, error.message);
				return null; // Return null for other errors as well
			}
		} else {
			console.error(`Failed to load post with ID ${id}:`, error);
			return null; // Handle unexpected error types
		}
	}
}

// Function to gather post data from a file
async function gatherPostData(filePath: string, filename: string): Promise<Post> {
	const fileContents = await fs.readFile(filePath, 'utf-8');

	const match = fileContents.match(
		/<script context="module">[\s\S]*?export const metadata = ({[\s\S]*?});[\s\S]*?<\/script>/
	);
	if (!match) {
		throw new Error(`Failed to parse metadata for file: ${filename}`);
	}

	const metadata = eval(`(${match[1]})`); // Use eval to parse the metadata object
	if (!metadata.title || !metadata.createdAt || !Array.isArray(metadata.authors)) {
		throw new Error(
			`Metadata is missing required fields or authors is not an array in file: ${filename}`
		);
	}

	metadata.createdAt = new Date(metadata.createdAt);
	if (metadata.updatedAt) {
		metadata.updatedAt = new Date(metadata.updatedAt);
	}

	const content = fileContents.replace(/<script context="module">[\s\S]*?<\/script>/, '');

	return {
		id: filename.replace('.svelte', ''),
		metadata,
		content
	};
}
