import React from 'react'

import "../static/css/deadmessage.css"

export default function DeadMessage (props){
    if (props.show){
        return(<div className="allin-block">
            <div className="death-background dead-message"> 
            <div className="extra-shadows">
                <p>You Died</p>
            </div>
            </div>
            {/* <div className="card dead-message">
                <div className="card-title">Вы погибли</div>
            </div> */}
        </div>)
    }
    return (<div></div>)

}