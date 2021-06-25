import { defaultMandlebrotConfig, IMandlebrotConfig } from "../models/mandlebrotConfig";
import { timeExecution } from "../utils/timeUtils";

export class Mandlebrot {

    //TODO Move to ctor for dynamic window calc
    static WIDTH = 1200
    static HEIGHT = 800;

    public _WIDTH = Mandlebrot.WIDTH
    public _HEIGHT = Mandlebrot.HEIGHT

    public canvas!: HTMLCanvasElement
    public ctx!: CanvasRenderingContext2D
    public modeSelect!: HTMLElement

    public config!: IMandlebrotConfig | null
    public renderers: any[] = []

    // the 'seahorse tail' 
    // https://commons.wikimedia.org/wiki/File:Mandel_zoom_04_seehorse_tail.jpg

    constructor() {
        this.config = defaultMandlebrotConfig
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.ctx = this.canvas?.getContext('2d') as CanvasRenderingContext2D
        this.ctx.scale(2, 2);
        debugger
    }
    
    bootstrap = async () => {
        debugger
        
        this.modeSelect = document.getElementById('mode') as HTMLElement
        this.clearCanvas();
        debugger
        
        this.renderers = [
            await require('./wasm/mandelbrot.js')(),
            // await require('js/mandelbrot.js')(),
            // await require('emscripten/mandelbrot.js')(),
            // await require('assemblyscript/mandelbrot-asc.js')(),
            // // await require('assemblyscript/mandelbrot-tsc.js')(),
            // await require('asmjs/mandelbrot.js')(),
        ];
        
        this.renderers.forEach((renderer, index) => {
            debugger
            const option = document.createElement('option') as HTMLOptionElement
            option.value = `${index}`;
            option.innerHTML = renderer.name;
            this.modeSelect.appendChild(option);
        });
        
        const selectedRenderer = window.location.hash ? window.location.hash.slice(1) : this.renderers[0].name;
        (this.modeSelect as any).selectedIndex = Array.apply(null, (this.modeSelect as any).options).findIndex(o => (o as any).text === selectedRenderer) as any
    
        
        (document.getElementById('render') as HTMLElement)
        .addEventListener('click', () => this.render());
        
        (document.getElementById('renderPerf') as HTMLElement)
        .addEventListener('click', () => this.render(10));
        
        this.modeSelect
        .addEventListener('change', () => this.render());
        debugger

        this.render();
    }
    render = async (iterations = 1) => {
        debugger
        const renderer = this.renderers[(this.modeSelect as any).value];
        window.location.hash = '#' + renderer.name;
        (document.getElementById('description') as HTMLElement).innerHTML = renderer.description;
        this.clearCanvas();
        debugger
        await this.wait(10);
        debugger
        const executionTime = timeExecution(() => {
            debugger
            for (let i = 0; i < iterations; i++) {
                renderer.render(this.ctx, this.config);
            }
        });
        (document.getElementById('execution') as HTMLElement).innerHTML = (executionTime / iterations).toFixed(2);
    }

    //UTILS to move to utils files
    clearCanvas = () => {
        if (this.ctx) {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this._WIDTH, this._HEIGHT);
        }
    }
    wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
