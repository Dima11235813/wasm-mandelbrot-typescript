import { MandlebrotConfig } from "../models/mandlebrotConfig";
import papa from 'papaparse';
import data from '../grid.json'
// import p5 from "p5";

export class Mandlebrot {


    public canvas!: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D | null
    // public modeSelect!: HTMLElement

    public config!: MandlebrotConfig | null
    public renderer: any

    // public p!: p5
    // public p5renderer!: p5.Renderer;

    // the 'seahorse tail' 
    // https://commons.wikimedia.org/wiki/File:Mandel_zoom_04_seehorse_tail.jpg

    recalcInProg: boolean = false

    constructor(canvasContainer: HTMLCanvasElement) {
        this.config = new MandlebrotConfig()
        this.canvas = canvasContainer
        this.ctx = this.canvas.getContext('2d');
        // this.canvas.addEventListener(
        //     'click',
        //     (event) => this.handleMouseClick(
        //         this,
        //         event
        //     ))

        this.init()
        // new p5(this.bootstrap, canvasContainer)
    }
    init = async () => {
        // const csvFilePath = './grid.csv';

        // papa.parse(csvFilePath, {
        //     header: true,
        //     delimiter: ',',
        //     dynamicTyping: true,
        //     complete: (results: any) => {
        //         this.data = results.data;
        //         console.log(this.data);
        //         // convert data to JSON as desired
        //     }
        // });
        //Other test
        new Array(this.config?.WIDTH ?? 0).fill(0).forEach((_, col) => {
            new Array(this.config?.HEIGHT ?? 0).fill(0).forEach((_, row) => {
                const cell = data[col][row]
                const color = `rgb(${cell[0]},${cell[1]},${cell[2]})`;
                if (this.ctx) {
                    this.ctx.fillStyle = color;
                    this.ctx?.fillRect(col, row, 1, 1);
                    console.log(`Rendering pixel ${col},${row} with color ${color}`)
                }
            })
        })
        // await this.loadWasm()
        // await this.renderWithWasm()
    }

    renderWithWasm = async () => {
        //Avoid more than one click handler at a time
        if (!this.recalcInProg) {
            console.log(`Calling renderWithWasm with config`)
            console.log(this.config)
            this.recalcInProg = true
            await this.renderer.render(this.ctx, this.config)
            console.log(`render completed`)
            this.recalcInProg = false
        }
    }

    // bootstrap = async (p: p5) => {
    //     this.p = p

    //     await this.loadWasm()
    //     p.setup = this.setup
    //     // p.draw = this.draw
    //     p.mouseClicked = this.handleMouseClick
    // }
    loadWasm = async () => {
        this.renderer = await require('./wasm/mandelbrot.js')()
    }
    // setup = async () => {
    //     // debugger
    //     this.p5renderer = this.p.createCanvas(
    //         Mandlebrot.WIDTH,
    //         Mandlebrot.HEIGHT,
    //         'p2d'// 'webgl'
    //     );
    //     // this.p5context = (this.p5renderer as any).drawingContext.canvas.getContext('2d')
    //     debugger
    //     await this.renderer.render(this.ctx, this.config)
    // }
    draw = () => {
        if (this.config?.imageData && this.config?.imageData?.length > 0) {
            // debugger
            // this.p.image(this.config.imageData, 0, 0)
            // debugger
            // this.p.updatePixels()
        }
        // this.p.loadPixels()
        // //Now that we have pixels in config
        // if (this.config?.pixels) {
        //     // for(let x= 0; x < this.p.width; x++){
        //     //     for(let y= 0; y < this.p.height; y++){
        //     //         this.
        //     //     }    
        //     // }
        //     // this.p.pixels = this.config?.pixels as any
        //     for (let i = 0; i < this.config.pixels.length; i += 4) {
        //         let xValue = i % this.p.width
        //         let yValue = i % this.p.height
        //         let color = this.p.color(
        //             this.config.pixels[i],
        //             this.config.pixels[i + 1],
        //             this.config.pixels[i + 2]
        //         )
        //         debugger
        //         this.p.set(
        //             xValue,
        //             yValue,
        //             color
        //         );
        //     }
        //     debugger
        // }
        // this.p.updatePixels()
    }
    handleMouseClick = async (context: any, event: any) => {
        // let newX = event.x
        // let newY = event.y
        if (this.config) {
            this.config.x = this.config.x + (this.config.x * this.config.zoomFactor)
            this.config.y = this.config.y + (this.config.y * this.config.zoomFactor)
            // this.config.d = this.config.d * this.config.zoomFactor
            // this.config.x = this.config.x * (this.config.WIDTH - newX)
            // this.config.y = this.config.y * (this.config.HEIGHT - newY)
            // this.config.x = this.p.width / newX
            // this.config.y = this.p.height / newY
            await this.renderWithWasm()
        }
    }

    //UTILS to move to utils files
    // clearCanvas = () => {
    //     if (this.ctx) {
    //         this.ctx.fillStyle = 'black';
    //         this.ctx.fillRect(0, 0, this._WIDTH, this._HEIGHT);
    //     }
    // }
    // wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
