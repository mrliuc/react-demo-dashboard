import { Component } from "react";
import {Button,Dialog, Message} from 'element-react'
import LazyWeight from '../LazyWidget'
import axios from '../../utils/axios.js'
export default class AddDialog extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          WidgetName: Object.keys(LazyWeight)[0],
          DashboardName:'',
          Name: '',
          GroupName: '',
          DataURL:''
        };

      }

      async save(){
        console.log(this.state)
        for(const key in this.state){
          if(!this.state[key]){
            return Message.warning('数据不完整');
          }
        }
        const result=await axios.post('/updateOrAdd',{Widget:this.state});
        if(result.status!==200){
          return;
        }
        Message.success('保存成功');
        this.props.onAddWidget({...this.state})
        this.props.onClose()
      }

      changeHandler(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
          [name]:value
        })
      }

      render() {
        const {visible,onClose}=this.props;
        const widgetNames=Object.keys(LazyWeight)

        const changeHandler=this.changeHandler.bind(this)
        return (
          <div>
            <Dialog
              title="提示"
              size="tiny"
              visible={ visible }
              onCancel={ onClose }
              lockScroll={ false }
            >
              <Dialog.Body>
                <div>
                选择部件：
                 <select name="WidgetName" value={this.state.WidgetName} onChange={changeHandler}>
                  {widgetNames.map(name=><option key={name}>{name}</option>)}
                  </select>
                </div>
                <div>
                仪表盘名称：<input name="DashboardName" value={this.state.DashboardName}  onChange={changeHandler}/>
                </div>
                <div>
                部件名称：<input name="Name" value={this.state.Name}  onChange={changeHandler}/>
                </div>
                <div>
                组名：<input name="GroupName" value={this.state.GroupName}  onChange={changeHandler}/>
                </div>
                <div>
                数据源(URL)<input name="DataURL" value={this.state.DataURL}  onChange={changeHandler}/>
                </div>
                <div style={{color:'red'}}>仪表盘名称和部件名称相同会覆盖原来的部件</div>
              </Dialog.Body>
              <Dialog.Footer className="dialog-footer">
                <Button onClick={ onClose }>取消</Button>
                <Button type="primary" onClick={ this.save.bind(this) }>确定</Button>
              </Dialog.Footer>
            </Dialog>
          </div>
        )
      }
}