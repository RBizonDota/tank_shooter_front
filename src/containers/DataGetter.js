
import React from 'react'

import {config} from '../config'

import openSocket from 'socket.io-client';

import Controller from './Controller'
import Field from './Field'

export default class DataGetter extends React.Component{
    state = {
        field_socket: null,
        control_socket:null,
        data: null,
        my_tank: null
    }

    get_tanks = ()=>{
        return this.state.data.tanks
    }
    get_bullets = ()=>{
        return this.state.data.bullets
    }
    get_walls = ()=>{
        return this.state.data.walls
    }
    componentDidMount(){
        const field_socket = openSocket('http://'+config.NETWORK.HOST+':'+config.NETWORK.PORT+"/field");
        const control_socket = openSocket('http://'+config.NETWORK.HOST+':'+config.NETWORK.PORT+"/tank_control");
        field_socket.on("field_data", message=>{
            // console.log("FIELD MESSAGE", message)
            this.setState({ data:  message});
        })
        control_socket.on("tank_control", message=>{
            console.log("tank_control MESSAGE", message)
        })


        // socket.join('field')
        // socket.join('tank_control')
        this.setState({ field_socket: field_socket, control_socket: control_socket});
    }
    render(){
        console.log(this.state.data, this.state.socket)
        if (this.state.data !=null){
            return(
            <Controller socket={this.state.control_socket}>
                <Field field={this.state.data} my_tank={this.state.my_tank} get_tanks={this.get_tanks} get_bullets={this.get_bullets} get_walls={this.get_walls} />
            </Controller>
            )
        }else{
            return(<div></div>)
        }
    }
}