export interface IMandlebrotConfig{
    x: number
    y: number
    d: number
    iterations: number
}

export const defaultMandlebrotConfig: IMandlebrotConfig = {
    x: -0.7436447860,
    y: 0.1318252536,
    d: 0.00029336,
    iterations: 10000
  };