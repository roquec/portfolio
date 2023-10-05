window.addEventListener("DOMContentLoaded", initializeSearch);

let posts = [];

initializeSearchData();

function initializeSearch() {
  let searchText = window.sessionStorage.getItem("search-text");
  let searchBox = document.getElementById("search-box");
  if (searchBox && searchText) {
    searchBox.value = searchText;
  }
}

function searchText() {
  let searchBox = document.getElementById("search-box");
  let searchInput = searchBox?.value ?? null;

  if (!searchInput) {
    clearSearch();
    return;
  }

  let searchWrapper = document.getElementById("search-box-wrapper");
  let tagsWrapper = document.getElementById("tags-wrapper");
  let results = document.getElementById("search-results");

  window.sessionStorage.setItem("search-text", searchBox.value);
  doSearch(searchBox.value);

  searchWrapper.classList.remove("hidden");
  tagsWrapper.classList.add("hidden");
  results.classList.remove("hidden");
}

function searchTag(tag, element) {
  if (element.classList.contains("selected")) {
    clearSearch();
    return;
  }

  window.sessionStorage.setItem("selected-tag", tag);

  let searchWrapper = document.getElementById("search-box-wrapper");
  let tagsWrapper = document.getElementById("tags-wrapper");
  let results = document.getElementById("search-results");

  element.parentNode.classList.add("selected");
  element.classList.add("selected");

  for (let post of posts) {
    let match = post.tags.includes(tag);

    let fileItem = document.getElementById("search-panel-" + post.id);

    if (match) {
      fileItem.classList.add("result");
    } else {
      fileItem.classList.remove("result");
    }
  }

  searchWrapper.classList.add("hidden");
  tagsWrapper.classList.remove("hidden");
  results.classList.remove("hidden");
}


function doSearch(searchText) {
  for (let post of posts) {

    let match = false;
    if (post.title.includes(searchText)) {
      match = true;
    }
    if (post.tags.includes(searchText)) {
      match = true;
    }
    if (post.content.includes(searchText)) {
      match = true;
    }

    let fileItem = document.getElementById("search-panel-" + post.id);

    if (match) {
      fileItem.classList.add("result");
    } else {
      fileItem.classList.remove("result");
    }
  }
}

function clearSearch() {
  window.sessionStorage.removeItem("search-text");
  window.sessionStorage.removeItem("selected-tag");

  let searchBox = document.getElementById("search-box");
  searchBox.value = "";

  let tags = document.getElementsByClassName("selected");
  for (let tag of tags) {
    tag.classList.remove("selected");
  }

  let results = document.getElementsByClassName("result");
  for (let result of results) {
    result.classList.remove("result");
  }

  let searchWrapper = document.getElementById("search-box-wrapper");
  let tagsWrapper = document.getElementById("tags-wrapper");
  let resultsWrapper = document.getElementById("search-results");
  searchWrapper.classList.remove("hidden");
  tagsWrapper.classList.remove("hidden");
  resultsWrapper.classList.add("hidden");
}

function initializeSearchData() {
  if (posts.length === 0) {
    fetch("/search.json").then(response => response.json().then(json => posts = json));
  }
}
