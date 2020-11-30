import React, { Component } from 'react'
import axios from '../utils/axios.js'

import LazyWidget from './LazyWidget'

export default class WidgetProxy extends Component {
    state = {
        data: null,
    }

    componentDidMount() {
        this.getData()
    }

    componentWillReceiveProps(){
        this.getData();
    }

    async getData() {
        const result = await axios.post(this.props.dataURL);
        if (result.status !== 200) {
            return;
        }
        this.setState({
            data:result.data
        })
    }

    render() {
        const { name, groupName, widgetName } = this.props
        const Widget = LazyWidget[widgetName]
        // this.getData();

        return (
            <Widget data={this.state.data} name={name} groupName={groupName} />
        )
    }
}