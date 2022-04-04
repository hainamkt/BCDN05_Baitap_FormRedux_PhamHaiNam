import { combineReducers,createStore } from "redux";
import { quanLySinhVienReducer } from "./QLSVReducer";

const rootReducer = combineReducers({
    quanLySinhVienReducer,
})

export const store = createStore(rootReducer)