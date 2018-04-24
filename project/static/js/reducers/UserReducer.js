import User from '../constants/UserConstants';

const initialState = {
  step: User.STEP_UNFILLED,
  identity: {
    username: '',
    password: '',
  },
  ui: {
    loading: false,
    success: false,
    failure: false,
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case User.CHANGE_USERNAME:
      return {
        ...state,
        identity: {
          ...state.identity,
          username: action.payload,
        },
        step: User.STEP_TOUCHED,
      }
    case User.CHANGE_PASSWORD:
      return {
        ...state,
        identity: {
          ...state.identity,
          password: action.payload,
        },
        step: User.STEP_TOUCHED,
      }
    case User.REQUEST:
      return {
        ...state,
        ui: {
          loading: true,
          success: false,
          failure: false,
        },
      }
    case User.SUCCESS:
      return {
        ...state,
        ui: {
          loading: false,
          success: true,
          failure: false,
        },
        step: User.STEP_VERIFIED,
      }
    case User.FAILURE:
      return {
        ...state,
        ui: {
          loading: false,
          success: false,
          failure: true,
        }
      }
    default:
      return state;
  }
};

export default userReducer;
