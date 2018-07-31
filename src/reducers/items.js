import _ from 'lodash';

// Items reducer
const items = (state = [], action) => {
  const { type, payload } = action ? action : { payload: {} };
  let nextState;

  switch (type) {
    case 'FETCH_DATA_REQUEST': {
      nextState = { ...state, ...payload, loading: false };
      break;
    }
    case 'FETCH_DATA_FROM_LOCAL_STORAGE': {
      nextState = { ...state, loading: false };

      // getting the data from localstorage
      let data = localStorage.getItem('data');

      // double check
      if (data) {
        nextState.data = JSON.parse(data);
      }
      break;
    }
    case 'FETCH_DATA_SUCCESS': {
      // getting the data from localstorage
      let data = localStorage.getItem('data');
      if (!data) {
        nextState = { ...state, data: payload, loading: false };
        let count = 0;

        // added id to collection, like guid, but simpler :)
        nextState.data.answers.map((answer) => {
          return answer.id = count++;
        });

        // setting the new data into localstorage
        localStorage.setItem("data", JSON.stringify(nextState.data));
      }
      else {
        // if we have data in localstorage, we will use it 
        nextState.data = JSON.parse(data);
      }
      break;
    }
    case 'FETCH_DATA_FAILURE': {
      nextState = { ...state, error: payload, loading: false };
      break;
    }
    case 'SAVE_QUESTION': {
      nextState = { ...state, loading: false };
      if (nextState.data && nextState.data.question) {

        // changing the current question text
        nextState.data.question.text = payload;

        let data = localStorage.getItem('data');
        if (data) {
          // saving the new data into localstorage
          localStorage.setItem('data', JSON.stringify(nextState.data));
        }
      }
      break;

    }
    case 'ADD_NEW_ANSWER': {
      nextState = { ...state, loading: false };
      if (nextState.data && nextState.data.answers) {

        // the GUID is for now is just a date number
        // in regular app we need to create real GUID.
        // or having data with id already.
        nextState.data.answers.push({
          id: new Date().getUTCMilliseconds(),
          text: payload.text,
          imageURL: payload.imageURL
        });

        let data = localStorage.getItem('data');
        if (data) {
          localStorage.setItem('data', JSON.stringify(nextState.data));
        }
      }

      // notify the app that something changed 
      nextState.deleted = !nextState.deleted;

      break;
    }
    case 'DELETE_ANSWER_BY_ID':
      {
        nextState = { ...state, loading: false };
        let id = payload;

        // searching for the answer with the same id
        let answerIdx = _.findIndex(nextState.data.answers, { id: id });

        // if found
        if (answerIdx > -1) {

          // deleting it from the collection
          nextState.data.answers.splice(answerIdx, 1);
          let data = localStorage.getItem('data');
          if (data) {
            // setting the new item
            localStorage.setItem('data', JSON.stringify(nextState.data));
          }
        }

        // notify the app that something changed 
        nextState.deleted = !nextState.deleted;
        break;
      }

    default:
      nextState = state;
      break;
  }
  return nextState;
};

export default items;

