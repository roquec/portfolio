const state = new State();

const theme = new Theme();
const menu = new Menu(state);
const focus = new Focus(state);
const resizer = new Resizer(state);
const folders = new Folders(state);
const search = new Search().init();

const contentScroll = new Scroll("content-scroll");
const explorerScroll = new Scroll("explorer-scroll");
const searchScroll = new Scroll("search-scroll");
