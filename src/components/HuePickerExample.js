'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { HuePicker } from 'react-color'

class HuePickerExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '100px',
          height: '100px',
          borderRadius: '100%',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        // popover: {
        //   position: 'absolute',
        //   zIndex: '2',
        // },
        // cover: {
        //   position: 'fixed',
        //   top: '0px',
        //   right: '0px',
        //   bottom: '0px',
        //   left: '0px',
        // },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <HuePicker direction="vertical" width="16px" height="200px"
          color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default HuePickerExample