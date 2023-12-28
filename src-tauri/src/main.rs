// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let splashscreen_window = app.get_window("splashscreen").unwrap();
        let main_window = app.get_window("main").unwrap();
        // we perform the initialization code on a new task so the app doesn't freeze
        tauri::async_runtime::spawn(async move {
          // initialize your app here instead of sleeping :)
          println!("Initializing...");
          std::thread::sleep(std::time::Duration::from_secs(3));
          println!("Done initializing.");
  
          // After it's done, close the splashscreen and display the main window
          splashscreen_window.close().unwrap();
          main_window.show().unwrap();
        });
        Ok(())
      })
    .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
