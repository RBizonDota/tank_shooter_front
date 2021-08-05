import React from 'react'

import "../static/css/tank.css"

export default class Tank extends React.Component{

    state = this.props.stat

    render() {
        let az = this.state.napr.az
        let b_az = this.state.napr.b_az
        return(<div id={this.state.id} className="tank" style={{left: this.state.pos.x, top:this.state.pos.y}}>
            <div className="tank-body" style={{left: this.state.pos.x, top:this.state.pos.y, height: this.state.size.y, width: this.state.size.x, transform: "rotate("+az+"deg)"}}></div>
            <div className="tank-base" style={{left: this.state.pos.x+this.state.size.x/2-this.state.size.b_r, 
                                                top:this.state.pos.y+this.state.size.y/2-this.state.size.b_r, 
                                                height: 2*this.state.size.b_r, 
                                                width: 2*this.state.size.b_r, 
                                                transform: "rotate("+b_az+"deg)"}}>
                                                    <div className="tank-weapon" style={{
                                                        height: 2*this.state.size.w_w, 
                                                        width: 2*this.state.size.w_l,
                                                        "marginTop": this.state.size.b_r-1.25*this.state.size.w_w,
                                                        "marginLeft": this.state.size.b_r}}></div>
                                                </div>
            
        </div>)
    }



}