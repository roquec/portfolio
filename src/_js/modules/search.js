class Search {

  // Constants
  static SEARCH_TEXT = "search-text";
  static SEARCH_TAG = "selected-tag";
  static SEARCH_RESULTS = "search-results";

  static SEARCH_BOX_WRAPPER_ID = "search-box-wrapper";
  static TAGS_WRAPPER_ID = "tags-wrapper";
  static SEARCH_RESULTS_WRAPPER_ID = "search-results";
  static SEARCH_BOX_INPUT_ID = "search-box";

  #searchBoxWrapperElement;
  #tagsWrapperElement;
  #searchResultsWrapperElement;
  #searchBoxElement;

  #posts = [];

  constructor() {
  }

  init() {
    Util.onDomLoaded(() => this.#onDomReady());
    Util.onAfterLoad(() => this.#onAfterLoad());
    fetch("/search.json").then(response => response.json().then(json => this.#posts = json));
    this.#setInitialStateStyles();
    return this;
  }

  #onDomReady() {
    this.#searchBoxWrapperElement = document.getElementById(Search.SEARCH_BOX_WRAPPER_ID);
    this.#tagsWrapperElement = document.getElementById(Search.TAGS_WRAPPER_ID);
    this.#searchResultsWrapperElement = document.getElementById(Search.SEARCH_RESULTS_WRAPPER_ID);
    this.#searchBoxElement = document.getElementById(Search.SEARCH_BOX_INPUT_ID);
    this.#applyState();
  }

  #onAfterLoad() {
    let initialStyles = document.getElementById("search-initial-state-styles");
    if (initialStyles) {
      initialStyles.remove();
    }
  }

  #applyState() {
    // Get search panel state
    let searchText = window.sessionStorage.getItem(Search.SEARCH_TEXT);
    let selectedTag = window.sessionStorage.getItem(Search.SEARCH_TAG);
    let searchResults = window.sessionStorage.getItem(Search.SEARCH_RESULTS);

    // Apply search box state
    this.#searchBoxElement.value = searchText ?? "";

    // Apply tags state
    let selectedTagElement = document.getElementById("tag-" + selectedTag);
    let tags = document.getElementsByClassName("selected");
    while (tags.length > 0) {
      tags[0].classList.remove("selected");
    }
    if (selectedTagElement) {
      this.#tagsWrapperElement.classList.add("selected");
      selectedTagElement.classList.add("selected");
    } else {
      this.#tagsWrapperElement.classList.remove("selected");
    }

    // Apply results state
    let resultItems = document.getElementsByClassName("result");
    while (resultItems.length > 0) {
      resultItems[0].classList.remove("result");
    }
    if (searchResults) {
      let resultsArray = JSON.parse(searchResults);
      for (let searchResult of resultsArray) {
        let fileItem = document.getElementById(searchResult);
        fileItem.parentElement.classList.add("result");
        fileItem.parentElement.previousElementSibling.classList.add("result");
        fileItem.classList.add("result");
      }
      let countElement = document.getElementById("search-results-count");
      countElement.setAttribute("data-value", resultsArray.length);
    }

    // Set visibility
    if (searchText) {
      this.#searchBoxWrapperElement.classList.remove("hidden");
      this.#tagsWrapperElement.classList.add("hidden");
      this.#searchResultsWrapperElement.classList.remove("hidden");
    } else if (selectedTag) {
      this.#searchBoxWrapperElement.classList.add("hidden");
      this.#tagsWrapperElement.classList.remove("hidden");
      this.#searchResultsWrapperElement.classList.remove("hidden");
    } else {
      this.#searchBoxWrapperElement.classList.remove("hidden");
      this.#tagsWrapperElement.classList.remove("hidden");
      this.#searchResultsWrapperElement.classList.add("hidden");
    }
  }

  #setInitialStateStyles() {
    // Get search panel state
    let searchText = window.sessionStorage.getItem(Search.SEARCH_TEXT);
    let selectedTag = window.sessionStorage.getItem(Search.SEARCH_TAG);
    let searchResults = window.sessionStorage.getItem(Search.SEARCH_RESULTS);

    let style = "<style id='search-initial-state-styles'>";

    // Set visibility
    if (searchText) {
      style = style + ".initial-state #tags-wrapper { display: none !important; } ";
    } else if (selectedTag) {
      style = style + ".initial-state #search-box-wrapper { display: none !important; } ";
    } else {
      style = style + ".initial-state #search-results { display: none !important; } ";
    }

    // Search
    if (searchText) {
      style = style + `.initial-state #search-box-wrapper span::after { content: "${searchText}" !important; display: block !important; } `;
      style = style + `.initial-state #search-box::placeholder { visibility: hidden !important; } `;
    }

    // Tags
    if (selectedTag) {
      style = style + `.initial-state .tag-item { display: none !important; } `;
      style = style + `
    .initial-state #tag-${CSS.escape(selectedTag)} {
      display: flex !important;
      flex-grow: 1 !important;
      color: var(--color-file-item-active-foreground) !important;
      padding: 0 rem(20px) !important;
    }
    .initial-state #tag-${CSS.escape(selectedTag)}:hover {
      outline-color: #ff4f4f !important;
      background-color: #831c1c !important;
      color: var(--color-file-item-active-foreground) !important;
    }
    .initial-state #tag-${CSS.escape(selectedTag)} .tag-name { font-size: 14px !important; }
    .initial-state #tag-${CSS.escape(selectedTag)} .tag-number { display: none !important; }
    .initial-state #tag-${CSS.escape(selectedTag)} .icon-cross { display: block !important; }
    `;
    }

    // Results
    if (searchResults) {
      let resultsArray = JSON.parse(searchResults);
      style = style + `.initial-state #search-results .file-item:not(.folder-item) { display: none !important; } `;
      for (let searchResult of resultsArray) {
        style = style + `.initial-state #search-results #${CSS.escape(searchResult)} { display: flex !important; } `;
      }
      style = style + `.initial-state #search-results-count::after { content: "${resultsArray.length}" !important; } `;
    }

    style = style + "</style>";

    document.head.insertAdjacentHTML("beforeend", style)
  }

  onSearch() {
    let searchText = this.#searchBoxElement.value;
    if (searchText) {
      window.sessionStorage.setItem(Search.SEARCH_TEXT, this.#searchBoxElement.value);
    } else {
      window.sessionStorage.removeItem(Search.SEARCH_TEXT);
    }
    this.#executeSearch();
    this.#applyState();
  }

  tagToggle(tag) {
    let selectedTag = window.sessionStorage.getItem(Search.SEARCH_TAG);
    if (tag && tag !== selectedTag) {
      window.sessionStorage.setItem(Search.SEARCH_TAG, tag);
    } else {
      window.sessionStorage.removeItem(Search.SEARCH_TAG);
    }
    this.#executeSearch();
    this.#applyState();
  }

  #executeSearch() {
    let searchText = window.sessionStorage.getItem(Search.SEARCH_TEXT);
    let selectedTag = window.sessionStorage.getItem(Search.SEARCH_TAG);
    let results = [];

    for (let post of this.#posts) {
      let match = false;

      if (searchText) {
        let searchTextClean = searchText.toLowerCase();
        match = post.title.includes(searchTextClean) || post.tags.includes(searchTextClean) || post.content.includes(searchTextClean);
      }

      if (selectedTag) {
        let selectedTagClean = selectedTag.toLowerCase();
        match = post.tags.includes(selectedTagClean);
      }

      if (match) {
        results.push("search-panel-" + post.id);
      }
    }

    if (results.length > 0) {
      window.sessionStorage.setItem(Search.SEARCH_RESULTS, JSON.stringify(results));
    } else {
      window.sessionStorage.removeItem(Search.SEARCH_RESULTS);
    }
  }
}
