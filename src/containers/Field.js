import '../static/css/field.css'

import React from 'react'
import Tank from '../components/Tank'
import Bullet from '../components/Bullet'
import Wall from '../components/Wall'
import Controller from './Controller'

// import io from 'socket.io-client'

import keys from '../const/keys'

export default class Field extends React.Component{
    state = {tanks:this.props.field.tanks, 
            bullets:this.props.field.bullets};
    
    // shouldComponentUpdate(nextProps, newState){
    //     // console.log("shouldComponentUpdate", nextProps, "|", nextState);
    //     // console.log("shouldComponentUpdate", this.props, "|", this.state);
    //     var nextState = nextProps.field
    //     if (nextState.tanks.length!=this.state.tanks.length) return true
    //     if ((nextState.bullets.length!=this.state.bullets.length)||(nextState.bullets.length>0)) return true
    //     for (let key in nextState.tanks) {
    //         // console.log("!!!!", key)
    //         let tank1 = nextState.tanks[key]
    //         let tank2 = this.state.tanks[key]
    //         console.log(tank1.pos, tank2.pos)
    //         if (!((tank1.pos.x === tank2.pos.x)&&(tank1.pos.y === tank2.pos.y)&&(tank1.napr.az === tank2.napr.az)&&(tank1.napr.b_az === tank2.napr.b_az))) return true
    //     }
    //     console.log("REturnng false")
    //     return false;  
    // }
    componentDidMount(){
        
    }
    render(){
        var bullets = this.props.get_bullets()
        var tanks = this.props.get_tanks()
        var walls = this.props.get_walls()
        console.log("TANK",tanks, bullets)
        return(
        <div className="field-container">
                {
                    Object.keys(tanks).map(el=>{
                        var tank = tanks[el]
                        return (<Tank stat={tank}/>)
                    })
                }
                {
                    bullets.map(el=>{
                        return (<Bullet data={el}/>)
                    })
                }
                {
                    walls.map(el=>{
                        return (<Wall data={el}/>)
                    })
                }
        </div>)
    }
}