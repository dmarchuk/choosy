import React, { Component } from 'react';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Picker extends Component {
  render() {
    return (
      <CameraRollPicker callback={this.getSelectedImages} />
    );
  }
}

module.exports = Picker;