import React from "react";
import { Mandlebrot } from "../domain/mandlebrot";

export class MandlebrotContainer extends React.Component {
  componentDidMount() {
    const mandlebrot = new Mandlebrot();
    debugger;
    mandlebrot.bootstrap();
    debugger;
  }
  render() {
    return (
      <div>
        <p className="lead">Select an implementation, the click 'render'.</p>
        <select id="mode" className="form-control"></select>
        <button id="render" className="btn btn-primary">
          Re-render
        </button>
        <button id="renderPerf" className="btn btn-primary">
          Render (x10)
        </button>
        <span>Render time</span> <span id="execution">--</span> <span>ms</span>
        <p id="description" className="lead"></p>
        <canvas id="canvas" width="1200" height="800"></canvas>
      </div>
    );
  }
}
