import { Component } from 'react'
import { Resizable } from 're-resizable'
import Draggable from 'react-draggable';
import ShareButton from './ShareButton'

import '../style/variant-div.scss';

export default class VariantDiv extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // width:0,
      // height:0,
      // top:0,
      // left:0
      ...this.props
    }
  }

  onDragStop(e, data) {
    // console.log(e,data)
    this.setState({ top: data.y, left: data.x })

    this.props.onVariant && this.props.onVariant({
      Top: this.state.top,
      Left: this.state.left,
    });
  }

  onDrag(e, data) {
    // console.log(e,data)
    this.setState({ top: data.y, left: data.x })
  }

  onResizeStop(e, direction, ref, d) {
    // console.log(direction,ref,d)
    let { width, height } = this.state;
    width += d.width;
    height += d.height;

    this.setState({
      width,
      height,
    });

    this.props.onVariant && this.props.onVariant({
      Width: this.state.width,
      Height: this.state.height,
    });
  }

  render() {

    const { onDel, onVariant } = this.props;
    const size = { width: this.state.width, height: this.state.height }

    return (
      <Draggable
        handle=".moveHandler"
        onDrag={(e, data) => this.onDrag(e, data)}
        onStop={(e, data) => this.onDragStop(e, data)}
        defaultPosition={{ x: this.state.left, y: this.state.top }}
      >
        <Resizable
          size={size}
          className="variant-div"
          boundsByDirection={true}
          onResizeStop={(e, direction, ref, d) => this.onResizeStop(e, direction, ref, d)}
        >
          <div className="title">
            <ShareButton name={this.state.name} groupName={this.state.groupName} dashboardName={this.state.dashboardName}>点击复制链接</ShareButton>
            {
              onDel && <button onClick={onDel}>删除</button>
            }
            {
              onVariant && <button className="moveHandler">拖拽此处移动</button>
            }
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </Resizable>

      </Draggable>
    )
  }
}