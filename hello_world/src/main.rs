use rand::prelude::*;
use rand::Rng;
use std::fs::File;
use std::io::{BufWriter, Write};

const WIDTH: usize = 1200;
const HEIGHT: usize = 800;
const PIXEL: usize = 3;

//Example limits taken from
//https://math.hws.edu/eck/js/mandelbrot/MB.html

//Full view
// <xmin>-2.2</xmin>
// <xmax>0.8</xmax>
// <ymin>-1.2</ymin>
// <ymax>1.2</ymax>

//Zoomed in
// <xmin>-0.7359374999999999991015</xmin>
// <xmax>-0.7234374999999999994145</xmax>
// <ymin>0.1696562500000000000000</ymin>
// <ymax>0.1790312500000000000000</ymax>

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
fn mandelbrot_color(x: f64, y: f64) -> [u8; 3] {
    const MAX_ITER: u32 = 255;
    let mut z = (0.0, 0.0);
    let c = (x, y);
    let mut i = 0;
    while i < MAX_ITER {
        z = (z.0 * z.0 - z.1 * z.1 + c.0, 2.0 * z.0 * z.1 + c.1);
        if z.0 * z.0 + z.1 * z.1 > 4.0 {
            let hue = i as f32 / MAX_ITER as f32;
            let color = hsv_to_rgb(hue, 1.0, 1.0);
            return color;
        }
        i += 1;
    }
    [0, 0, 0]
}

fn hsv_to_rgb(h: f32, s: f32, v: f32) -> [u8; 3] {
    let c = v * s;
    let x = c * (1.0 - (h % 2.0 - 1.0).abs());
    let m = v - c;

    let (r, g, b) = if h < 1.0 {
        (c, x, 0.0)
    } else if h < 2.0 {
        (x, c, 0.0)
    } else if h < 3.0 {
        (0.0, c, x)
    } else if h < 4.0 {
        (0.0, x, c)
    } else if h < 5.0 {
        (x, 0.0, c)
    } else {
        (c, 0.0, x)
    };

    [
        ((r + m) * 255.0) as u8,
        ((g + m) * 255.0) as u8,
        ((b + m) * 255.0) as u8,
    ]
}

const XMIN: f64 = -2.2;
const XMAX: f64 = 0.8;
const YMIN: f64 = -1.2;
const YMAX: f64 = 1.2;
// const XMIN:f32 = -0.7359374999999999991015;
// const XMAX:f32 = -0.7234374999999999994145;
// const YMIN:f32 = 0.1696562500000000000000;
// const YMAX:f32 = 0.1790312500000000000000;

fn main() {
    let mut grid = [[[0u8; PIXEL]; WIDTH]; HEIGHT];
    let mut pixel = [0u8; PIXEL];
    let mut rng = rand::thread_rng();

    for x in 0..HEIGHT {
        for y in 0..WIDTH {
            let mx = XMIN + (XMAX - XMIN) * (x as f64 / WIDTH as f64);
            let my = YMIN + (YMAX - YMIN) * (y as f64 / HEIGHT as f64);
            // pixel[0] = rng.gen_range(0..255);
            // pixel[1] = rng.gen_range(0..255);
            // pixel[2] = rng.gen_range(0..255);
            grid[y][x] = mandelbrot_color(mx, my)
        }
    }

    save_grid_as_csv(&grid);
}
// fn save_grid_as_bin(grid: &[[[u8; PIXEL]; WIDTH]; HEIGHT]) {
//     let file = File::create("grid.bin").expect("failed to create file");
//     let mut writer = BufWriter::new(file);

//     for row in grid.iter() {
//         for pixel in row.iter() {
//             writer.write_all(pixel).expect("failed to write to file");
//         }
//     }

//     println!("grid saved to file");
// }
fn save_grid_as_csv(grid: &[[[u8; PIXEL]; WIDTH]; HEIGHT]) {
    let file = File::create("grid.csv").expect("failed to create file");
    let mut writer = BufWriter::new(file);
    let data = &mut format!("{}\n", "[");
    for (gi, row) in grid.iter().enumerate() {
        data.push_str("[");
        for (ri, pixel) in row.iter().enumerate() {
            let r = pixel[0];
            let g = pixel[1];
            let b = pixel[2];
            // Check if this is the last pixel in the row
            let comma = if ri == row.len() - 1 { "" } else { "," };
            let rbgPixel = format!("{}{},{},{}{}{}\n", "[", r, g, b, "]", comma);
            data.push_str(rbgPixel.as_str());
        }
        let comma = if gi == grid.len() - 1 {
            data.push_str("]")
        } else {
            data.push_str("],")
        };
    }
    data.push_str("]");
    writer.write_all(data.as_bytes());

    println!("grid saved to file");
}
