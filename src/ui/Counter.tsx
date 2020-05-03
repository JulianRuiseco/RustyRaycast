import {useSelector} from '~/store/typedUseSelector'
import {FunctionComponent, default as React} from 'react';
import './App.css'
import {Statistic} from "antd";

const Counter:FunctionComponent = () => {
    const count = useSelector(state => state.count);
    return(
        <div className="flexStatistic">
            <Statistic value={count+2} />
        </div>
    )
};

export default Counter
