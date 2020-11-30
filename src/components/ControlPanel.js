import { Component } from "react";
import { Message } from 'element-react';

import axios from '../utils/axios'
import Dashboard from './Dashboard'

export default class ControlPanel extends Component {

    state = {
        dashboardName: '',
        widgets: []
    }

    async componentDidMount() {
        this.getData(this.state.dashboardName)
    }

    async getData(dashboardName){
        const result = await axios.post('/list')
        if (result.status !== 200) {
            return;
        }
        this.setState({
            dashboardName: result.data.length > 0 && result.data[0].DashboardName,
            widgets: result.data
        })

    }

    onAddWidget(data) {
        const widgets = this.state.widgets;
        const widget = widgets.find(s => s.DashboardName === this.state.dashboardName && s.Name === data.Name)

        if (widget) {
            Object.assign(widget, data)
        } else {
            widgets.push({ ...data })
        }

        this.setState({
            widgets
        })
    }

    //尺寸位置变化后保存
    async onVariant(widget, data) {
        Object.assign(widget, data)
        const result = await axios.post('/updateOrAdd', { Widget: widget });
        if (result.status !== 200) {
            return;
        }
    }

    async onDel(widget) {
        const result = await axios.post('/del', { Name: widget.Name });
        if (result.status !== 200) {
            return;
        }

        const widgets = this.state.widgets
        const index = widgets.findIndex(s => s.Name === widget.Name)
        widgets.splice(index, 1)
        this.setState({
            widgets
        })

        Message.success('删除成功')
    }

    async changeHandler(e) {
        this.setState({
            dashboardName: e.target.value
        })
    }

    render() {
        const changeHandler = this.changeHandler.bind(this)

        const dashboardNames = [...new Set(this.state.widgets.map(s => s.DashboardName))];
        const widgets = this.state.widgets.filter(s => s.DashboardName === this.state.dashboardName)
        return (
            <div style={{ width: '100%'}}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    切换仪表盘：<select value={this.state.dashboardName} onChange={changeHandler}>
                        {
                            dashboardNames.map(name =>
                                <option key={name} value={name}>{name}</option>
                            )
                        }
                    </select>
                </div>
                <Dashboard 
                name={this.state.dashboardName} 
                widgets={widgets} 
                onVariant={this.onVariant.bind(this)} 
                onAddWidget={this.onAddWidget.bind(this)}
                onDel={this.onDel.bind(this)}
                ></Dashboard>
            </div>
        )
    }
}