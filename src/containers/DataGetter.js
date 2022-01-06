
import React from 'react'

import {config} from '../config'

import openSocket from 'socket.io-client';

import Controller from './Controller'
import Field from './Field'
import TankInfoField from './TankInfoField'
import DeadMessage from '../components/DeadMessage'

export default class DataGetter extends React.Component{
    state = {
        field_socket: null,
        control_socket:null,
        data: null,
        my_tank: null,
        stop_interval:false
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
    tank_died = ()=>{
        this.setState({ stop_interval: true });
    }
    componentDidMount(){
        const field_socket = openSocket('http://'+config.NETWORK.HOST+':'+config.NETWORK.PORT+"/field");
        const control_socket = openSocket('http://'+config.NETWORK.HOST+':'+config.NETWORK.PORT+"/tank_control");
        control_socket.emit('init', null, (message)=>{
            this.setState({ my_tank: message });
        })
        field_socket.on("field_data", message=>{
            // console.log("FIELD MESSAGE", message)
            this.setState({ data:  message});
        })
        field_socket.on('tank_eliminated', message=>{
            console.log("!!!!!!!!!!!!!!!!!!!!!!!", "tank_eliminated", message, this.state.my_tank.id)
            if (this.state.my_tank==null){
                return
            }
            if (message.id == this.state.my_tank.id){
                this.setState({ stop_interval: true });
            }
        })
        control_socket.on("tank_control", message=>{
            console.log("tank_control MESSAGE", message)
        })



        // socket.join('field')
        // socket.join('tank_control')
        this.setState({ field_socket: field_socket, control_socket: control_socket});
    }
    render(){
        // console.log(this.state.data, this.state.socket)
        // if (this.state.stop_interval){
            // return(<DeadMessage/>)
        // }
        if (this.state.data !=null){
            return(
            <Controller socket={this.state.control_socket} stop_interval={this.state.stop_interval}>
                <Field field={this.state.data} my_tank={this.state.my_tank} get_tanks={this.get_tanks} get_bullets={this.get_bullets} get_walls={this.get_walls}/>
                <TankInfoField my_tank={this.state.my_tank} get_tanks={this.get_tanks}/>
                <DeadMessage show={this.state.stop_interval}/>
            </Controller>
            )
        }else{
            return(<div></div>)
        }

    }
}