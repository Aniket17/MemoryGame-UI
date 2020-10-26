import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export class ErrorScore extends React.Component {

    render() {
        return (
            <div className="row col-2">
                <ErrorOutlineIcon />
                 Error Score - {this.props.errorScore}
            </div>
        )
    }
}