const initState = {
    configs: [
        {id: 'outMid', x: 0, y: 0, sizeMultiplier: 1, float:'floatleft'}
    ]
  }
  
const configReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CONFIG_LOADED':
      return { ...state };
    case 'CONFIG_LOADING':
      return state;
    default:
      return state;
  }
};

export default configReducer;