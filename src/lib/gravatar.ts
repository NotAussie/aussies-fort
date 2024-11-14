export async function getGravatarUrl(email: string, size = 80) {
	const trimmedEmail = email.trim().toLowerCase();
	const encoder = new TextEncoder();
	const data = encoder.encode(trimmedEmail);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string

	return `https://www.gravatar.com/avatar/${hashHex}?s=${size}&d=identicon`;
}
