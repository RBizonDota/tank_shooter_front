import React from 'react'

import "../static/css/tank.css"

export default function TankInfo (props){
    let tank = props.tank
    let your_tank = props.my_tank
    if (your_tank!=null){
        your_tank=your_tank.id
    }
    // console.log(tank, tank.id, your_tank)
    return(<div className="card d-flex">
        <div className="card-title">{your_tank == tank.id ? "Вы" : tank.id}</div>
        <div>Здоровье: {tank.health.current}/{tank.health.max}</div>
        {
            your_tank == tank.id?
            <div>Огонь: {tank.fire.current}/{tank.fire.fire_rate}</div>
            :null
        }
    </div>)


}