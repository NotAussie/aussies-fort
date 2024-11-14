import { goto } from '$app/navigation';

export function login(redirectTo: string) {
	goto(`/login/?redirectTo=${encodeURI(redirectTo)}`);
}
