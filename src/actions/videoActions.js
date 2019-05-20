export const addVideo = (video) => {
    return {
        type: "ADD_VIDEO",
        payload: video
    };
}

export const updateTimeStamp = (video) => {
    return {
        type: "UPDATE_TIMESTAMP",
        payload: video
    };
}

