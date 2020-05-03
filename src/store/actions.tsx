import {Action, AnyAction, Dispatch} from "redux";
import {ActionType, InitialState} from "~/store/reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export class RootDispatcher {

    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>){
        this.dispatch = dispatch;
    }
    increment = () => this.dispatch({type: ActionType.Increment, payload: {}});
    decrement = () => this.dispatch({type: ActionType.Decrement, payload: {}});
    reset = () => this.dispatch({type: ActionType.ResetMe, payload: {}});
}

export const RootActionCreator = (type:number,payload:string)=>{
    return{
        type,
        payload
    }
};


// Action Definition
export interface IncrementAction {
    type: number
}

// Action Creators
export const increment = (): IncrementAction => {
    return {type: ActionType.Increment}
}
