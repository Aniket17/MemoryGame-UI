import React, { useState } from 'react';

export default function GameInstructions() {
    let [showInstructions, setShowInstructions] = useState(true);
    return (<div className="col-12">
        {showInstructions &&
            <div className="alert alert-info alert-dismissible fade show" >
                <strong>Pick any two cards at a time and they should match.</strong> If cards do not match, opened cards will be hidden after <b>3 seconds</b>
                <button type="button" className="close" onClick={() => { setShowInstructions(false) }}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }
    </div>);
}