import {Reducer} from "redux";
import {produce} from 'immer'
import {DispatchAction} from "~/store/actions";

export interface InitialState {
    count:number
}

export const initialState: InitialState = {
    count: 0
}

export enum ActionType {
    Increment,
    Decrement,
    ResetMe
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
    if (action.type === ActionType.Increment) {
        return produce(state, (draftState)=>{
            draftState.count = state.count+1
        });
    } else  if (action.type === ActionType.Decrement) {
        return produce(state, (draftState)=>{
            draftState.count = state.count-1
        });
    } else  if (action.type === ActionType.ResetMe) {
        return produce(state, (draftState)=>{
            draftState.count = 0
        });
    } else return state;
};
