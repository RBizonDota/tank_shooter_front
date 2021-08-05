import '../static/css/field.css'

import React from 'react'
import Tank from '../components/Tank'
import Controller from './Controller'

import keys from '../const/keys'

export default class Field extends React.Component{
    state = {
        width: 1000,
        height: 500,
        my_tank: "askjfhaskfgajsgfsajhdvajshg",
        tanks: {
            "askjfhaskfgajsgfsajhdvajshg":{
                id: "askjfhaskfgajsgfsajhdvajshg",
                size:{
                    x:50,
                    y:30,
                    b_r:12, //Радиус башни
                    w_l: 12,
                    w_w: 4
                },
                napr:{
                    az:30,
                    b_az:60
                },
                pos: {
                    x: 60,
                    y:60
                },
                fire:{
                    fire_rate: 200,
                    current:20
                }
            }
        },
        bullets:[]
    };
    
    set_tank = (data)=>{
        // console.log(data)
        var new_tanks = this.state.tanks
        new_tanks[this.state.my_tank] = data.tank
        var new_bullets = data.bullets
        console.log(new_bullets)

        this.setState({tanks:new_tanks, bullets:[...new_bullets]})
    }

    get_bullets = () =>{
        return this.state.bullets
    }

    componentDidMount(){
    }
    render(){
        var bullets = this.state.bullets
        console.log("TANK", this.state.bullets)
        return(
        <div className="field-container">
            <Controller set_data={this.set_tank} tank={this.state.tanks[this.state.my_tank]} 
                        field_size={{width: this.state.width, height: this.state.height}}
                        get_bullets={this.get_bullets}>
                <Tank stat={this.state.tanks["askjfhaskfgajsgfsajhdvajshg"]}/>
                {
                    this.state.bullets.map(el=>{
                        return (<div className="bullet-body" style={{left: el.x-1, 
                            top:el.y-2.5, 
                            transform: "rotate("+el.az+"deg)"
                           }}></div>)
                    })
                }
            </Controller>
        </div>)
    }
}