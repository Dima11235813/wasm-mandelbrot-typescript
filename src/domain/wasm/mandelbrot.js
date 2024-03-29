module.exports = async () => {
  const res = await fetch("wasm/mandelbrot.wasm");
  const buffer = await res.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = new WebAssembly.Instance(module);

  return {
    name: "WebAssembly",
    render: (ctx, config) => {
      const { WIDTH, HEIGHT } = config;
      instance.exports.mandelbrot(
        config.iterations,
        config.x,
        config.y,
        config.d
      );
      const imgData = ctx.createImageData(WIDTH, HEIGHT);
      const offset = instance.exports.getImage();
      const linearMemory = new Uint8Array(
        instance.exports.memory.buffer,
        offset,
        WIDTH * HEIGHT * 4
      );
      imgData.data.set(linearMemory);
      config.updateImageData(imgData);
      ctx.restore()
      ctx.putImageData(imgData, 0, 0);
      // debugger;
    },
    description:
      "This implementation creates a minimal wasm module by compiling C using clang / llc and the binaryen tools directly (as opposed to emscripten, that wraps up clang / llc together with its own framework code).",
  };
};
