import React from "react";
import {
    Link,
    useLocation
} from "react-router-dom";
export function NoMatch404() {
    let location = useLocation();
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
            <p><Link to="/">Click here to go back to main page</Link></p>
        </div>
    );
}