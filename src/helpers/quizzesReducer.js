function quizzesReducer(state, action) {
  const { type, payload } = action;

  //   console.log(action);

  switch (type) {
    case "ADD_QUIZZES": {
      const currentIndex = 0;
      const total = payload.length;
      const updatedState = { currentIndex, total, data: [...payload] };
      //   console.log("ADD_QUIZZES", updatedState);
      return updatedState;
    }

    case "UPDATE_SELECTION": {
      const { index, selected } = payload;
      const updatedState = { ...state };
      updatedState.data[index] = { ...updatedState.data[index], selected };
      //   console.log("UPDATE_SELECTION", timeTaken);
      return updatedState;
    }

    case "UPDATE_SKIPPED": {
      const { index, timeTaken } = payload;
      const updatedState = { ...state, currentIndex: state.currentIndex + 1 };
      updatedState.data[index] = {
        ...updatedState.data[index],
        timeTaken,
        isSkipped: true,
      };
      //   console.log("UPDATE_SKIPPED", timeTaken);
      return updatedState;
    }

    case "UPDATE_NEXT": {
      //   console.log("Before: UPFATE_NEXT", state);
      /* 
            Lets handle two cases 
            1) increment the currect state
               (it is normal working flow of quiz app)
            2) increment the currentIndex state for skipped question
               check before increment if it is skipped then set the state
      */
      const { index, timeTaken } = payload;
      const updatedState = { ...state };
      if (!updatedState.showSkippedQuestions) {
        updatedState.currentIndex = state.currentIndex + 1;
        updatedState.data[index] = {
          ...updatedState.data[index],
          timeTaken,
          isAttempted: true,
        };
      } else {
        // First of all save the state of the quiz that is attempted
        updatedState.data[index] = {
          ...updatedState.data[index],
          // set the sum of current and previous time taken
          timeTaken: updatedState.data[index].timeTaken + timeTaken,
          isSkipped: false,
          isAttempted: true,
        };

        // index + 1 : start to find next skipped question
        for (let i = index + 1; i < state.data.length; i++) {
          const quiz = state.data[i];
          if (quiz.isSkipped && !quiz.isAttempted) {
            updatedState.currentIndex = i;
            break;
          }
        }
      }
      //   console.log("UPDATE_NEXT", updatedState);
      return updatedState;
    }

    case "SUBMIT_QUIZ": {
      /* 
            Lets handle two cases 
            1) dispatched by the user (index & timeTaken are defined)
            2) dispatched forcefully after timers up
      */
      const updatedState = { ...state, showResult: true };
      const { index, timeTaken, isTimerUp } = payload;
      if (index && timeTaken) {
        updatedState.data[index] = {
          ...updatedState.data[index],
          timeTaken,
          isAttempted: true,
        };
      } else if (isTimerUp) {
        updatedState.isTimerUp = true;
      }
      //   console.log("SUBMIT_QUIZ", timeTaken);
      return updatedState;
    }

    case "SHOW_SKIPPED_QUESTIONS": {
      /* 
            Lets handle two cases 
            1) dispatched with skipped question (isSkipped defined)
            2) dispatched with attempted question (isSkipped undefined)
      */

      /*
            1) set showSkippedQuestions to activate the working
                flow to display only skipped questions
            2) and set the currentIndex state to the very first skipped question
            3) Save the state of attempted question that is in payload
      */
      const { index, timeTaken, isSkipped } = payload;
      const updatedState = { ...state, showSkippedQuestions: true };

      if (isSkipped) {
        updatedState.data[index] = {
          ...updatedState.data[index],
          timeTaken,
          isSkipped: true,
        };
        const currentIndex = updatedState.data.findIndex(
          (quiz) => quiz.isSkipped
        );
        updatedState.currentIndex = currentIndex;
      } else {
        // this will get the very first index of skipped question
        const currentIndex = state.data.findIndex((quiz) => quiz.isSkipped);
        updatedState.currentIndex = currentIndex;
        updatedState.data[index] = {
          ...updatedState.data[index],
          timeTaken,
          isAttempted: true,
        };
      }

      //   console.log("SHOW_SKIPPED_QUESTIONS", updatedState);
      return updatedState;
    }
    default:
      return state;
  }
}

export default quizzesReducer;
