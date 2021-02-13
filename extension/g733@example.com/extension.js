// Example #1
// @ts-nocheck

const { St, Clutter } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const GLib = imports.gi.GLib;

let panelButton;
let text;

const get = (filename) => {
  return GLib.spawn_command_line_sync(
    `cat /home/fran/.cache/${filename}`
  )[1].toString();
};

let timeout;
const func = () => {
  if (timeout) {
    Mainloop.source_remove(timeout);
  }

  let g733 = get("g733");
  let weather = get("wttrtemp");

  text = new St.Label({ text: `${g733} ${weather}` });

  let monitor = Main.layoutManager.primaryMonitor;
  text.set_position(
    monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
    monitor.y + Math.floor(monitor.height / 2 - text.height / 2)
  );

  panelButton.set_child(text);

  timeout = Mainloop.timeout_add_seconds(1, func);
};

function init() {
  // Create a Button with "Hello World" text
  panelButton = new St.Bin({
    style_class: "panel-button",
  });

  func();

  text = new St.Label({
    text: `Loading`,
    y_align: Clutter.ActorAlign.CENTER,
  });

  panelButton.set_child(text);
}

function enable() {
  // Add the button to the panel
  Main.panel._rightBox.insert_child_at_index(panelButton, 0);
}

function disable() {
  // Remove the added button from panel
  Main.panel._rightBox.remove_child(panelButton);
}
