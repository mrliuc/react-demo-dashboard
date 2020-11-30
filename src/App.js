import { Component } from 'react'
import './App.css';
import loadable from '@loadable/component'

export default class App extends Component {

  state = {
    PageName: 'Dashboard'
  }

  getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const urlObj = window.location;
    var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }


  componentDidMount() {
    const pageName = this.getQueryString('PageName')
    this.setState({
      PageName: pageName
    })
  }

  render() {

    const Page = loadable(() => import('./components/' + (this.state.PageName || 'ControlPanel')))
    return (
      <Page />
    )
  }
}