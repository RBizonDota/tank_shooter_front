import React from 'react'

// import { sqrt, atan, sin, cos } from 'Math'
import "../static/css/wall.css"

export default function Bullet (props){
    let wall = props.data

    let dx = wall.end.x - wall.start.x
    let dy = wall.end.y - wall.start.y

    let len = Math.sqrt(dx*dx+dy*dy)
    let az = Math.atan(dy/dx)
    console.log((wall.start.y+wall.end.y-wall.width*Math.cos(az))/2, (wall.start.x+wall.end.x+wall.width*Math.sin(az))/2)
    return(
        <div className="wall-body" style={{
            width: len,
            height: wall.width,
            top: wall.start.y-wall.width*Math.cos(az)/2,
            left: wall.start.x+wall.width*Math.sin(az)/2,
            transform: "rotate("+az*180/Math.PI+"deg)"
        }}>
        </div>
    )
}