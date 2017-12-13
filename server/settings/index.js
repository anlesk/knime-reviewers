class Settings {
  constructor() {
    this._settings = {};
  }

  setItem(key, value) {
    this._settings[key] = value;
  }

  getItem(key) {
    return this._settings[key];
  }

  deleteItem(key) {
    delete this._settings[key];
  }
}

module.exports = new Settings();