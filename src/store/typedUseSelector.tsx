import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'
import { InitialState } from '~/store/reducer'

export const useSelector: TypedUseSelectorHook<InitialState> = useReduxSelector;
