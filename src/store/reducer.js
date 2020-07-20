const INITIAL_STATE = {
  array: [],
  array2: [],
  selected: "",
  selectedArray: [],
  uid: ""
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;

    case "ADD_DAY":
      return {
        ...state,
        array: [...state.array, action.payload.new]
      };
    case "DEL_DAY":
      return {
        ...state,
        array: state.array.filter(
          ({ id }) =>
            id !== action.payload.id &&
            (({ project }) => project !== selectedArray.id)
        )
      };

    case "CREATE_TASK":
      return {
        ...state,
        array2: [...state.array2, action.payload],
        selected: action.payload.name
      };
    case "DELETE_TASK":
      return {
        ...state,
        array2: state.array2.filter(({ id }) => id !== action.payload),
        selected: "",
        array: state.array.filter(({ project }) => project !== action.payload)
      };

    case "SELECT_TASK":
      return {
        ...state,
        selectedArray: action.payload,
        selected: action.payload.id
      };
    case "CONNEXION": {
      return {
        ...state,
        uid: action.payload
      };
    }
    case "DECONNEXION": {
      return {
        ...state,
        uid: ""
      };
    }
  }
}

export default reducer;
