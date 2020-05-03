#[macro_use]
extern crate cfg_if;

extern crate wasm_bindgen;
extern crate web_sys;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

// Called by our JS entry point to run the example
#[wasm_bindgen]
pub fn run() -> Result<i32, JsValue> {
    // If the `console_error_panic_hook` feature is enabled this will set a panic hook, otherwise
    // it will do nothing.
    set_panic_hook();

    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("div")?;
    val.set_inner_html("test");

    body.append_child(&val)?;

    Ok(10)
}

#[wasm_bindgen]
pub fn add(x:i32,y:i32) -> i32 {
    x + y
}

extern crate nalgebra as na;
use na::{Matrix, DMatrix, Matrix1x3, Dynamic, U3, SVD};

#[wasm_bindgen]
pub struct ExportedTuple2Struct(pub u32, pub u32);

#[wasm_bindgen]
pub fn return_tuple_struct(x: u32, y: u32) -> ExportedTuple2Struct {
    ExportedTuple2Struct(x, y)
}

#[wasm_bindgen]
pub struct ExportedTupleStruct(pub f64, pub f64, pub f64);

#[wasm_bindgen]
pub fn test_function() -> ExportedTupleStruct {
    ExportedTupleStruct(1.0,2.0,3.0)
}
