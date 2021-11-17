

import React from 'react'

import keys from '../const/keys'
import base_const from '../const/base_const'
import { config } from '../config'

export default class Controller extends React.Component{
    state = {
        field_size: this.props.field_size,
        tank: this.props.tank,
        keys_pressed:{},
        bg_thread:true,
        socket: this.props.socket,
        // bullets: this.props.bullets
        actions:null
    }

    move_bullets = (new_bullets)=>{
        // console.log("OLD_BULLETS", this.state.bullets)
        var bullets = [...this.props.get_bullets(), ...new_bullets]
        // console.log("-!!-", bullets, new_bullets)

        for (var i = 0; i < bullets.length; i++) {
            bullets[i].x+=Math.cos(bullets[i].az*Math.PI/180)*base_const.BASE_BULLET_MOVE_SPEED
            bullets[i].y+=Math.sin(bullets[i].az*Math.PI/180)*base_const.BASE_BULLET_MOVE_SPEED
        }
        return bullets
    }

    tank_control = (keys_pressed) =>{
        var new_bullets = []
        var new_tank_data = this.state.tank
        // console.log(keys_pressed)
        
        // console.log(keys_pressed[keys.TANK_KEY_ROTATE_L], keys_pressed, keys.TANK_KEY_FIRE, keys)
        if (keys_pressed[keys.TANK_KEY_ROTATE_L]){
            new_tank_data.napr.az-=base_const.BASE_ROTATE_SPEED
            new_tank_data.napr.b_az-=base_const.BASE_ROTATE_SPEED
        }
        if (keys_pressed[keys.TANK_KEY_ROTATE_R]){
            new_tank_data.napr.az+=base_const.BASE_ROTATE_SPEED
            new_tank_data.napr.b_az+=base_const.BASE_ROTATE_SPEED
        }
        
        // console.log(new_tank_data.napr.az, Math.cos(new_tank_data.napr.az), new_tank_data.napr.az*Math.PI/180, Math.cos(new_tank_data.napr.az*Math.PI/180))
        
        if (keys_pressed[keys.TANK_KEY_BASE_ROTATE_L]){
            new_tank_data.napr.b_az-=base_const.BASE_BASE_ROTATE_SPEED
        }
        if (keys_pressed[keys.TANK_KEY_BASE_ROTATE_R]){
            new_tank_data.napr.b_az+=base_const.BASE_BASE_ROTATE_SPEED
        }
        

        if (keys_pressed[keys.TANK_KEY_MOVE_F]){
            // console.log("Moving tank", new_tank_data.pos)
            new_tank_data.pos.x+=Math.cos(new_tank_data.napr.az*Math.PI/180)*base_const.BASE_MOVE_SPEED
            new_tank_data.pos.y+=Math.sin(new_tank_data.napr.az*Math.PI/180)*base_const.BASE_MOVE_SPEED
        }
        if (keys_pressed[keys.TANK_KEY_MOVE_B]){
            new_tank_data.pos.x-=Math.cos(new_tank_data.napr.az*Math.PI/180)*base_const.BASE_MOVE_SPEED
            new_tank_data.pos.y-=Math.sin(new_tank_data.napr.az*Math.PI/180)*base_const.BASE_MOVE_SPEED
        }

        if (keys_pressed[keys.TANK_KEY_FIRE]&&(new_tank_data.fire.fire_rate <= new_tank_data.fire.current)){
            // console.log("FIRE!!!", new_tank_data.fire.fire_rate, new_tank_data.fire.current)
            new_bullets.push({
                x: new_tank_data.pos.x+new_tank_data.size.x/2,
                y: new_tank_data.pos.y+new_tank_data.size.y/2,
                az: new_tank_data.napr.b_az
            })
            new_tank_data.fire.current = 0
        }
        if (new_tank_data.fire.fire_rate>new_tank_data.fire.current){
            new_tank_data.fire.current+=1
        }


        console.log("tank_control", new_tank_data, new_bullets)
        return new_tank_data, new_bullets
    }

    commit = (tank_data, bullets_data) =>{
        this.props.set_data({
            tank: tank_data,
            bullets: bullets_data
        })
    }

    if_actions_equal(actions1, actions2){
        if ((actions1 == null)||(actions2 == null)){
            return false
        }
        return (actions1.rotate === actions2.rotate) &&
        (actions1.b_rotate === actions2.b_rotate) &&
        (actions1.move === actions2.move) &&
        (actions1.fire === actions2.fire)
    }
    
    controller = (keys_pressed) =>{
        // let tank_data, new_bullets = this.tank_control(keys_pressed)
        // let bullets_data = this.move_bullets(new_bullets)

        // console.log(tank_data, bullets_data)
        // this.commit(tank_data, bullets_data)
        var actions = this.get_actions(keys_pressed)
        // console.log(actions, this.state.actions, this.if_actions_equal(actions, this.state.actions))
        if (!this.if_actions_equal(actions, this.state.actions)){
            this.state.socket.emit("tank_control", actions)
            this.setState({ actions: actions });
        }
    }


    run_bg_thread = ()=>{
        var interval = setInterval(()=>{this.controller(this.state.keys_pressed)},1000/config.FPS);
    }

    onKeyDown = (e)=>{
        // console.log("onKeyDown", e.key)
        // console.log("KEY DOWN", e)
        this.setState({ keys_pressed: {
            ...this.state.keys_pressed,
            [e.keyCode]:true
        } });
    }
    onKeyUp = (e)=>{
        console.log("onKeyUp", e.key)
        this.setState({ keys_pressed: {
            ...this.state.keys_pressed,
            [e.keyCode]:false
        } });
    }

    get_actions = (keys_pressed) => {
        // var keys_pressed = this.state.keys_pressed
        // console.log(keys_pressed)
        var actions = {
            "rotate":0,
            "b_rotate":0,
            "move":0,
            "fire":false
        }
        if (keys_pressed[keys.TANK_KEY_ROTATE_L]) {
            console.log("ROTATE_LEFT", keys_pressed)
            actions["rotate"] -=1
        }
        if (keys_pressed[keys.TANK_KEY_ROTATE_R]) {
            console.log("ROTATE_RIGHT", keys_pressed)
            actions["rotate"] +=1
        }
        if (keys_pressed[keys.TANK_KEY_BASE_ROTATE_L]) {
            console.log("ROTATE_BASE_LEFT", keys_pressed)
            actions["b_rotate"] -=1
        }
        if (keys_pressed[keys.TANK_KEY_BASE_ROTATE_R]) {
            console.log("ROTATE_BASE_RIGHT", keys_pressed)
            actions["b_rotate"] +=1
        }
        if (keys_pressed[keys.TANK_KEY_MOVE_F]){
            console.log("ROTATE_MOVE FORWARD", keys_pressed)
            actions["move"]+=1
        }
        if (keys_pressed[keys.TANK_KEY_MOVE_B]){
            console.log("ROTATE_MOVE BACK", keys_pressed)
            actions["move"]-=1
        }
        if (keys_pressed[keys.TANK_KEY_FIRE]){
            console.log("ROTATE_FIRE", keys_pressed)
            actions["fire"]=true
        }
        // console.log(actions)
        return actions
    }

    componentDidMount(){        
        document.addEventListener("keydown", this.onKeyDown)
        document.addEventListener("keyup", this.onKeyUp)
        
        this.run_bg_thread()
    }
    componentWillUnmount(){
        this.setState({ bg_thread: false });
    }

    render(){
        return(<div>
            {this.props.children}
        </div>)
    }

}