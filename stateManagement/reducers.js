import { initialState } from "./initialState";

/**
 * Answers to a "foods:filter" event - updates the foodsFiltered array in the store
 * @param state
 * @param action
 */
export function mySingleReducer(state = initialState, action){

  switch (action.type){

    case 'feedArray:edit':
      // update an element of the array
      let feedEvent = action.payload;
      let postArray = [...state.posts];
      let indexOfPostToUpdate = postArray.findIndex(post => post.id === feedEvent.id);
      postArray[indexOfPostToUpdate] = feedEvent;
      return {
        ...state,
        posts: postArray
      };

    case 'feedArray:init':
      // update array of posts
      let feedArray = action.payload;
      feedArray.forEach((el, idx) => {
        feedArray[idx].comments = feedArray[idx].comments.reverse();
      });
      return {
        ...state,
        posts: feedArray
      };

    default:
      return state;
  }
}