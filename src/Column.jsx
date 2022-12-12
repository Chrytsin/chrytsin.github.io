import React from 'react';
import AnimationTrail from './animationTrail';

function Column(props) {
    console.log(props);
    return(
        <div className = "animations ui grid" >        
            <div className="col-anim four wide column">
                <h3>Infix</h3>
                <AnimationTrail items = {props.infix} tog = {props.toggle} />
            </div>
            <div className="col-anim four wide column">
                <h3>Carry</h3>
                <AnimationTrail items = {props.carry} tog = {props.toggle} />
            </div>
            <div className="col-anim four wide column">
                <h3>Postfix</h3>
                <AnimationTrail items = {props.postfix} tog = {props.toggle} />
            </div>
            <div className="col-anim four wide column">
                <h3>{props.spec}</h3>
                {props.message}
            </div>
        </div>
    );

}
export default Column;