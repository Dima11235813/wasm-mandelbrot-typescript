// use image::io::Reader as ImageReader;

// mandelbrot-image
fn mandelbrot(x: f64, y: f64) -> u8 {
    const MAX_ITER: u32 = 255;
    let mut z = (0.0, 0.0);
    let c = (x, y);
    let mut i = 0;
    while i < MAX_ITER {
        z = (z.0 * z.0 - z.1 * z.1 + c.0, 2.0 * z.0 * z.1 + c.1);
        if z.0 * z.0 + z.1 * z.1 > 4.0 {
            return i as u8;
        }
        i += 1;
    }
    0
}

fn main() {
    const WIDTH: u32 = 80000;
    const HEIGHT: u32 = 60000;
    let mut imgbuf = image::ImageBuffer::new(WIDTH, HEIGHT);
    for (x, y, pixel) in imgbuf.enumerate_pixels_mut() {
        let xf = (x as f64 - WIDTH as f64 / 2.0) / (WIDTH as f64 / 4.0);
        let yf = (y as f64 - HEIGHT as f64 / 2.0) / (HEIGHT as f64 / 4.0);
        let color = mandelbrot(xf, yf);
        *pixel = image::Rgb([color, color, color]);
    }
    imgbuf.save("mandelbrot.png").unwrap();
}
