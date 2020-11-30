import React, { Component } from 'react';

export default class Red extends Component{
  
  render() {
        const {name,groupName} =this.props
    return (
      <div style={{width:'100%',height:'100%',backgroundColor:'red',color:'white'}}>
        <h2>red widget</h2>
        <h3>Name:{name}</h3>
        <h3>GroupName:{groupName}</h3>
        Data:{this.props.data}
      </div>
    );
  }
}
