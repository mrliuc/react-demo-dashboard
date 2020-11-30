import React,{Component} from 'react';

export default class Blue extends Component{ 
  
    render() {
        const {name,groupName} =this.props
        return (
          <div style={{width:'100%',height:'100%',backgroundColor:'blue',color:'white'}} >
			   <h2>blue widget</h2>
            <h3>Name:{name}</h3>
            <h3>GroupName:{groupName}</h3>
        		Data:{this.props.data}
          </div>
        );
      }

}
