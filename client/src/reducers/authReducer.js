const initial_state = {
  active_survey: {},
  surveys: [],
  loading_surveys: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    // case REVIEW_SURVEY:
    //   return {
    //     ...state,
    //     active_survey: payload
    //   };
    default:
      return state;
  }
}
