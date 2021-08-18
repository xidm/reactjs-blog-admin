

const initialState = {
  post: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_POST": {
      return {
        post : [
          ...state.post.concat(action.content),
        ]
      };
    }
    case "EDIT_POST": {
      state.post[action.id] = action.content
      return {
        post : [
          ...state.post,      
        ]
      };      
    }
    case "DELETE_POST": {
      return  {        
        post: [          
          ...state.post.slice(0, action.id),
          ...state.post.slice(action.id + 1),
        ]                     
      }
    }
    default:
      return state;
  }
}
