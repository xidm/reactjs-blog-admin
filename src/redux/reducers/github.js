

const initialState = {
  github: null
};
  
export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_GITHUB": {
      return {
        github : action.content
      };
    }
    default:
      return state;
  }
}
  