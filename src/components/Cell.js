import React, { Component } from 'react'

export default class Cell extends Component {

    treatmentValue = value => {
        if(value === 0){
            return ''
        }else if(value === 'X'){
            return <img src={this.props.cross} className="cellImage" alt=""/>
        }else if(value === 'O'){
            return <img src={this.props.circle} className="cellImage" alt=""/>
        }
    }


    render() {
        return (
            <div className="cell" onClick={() => {if (this.props.value === 0) this.props.updateBoard(this.props.id)}} key={this.props.id}>{this.treatmentValue(this.props.value)}</div>
        )
    }
}
