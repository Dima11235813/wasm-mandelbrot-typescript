export default async() => {
  const WIDTH = 1200, HEIGHT = 800;

  const res = await fetch('wasm/mandelbrot.wasm');
  const buffer = await res.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = new WebAssembly.Instance(module);

  return {
    name: 'WebAssembly',
    render: (ctx: any, config:any) => {
      debugger
      (instance.exports.mandelbrot as any)(config.iterations, config.x, config.y, config.d)

      const imgData = ctx.createImageData(WIDTH, HEIGHT);
      debugger
      const offset = (instance.exports as any).getImage();
      debugger
      const linearMemory = new Uint8Array((instance.exports.memory as any).buffer, offset, WIDTH * HEIGHT * 4);
      imgData.data.set(linearMemory);
      debugger
      ctx.putImageData(imgData, 0, 0);
    },
    description: 'This implementation creates a minimal wasm module by compiling C using clang / llc and the binaryen tools directly (as opposed to emscripten, that wraps up clang / llc together with its own framework code).'
  }
};
