class Storage {
  /**
   * Method to get storage data
   * Sets a default value if provided there is no current state
   * @returns {any}
   */
  static get(key, defaultValue = undefined, storage = sessionStorage) {
    const value = storage.getItem(key);
    if (!value && defaultValue !== undefined) {
      storage.setItem(key, defaultValue);
      return defaultValue;
    }
    return value;
  }

  /**
   * Method to set storage data
   */
  static set(key, value, storage = sessionStorage) {
    const oldValue = storage.getItem(key);
    storage.setItem(key, value);
    const event = new CustomEvent("state", {key: key, from: oldValue, to: value, in: storage});
    window.dispatchEvent(event);
  }

  /**
   * Method to remove storage data
   */
  static remove(key, storage = sessionStorage) {
    const oldValue = storage.getItem(key);
    storage.removeItem(key);
    const event = new CustomEvent("state", {key: key, from: oldValue, to: null, in: storage});
    window.dispatchEvent(event);
  }
}
