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
        this.WIDTH = Width ?? 100
        this.HEIGHT = Height ?? 100;

        this.zoomFactor = .05

        this.x = -0.7436497860
        this.y = 0.1318252536
        this.d = 0.00039936
        this.iterations = 2550
    }
    updateImageData = (imageData: ImageData) => {
        this.imageData = imageData
    }
};