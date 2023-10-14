class State {

  #observer;
  #modifiers = [];

  constructor() {
    Util.onDomLoaded(this.stop.bind(this));
    this.start();
  }

  start() {
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        for (const addedNode of mutation.addedNodes) {
          for (const modifier of this.#modifiers) {
            if (modifier.matches(addedNode)) {
              modifier.apply(addedNode);
            }
          }
        }
      }
    };
    const config = {attributes: false, childList: true, subtree: true};
    this.#observer = new MutationObserver(callback);
    this.#observer.observe(document.documentElement, config);
  }

  stop() {
    this.#observer.disconnect();
  }

  setStateByQuery(matches, apply) {
    this.#modifiers.push({matches, apply});
  }

  setStateById(id, callback) {
    this.setStateByQuery((e) => {
      return e.id === id
    }, callback);
  }

  setStateByClass(className, callback) {
    this.setStateByQuery((e) => {
      return e.classList && e.classList.contains(className)
    }, callback);
  }
}
