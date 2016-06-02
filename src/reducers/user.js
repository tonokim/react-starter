import {
	SAVE_USER,
	DELETE_USER
} from '../actions/';

const initialState = {
	phone: null,
	token: null,
	roles: null,
	access_token:null
}

function user (state = initialState,action){
	switch (action.type){
		case SAVE_USER:
			return {
				'phone':action.phone,
				'token':action.token,
				'roles':action.roles,
				'access_token':action.access_token
			};
		case DELETE_USER:
			return initialState;
		default:
			return state;
	}

}

export default user;
