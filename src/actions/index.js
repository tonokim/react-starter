import _assign from "lodash/assign";

export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export function saveUser(user) {
	return _assign({ type: SAVE_USER },user);
}

export function deleteUser() {
	return { type: DELETE_USER };
}
