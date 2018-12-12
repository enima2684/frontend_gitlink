/**
 * Builds the editPostArray Action
 */
export function act__editPostArray(feedEvent){
  return {
    type:'feedArray:edit',
    payload: feedEvent
  }
}

/**
 * Builds the addNewLike Action
 */
export function act__initializePostArray(feedArray){
  return {
    type:'feedArray:init',
    payload: feedArray
  }
}