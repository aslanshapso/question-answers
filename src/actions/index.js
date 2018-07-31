
// List of actions related to fetch data
export const fetchDataRequest = () => ({
  type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = users => ({
  type: 'FETCH_DATA_SUCCESS',
  payload: users,
});

export const fetchDataFailure = error => ({
  type: 'FETCH_DATA_FAILURE',
  payload: error,
});

// saveing the question text action
export const saveQuestion = question => ({
  type: 'SAVE_QUESTION',
  payload: question,
});


export const deleteAnswerById = id => ({
  type: 'DELETE_ANSWER_BY_ID',
  payload: id,
});

// getting the data action
export const fetchDataFromLocalStorage = () => ({
  type: 'FETCH_DATA_FROM_LOCAL_STORAGE',
});
export const addNewAnswer = (data) => ({
  type: 'ADD_NEW_ANSWER',
  payload: data
});

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    return fetch('assets/data.json')
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchDataSuccess(responseJson));
      })
      .catch(error => {
        dispatch(fetchDataFailure(error));
      });
  }
}