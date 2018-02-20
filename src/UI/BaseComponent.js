import React, { Component } from "react";
import { Dimensions } from 'react-native';
let { width, height } = Dimensions.get("window");

export default class BaseComponent extends Component {
  dimensionListener = Dimensions.addEventListener("change", () => {
    let landscape = width > height;
    this.setState({
      width: landscape ? Math.max(width, height) : Math.min(width, height),
      height: landscape ? Math.min(width, height) : Math.max(width, height)
    });
  });
}
