
export default {
    namespace: 'user',
    state: {},
    subscriptions: {
      setup({ dispatch, history }) {
        console.log('user load');
      },
    },
    effects: {
      *fetch({ payload }, { call, put }) {
        yield put({ type: 'save' });
      },
    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  