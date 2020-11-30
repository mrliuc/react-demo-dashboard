import { Component } from 'react'
import copy from 'copy-to-clipboard';

export default class ShareButton extends Component {

    onShare() {
        let url = window.location.origin + '?PageName=Share';

        const { dashboardName, groupName, name } = this.props;

        if (dashboardName) {
            url += '&DashboardName=' + dashboardName;
        }

        if (groupName) {
            url += '&GroupName=' + groupName;
        }

        if (name) {
            url += '&Name=' + name;
        }

        copy(url)

        alert('复制成功，请直接粘贴之浏览器地址栏');
    }

    render() {
        return (
            <button onClick={this.onShare.bind(this)}>{this.props.children}</button>
        )
    }
}