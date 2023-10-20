const state = new State();

const config = new Config();
const theme = new Theme();
const menu = new Menu(state);
const focus = new Focus(state);
const resizer = new Resizer(state);
const folders = new Folders(state);
const search = new Search(state);

new Scroll("content-scroll");
new Scroll("explorer-scroll");
new Scroll("search-scroll");


function openTag(tag) {
  search.searchTag(tag);
  menu.open(Menu.SEARCH_PANEL_ID);
}


