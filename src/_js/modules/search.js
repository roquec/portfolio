class Search {

  // Constants
  static SEARCH_TEXT_KEY = "search-text";
  static SEARCH_RESULTS_KEY = "search-results";

  static SEARCH_TAGS_WRAPPER_ID = "search-tags-wrapper";
  static SEARCH_RESULTS_WRAPPER_ID = "search-results-wrapper";
  static SEARCH_BOX_INPUT_ID = "search-box";
  static SEARCH_RESULTS_LABEL_ID = "search-results-label";
  static SEARCH_BOX_CLEAR_ID = "search-box-clear";

  static SEARCH_RESULTS_CLASS = "result-item";
  static HIDDEN_CLASS = "hidden";

  #tagsWrapperElement;
  #searchResultsWrapperElement;
  #searchBoxElement;
  #searchBoxClearElement;

  #posts = [];

  constructor(stateManager) {
    const searchText = Util.getState(Search.SEARCH_TEXT_KEY, "");
    const searchResults = JSON.parse(Util.getState(Search.SEARCH_RESULTS_KEY, "[]"));


    this.#registerInitialStyles(stateManager, searchText, searchResults);

    Util.onPageReady(this.#initialize.bind(this));
  }

  #registerInitialStyles(stateManager, searchText, searchResults) {
    stateManager.setStateById(
      Search.SEARCH_BOX_INPUT_ID,
      (element) => element.value = searchText
    );

    if (searchText === "" || searchText === "#") {
      stateManager.setStateById(
        Search.SEARCH_BOX_CLEAR_ID,
        (element) => element.classList.add(Search.HIDDEN_CLASS)
      );
    }

    stateManager.setStateByQuery(
      (element) => searchResults.includes(element.id),
      (element) => {
        element.classList.add(Search.SEARCH_RESULTS_CLASS);
        element.parentElement.parentElement.classList.add(Search.SEARCH_RESULTS_CLASS);
      }
    );

    const label = this.#getResultsLabel(searchResults);
    stateManager.setStateById(
      Search.SEARCH_RESULTS_LABEL_ID,
      (element) => element.innerHTML = label
    );


    if (searchText === "" || searchText === "#") {
      stateManager.setStateById(
        Search.SEARCH_RESULTS_WRAPPER_ID,
        (element) => element.classList.add(Search.HIDDEN_CLASS)
      );
    } else {
      stateManager.setStateById(
        Search.SEARCH_TAGS_WRAPPER_ID,
        (element) => element.classList.add(Search.HIDDEN_CLASS)
      );
    }
  }

  #initialize() {
    fetch("/assets/files/search.json").then(response => response.json().then(json => {
      this.#posts = json;
      this.#applyState();
    }));
    this.#tagsWrapperElement = document.getElementById(Search.SEARCH_TAGS_WRAPPER_ID);
    this.#searchResultsWrapperElement = document.getElementById(Search.SEARCH_RESULTS_WRAPPER_ID);
    this.#searchBoxElement = document.getElementById(Search.SEARCH_BOX_INPUT_ID);
    this.#searchBoxClearElement = document.getElementById(Search.SEARCH_BOX_CLEAR_ID);
    this.#applyState();
  }

  #applyState() {
    // Get search panel state
    const searchText = sessionStorage.getItem(Search.SEARCH_TEXT_KEY);
    const searchResults = JSON.parse(sessionStorage.getItem(Search.SEARCH_RESULTS_KEY));

    // Apply search box state
    this.#searchBoxElement.value = searchText;

    if (searchText === "" || searchText === "#") {
      this.#searchBoxClearElement.classList.add(Search.HIDDEN_CLASS)
    } else {
      this.#searchBoxClearElement.classList.remove(Search.HIDDEN_CLASS)
    }

    // Apply results state
    const resultItems = document.getElementsByClassName(Search.SEARCH_RESULTS_CLASS);
    while (resultItems.length > 0) {
      resultItems[0].classList.remove(Search.SEARCH_RESULTS_CLASS);
    }
    for (let searchResult of searchResults) {
      const fileItem = document.getElementById(searchResult);
      fileItem.classList.add(Search.SEARCH_RESULTS_CLASS);
      fileItem.parentElement.parentElement.classList.add(Search.SEARCH_RESULTS_CLASS);
    }

    // Apply results label state
    let resultsLabel = document.getElementById(Search.SEARCH_RESULTS_LABEL_ID);
    resultsLabel.innerHTML = this.#getResultsLabel(searchResults);

    // Set visibility
    if (searchText === "" || searchText === "#") {
      this.#tagsWrapperElement.classList.remove(Search.HIDDEN_CLASS);
      this.#searchResultsWrapperElement.classList.add(Search.HIDDEN_CLASS);
    } else {
      this.#tagsWrapperElement.classList.add(Search.HIDDEN_CLASS);
      this.#searchResultsWrapperElement.classList.remove(Search.HIDDEN_CLASS);
    }
  }

  #getResultsLabel(results) {
    let label = "No files found";
    if (results.length === 1) {
      label = "1 file found";
    }
    if (results.length > 1) {
      label = `${results.length} files found`;
    }
    return label;
  }

  search(searchText) {
    window.sessionStorage.setItem(Search.SEARCH_TEXT_KEY, searchText ?? "");
    this.#executeSearch();
    this.#applyState();
  }

  searchTag(tag) {
    let searchText = ""
    if (tag) {
      searchText = "#" + tag;
    }
    window.sessionStorage.setItem(Search.SEARCH_TEXT_KEY, searchText);
    this.#executeSearch();
    this.#applyState();
  }

  clearSearch() {
    window.sessionStorage.setItem(Search.SEARCH_TEXT_KEY, "");
    this.#executeSearch();
    this.#applyState();
    this.focus();
  }

  focus() {
    this.#searchBoxElement.focus();
    this.#searchBoxElement.select();
  }

  #executeSearch() {
    let searchText = window.sessionStorage.getItem(Search.SEARCH_TEXT_KEY);
    let results = [];

    if (searchText === "" || searchText === "#") {
      window.sessionStorage.setItem(Search.SEARCH_RESULTS_KEY, "[]");
      return;
    }

    for (let post of this.#posts) {
      let match = false;

      if (searchText[0] !== "#") {
        let searchTextClean = searchText.toLowerCase();
        match = post.title.includes(searchTextClean) || post.tags.join().includes(searchTextClean) || post.content.includes(searchTextClean);
      }

      if (searchText[0] === "#") {
        let selectedTagClean = searchText.slice(1).toLowerCase();
        match = post.tags.includes(selectedTagClean);
      }

      if (match) {
        results.push("search-panel-" + post.id);
      }
    }

    window.sessionStorage.setItem(Search.SEARCH_RESULTS_KEY, JSON.stringify(results));
  }
}
