import React, {FC} from "react";
import {Clock} from "./components/Clock";


export const App: FC = () => {

    return (
        <div>
            <h1>Clock</h1>
            <Clock />
        </div>
    );
};