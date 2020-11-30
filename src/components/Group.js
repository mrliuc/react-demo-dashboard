import { Component } from 'react'

import ShareButton from './ShareButton'

export default class Group extends Component {
    render() {
        return (
            <div>
                <h1>GroupName：{this.props.groupName}             
                    <ShareButton groupName={this.props.groupName} dashboardName={this.props.dashboardName}>点击复制组链接</ShareButton>
                </h1>
                <div className="group">
                    {this.props.children}
                </div>
            </div>
        );
    }
}