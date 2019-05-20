const initState = {
    videos: []
  }
  
const videoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
        return {
          ...state,
          videos: [action.payload, ...state.videos]
    }
    case 'UPDATE_TIMESTAMP':
      // let newVids = state.videos.map(
      //   video => video.name === action.payload.name ? {...video, currentTime: action.payload.currentTime} :  video
        
      // );
      let newVids = state.videos.map(
        function(video) { 
          return {
          currentTime: action.payload.currentTime, 
          id: video.id,
          mp4: video.mp4,
          name: video.name,
          videoStreamMerger: video.videoStreamMerger
          }
        }
      );
      return {
        ...state,
        videos: newVids
      }
    default:
      return state;
  }
};

export default videoReducer;