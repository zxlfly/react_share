import { getProductData } from "../services/product";
export default {
    namespace: 'products',
    state: {
        data: [],
        pageSize: 10,
        current: 1,
        total: 0
    },
    reducers: {
        productData(state, action) {
            return { ...state, data: action.payload.data };
          }
    },
    effects: {
        *getProductData({ payload }, { call, put }) {
            const res = yield call(getProductData, payload);
            yield put({ type: "productData", payload: res.data });
        }
    },
};