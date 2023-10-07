initializeSearchStyles();

window.addEventListener("DOMContentLoaded", loadSearch);

let searchBoxWrapperElement;
let tagsWrapperElement;
let searchResultsWrapperElement;
let searchBoxElement;
let posts = [];

function initializeSearchStyles() {
  // Get search panel state
  let searchText = window.sessionStorage.getItem("search-text");
  let selectedTag = window.sessionStorage.getItem("selected-tag");
  let searchResults = window.sessionStorage.getItem("search-results");

  let style = "<style>";

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

function loadSearch() {
  searchBoxWrapperElement = document.getElementById("search-box-wrapper");
  tagsWrapperElement = document.getElementById("tags-wrapper");
  searchResultsWrapperElement = document.getElementById("search-results");
  searchBoxElement = document.getElementById("search-box");

  if (posts.length === 0) {
    fetch("/search.json").then(response => response.json().then(json => posts = json));
  }

  applySearchState();
}

function applySearchState() {
  // Get search panel state
  let searchText = window.sessionStorage.getItem("search-text");
  let selectedTag = window.sessionStorage.getItem("selected-tag");
  let searchResults = window.sessionStorage.getItem("search-results");

  // Apply search box state
  searchBoxElement.value = searchText ?? "";

  // Apply tags state
  let selectedTagElement = document.getElementById("tag-" + selectedTag);
  let tags = document.getElementsByClassName("selected");
  while (tags.length > 0) {
    tags[0].classList.remove("selected");
  }
  if (selectedTagElement) {
    tagsWrapperElement.classList.add("selected");
    selectedTagElement.classList.add("selected");
  } else {
    tagsWrapperElement.classList.remove("selected");
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
      fileItem.classList.add("result");
    }
    let countElement = document.getElementById("search-results-count");
    countElement.setAttribute("data-value", resultsArray.length);
  }

  // Set visibility
  if (searchText) {
    searchBoxWrapperElement.classList.remove("hidden");
    tagsWrapperElement.classList.add("hidden");
    searchResultsWrapperElement.classList.remove("hidden");
  } else if (selectedTag) {
    searchBoxWrapperElement.classList.add("hidden");
    tagsWrapperElement.classList.remove("hidden");
    searchResultsWrapperElement.classList.remove("hidden");
  } else {
    searchBoxWrapperElement.classList.remove("hidden");
    tagsWrapperElement.classList.remove("hidden");
    searchResultsWrapperElement.classList.add("hidden");
  }
}

function onSearchInput() {
  let searchText = searchBoxElement.value;
  if (searchText) {
    window.sessionStorage.setItem("search-text", searchBoxElement.value);
  } else {
    window.sessionStorage.removeItem("search-text");
  }
  executeSearch();
  applySearchState();
}

function onTagClick(tag) {
  let selectedTag = window.sessionStorage.getItem("selected-tag");

  if (tag && tag !== selectedTag) {
    window.sessionStorage.setItem("selected-tag", tag);
  } else {
    window.sessionStorage.removeItem("selected-tag");
  }
  executeSearch();
  applySearchState();
}

function executeSearch() {
  let searchText = window.sessionStorage.getItem("search-text");
  let selectedTag = window.sessionStorage.getItem("selected-tag");
  let results = [];

  for (let post of posts) {
    let match = false;

    if (searchText) {
      let searchTextClean = searchText.toLowerCase();
      match = post.title.includes(searchTextClean) || post.tags.includes(searchTextClean) || post.content.includes(searchTextClean);
    }

    if (selectedTag) {
      let selectedTagClean = selectedTag.toLowerCase();
      match = post.tags.includes(selectedTagClean);
    }

    let fileItem = document.getElementById("search-panel-" + post.id);

    if (match) {
      results.push("search-panel-" + post.id);
    }
  }

  if (results.length > 0) {
    window.sessionStorage.setItem("search-results", JSON.stringify(results));
  } else {
    window.sessionStorage.removeItem("search-results");
  }
}
