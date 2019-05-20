import * as types from '../constants/ActionTypes'

let nextUserId = 0

export const addUser = name => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
})

export const syncVideo = (message, author, currentTime) => ({
	type: types.SYNC_VIDEO,
	message,
	author,
	currentTime
})

export const getUser = (name) => {
    return {
        type: types.GET_USER,
        name: name
    }
}

export const triggerGetUser = () => {
    return {
        type: types.TRIGGER_GET_USER
    }
}

export const syncUserVideo = (ws, name, currentTime, merger) => ({
	type: types.SYNC_USER_VIDEO,
	ws,
	name,
	currentTime,
	merger
})

export const updateUserVideo = (ws, name, currentTime, merger) => ({
	type: types.UPDATE_VIDEO,
	ws,
	name,
	currentTime,
	merger
})
