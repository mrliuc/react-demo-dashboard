import { Component } from 'react'

import WidgetProxy from './WidgetProxy';
import VariantDIV from './VariantDiv'
import Group from './Group'
import Dashboard from './Dashboard'

import axios from '../utils/axios'

export default class Share extends Component {

    state = {
        name: null,
        groupName: null,
        widgets: [],
    }

    //工具函數，待重构
    getQueryString(name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const urlObj = window.location;
        var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    async componentDidMount() {
        const dashboardName = this.getQueryString('DashboardName')
        const name = this.getQueryString('Name')
        const groupName = this.getQueryString('GroupName')

        if (!dashboardName && !name && !groupName) {
            return alert('缺少参数');
        }

        const result = await axios.post('/list', { GroupName: groupName, Name: name })

        if (result.status !== 200) {
            return;
        }
        this.setState({
            name,
            groupName,
            dashboardName,
            widgets: result.data
        })

    }

    onVariant() {
        console.log('分享页面不再保存尺寸位置信息')
    }

    render() {
        if (this.state.name) {
            return this.renderSingle();
        }

        if (this.state.groupName) {
            return this.renderGroup();
        }

        if (this.state.dashboardName) {
            return this.renderDashboard();

        }

        return (
            <div>
                参数错误
            </div>
        )

    }

    renderSingle() {
        return (
            this.state.widgets.map(widget =>

                <div className="item" key={widget.Name}>
                    <VariantDIV
                        width={widget.Width || 300}
                        height={widget.Height || 300}
                        top={widget.Top || 0}
                        left={widget.Left | 0}
                        onVariant={(data) => this.onVariant(widget, data)}
                        onDel={() => this.onDel(widget)}

                    >
                        <WidgetProxy
                            widgetName={widget.WidgetName}
                            name={widget.Name}
                            groupName={widget.GroupName}
                            dataURL={widget.DataURL} />
                    </VariantDIV>
                </div>

            ))
    }

    renderGroup() {
        const groupNames = [...new Set(this.state.widgets.map(s => s.GroupName))];

        return (
            <div className="dashboard">
                {
                    groupNames.map(groupName =>

                        <Group groupName={groupName} key={groupName}>
                            {
                                this.state.widgets.filter(s => s.GroupName === groupName).map(widget =>

                                    <div className="item" key={widget.Name}>
                                        <VariantDIV
                                            width={widget.Width || 300}
                                            height={widget.Height || 300}
                                            top={widget.Top || 0}
                                            left={widget.Left | 0}
                                            onVariant={(data) => this.onVariant(widget, data)}
                                            onDel={() => this.onDel(widget)}

                                        >
                                            <WidgetProxy
                                                widgetName={widget.WidgetName}
                                                name={widget.Name}
                                                groupName={widget.GroupName}
                                                dataURL={widget.DataURL} />
                                        </VariantDIV>
                                    </div>

                                )
                            }
                        </Group>
                    )
                }
            </div>
        )

    }

    renderDashboard() {
        const widgets = this.state.widgets.filter(s => s.DashboardName === this.state.dashboardName)

        return (
            <div className="dashboard">
                <Dashboard
                    name={this.state.dashboardName}
                    widgets={widgets}
                ></Dashboard>
            </div>
        )

    }


}