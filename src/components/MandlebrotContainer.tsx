import React from "react";
import { Mandlebrot } from "../domain/mandlebrot";

const canvasId = "canvas";
export class MandlebrotContainer extends React.Component {
  componentDidMount() {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      new Mandlebrot(canvas as HTMLCanvasElement);
    }
  }
  render() {
    return <canvas id={`${canvasId}`}></canvas>;
  }
}
