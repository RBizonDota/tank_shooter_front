
import React from 'react'

import "../static/css/tank.css"


export default function Bullet (props){
    var el = props.data
    return(
    <div className="bullet-body" style={{left: el.x-1, 
        top:el.y-2.5, 
        transform: "rotate("+el.az+"deg)"
    }}></div>)
}