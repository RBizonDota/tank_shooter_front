
import React from 'react'

import TanInfo from '../components/TankInfo'

import "../static/css/tankinfo.css"

export default class TankInfoField extends React.Component{
    render(){
        var tanks = this.props.get_tanks()
        var my_tank = this.props.my_tank
        // console.log(Object.values(tanks), my_tank)
        return (
            <div className="tank-info container-fluid">
                <div id = "object-info" className="row">
                    {Object.values(tanks).map(tank=>{
                        return(<TanInfo tank={tank} my_tank={my_tank}/>)
                    })}
                </div>
            </div>
        )
    }
}