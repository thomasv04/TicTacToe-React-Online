import React, { Component } from 'react'

import './PointCounter.css'

export default class PointCounter extends Component {
    render() {
        let points

        if(this.props.type === 'draw'){
            if(this.props.points > 1){
                points = this.props.points + ' draws'
            }else{
                points = this.props.points + ' draw'
            }
            
        }else{
            if(this.props.points > 1){
                points = this.props.points + ' wins'
            }else{
                points = this.props.points + ' win'
            }
        }

        return (
            <div className='counter'>
                <img src={this.props.image} alt=""/>
                <p>{points}</p>
            </div>
        )
    }
}
