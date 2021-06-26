export interface IMandlebrotConfig {
    WIDTH: number
    HEIGHT: number

    zoomFactor: number

    x: number
    y: number
    d: number
    iterations: number

    updateImageData(arrayOfPixels: ImageData): void
    imageData?: Uint8Array
}

export class MandlebrotConfig implements IMandlebrotConfig {
    WIDTH: number
    HEIGHT: number

    zoomFactor: number

    x: number
    y: number
    d: number

    iterations: number
    imageData?: any
    constructor(
        Width?: number,
        Height?: number
    ) {
        this.WIDTH = Width ?? 1200
        this.HEIGHT = Height ?? 800;

        this.zoomFactor = .05

        this.x = -0.7436447860
        this.y = 0.1318252536
        this.d = 0.00029336
        this.iterations = 10000
    }
    updateImageData = (imageData: ImageData) => {
        this.imageData = imageData
    }
};