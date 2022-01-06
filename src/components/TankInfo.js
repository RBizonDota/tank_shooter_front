import React from 'react'

import "../static/css/tankinfo.css"

export default function TankInfo (props){
    let tank = props.tank
    let your_tank = props.my_tank
    if (your_tank!=null){
        your_tank=your_tank.id
    }
    // console.log(tank, tank.id, your_tank)
    return(<div className="card d-flex">
        <div className="card-title">{your_tank == tank.id ? "Вы" : tank.id}</div>
        <div className="d-flex w-100 justify-content-between">
            <div>Здоровье:</div> 
            <div>
                <div class="progress">
                    <div class="progress_inner" style={{
                        width: tank.health.current/tank.health.max*100+"%"
                    }}></div>
                </div>
                <div>{tank.health.current}/{tank.health.max}</div>
            </div>
        </div>
        {
            your_tank == tank.id?
            <div className="d-flex w-100 justify-content-between">
                <div>Огонь:</div> 
                <div>
                    <div class="progress">
                        <div class="progress_inner-fire" style={{
                            width: tank.fire.current/tank.fire.fire_rate*100+"%"
                        }}></div>
                    </div>
                    <div>{tank.fire.current}/{tank.fire.fire_rate}</div>
                </div>
            </div>
            // <div>Огонь: {tank.fire.current}/{tank.fire.fire_rate}</div>
            :null
        }
    </div>)


}