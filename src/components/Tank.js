import React from 'react'

import "../static/css/tank.css"

export default function Tank (props){
    // console.log("TANK,", props)
    props = props.stat
    let az = props.napr.az
    let b_az = props.napr.b_az
    return(<div id={props.id} className="tank">
        <div className="tank-body" style={{left: props.pos.x-props.size.x/2, top:props.pos.y-props.size.y/2, height: props.size.y, width: props.size.x, transform: "rotate("+az+"deg)"}}></div>
        <div className="tank-base" style={{left: props.pos.x-props.size.b_r, 
                                            top:props.pos.y-props.size.b_r, 
                                            height: 2*props.size.b_r, 
                                            width: 2*props.size.b_r, 
                                            transform: "rotate("+b_az+"deg)"}}>
                                                <div className="tank-weapon" style={{
                                                    height: 2*props.size.w_w, 
                                                    width: 2*props.size.w_l,
                                                    "marginTop": props.size.b_r-1.25*props.size.w_w,
                                                    "marginLeft": props.size.b_r}}></div>
                                            </div>
        
    </div>)


}