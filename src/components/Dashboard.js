import React, { Component } from 'react'

import WidgetProxy from './WidgetProxy';
import AddDialog from './Dashboard/AddDialog'
import VariantDIV from './VariantDiv'
import Group from './Group'
import ShareButton from './ShareButton'

import '../style/dashboard.scss'

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.addDialog = React.createRef();
    this.state = {
      name: null,
      addDialogVisible: false,
    }
  }

  showAddDialog() {
    this.setState({ addDialogVisible: true });
  }
  render() {
    const { name, widgets, onAddWidget, onVariant, onDel } = this.props;
    const groupNames = [...new Set(widgets.map(s => s.GroupName))];
    return (
      <div className="dashboard">
        <div className="toolbar">
          DashboardName: {name} <button onClick={this.showAddDialog.bind(this)}>添加部件</button>
          <ShareButton dashboardName={name} value={name}>点击复制仪表盘链接</ShareButton>
        </div>
        {
          groupNames.map(groupName =>

            <Group groupName={groupName} dashboardName={name} key={groupName}>
              {
                widgets.filter(s => s.GroupName === groupName).map(widget =>

                  <div className="item" key={widget.Name}>
                    <VariantDIV
                      width={widget.Width || 300}
                      height={widget.Height || 300}
                      top={widget.Top || 0}
                      left={widget.Left | 0}
                      name={widget.Name}
                      groupName={widget.GroupName}
                      dashboardName={widget.DashboardName}
                      onVariant={onVariant&&((data) => onVariant(widget, data))}
                      onDel={onDel&&(() => onDel(widget))}

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
        <AddDialog visible={this.state.addDialogVisible} onAddWidget={onAddWidget} onClose={() => this.setState({ addDialogVisible: false })} ref={this.addDialog}></AddDialog>
      </div>
    );
  }
}
