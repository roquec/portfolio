/**
 * The Scroll class provides a customizable scrollbar implementation for a designated container.
 * It enables dynamic thumb resizing and positioning based on content size and user interactions,
 * allowing for smooth scrolling, thumb dragging, and scroll wheel support.
 */
class Scroll {

  static SCROLL_THUMB_ACTIVE_CLASS = "active";

  #targetId = null;
  #container = null;
  #content = null;
  #thumb = null;

  #resizeObserver = new ResizeObserver(() => this.#applyState());
  #thumbClickListener;
  #thumbDragListener;
  #thumbReleaseListener;
  #contentScrollListener;
  #thumbWheelListener;

  constructor(targetId) {
    this.#targetId = targetId;
  }

  init() {
    Util.onDomLoaded(() => this.#onDomReady());
    return this;
  }

  #onDomReady() {
    this.#container = document.getElementById(this.#targetId);
    this.#content = this.#container.children[0];
    this.#thumb = this.#container.children[1];
    this.start();
    this.#applyState();
  }

  start() {
    this.#resizeObserver.observe(this.#content);
    for (const child of this.#content.children) {
      this.#resizeObserver.observe(child);
    }
    this.#thumbClickListener = (event) => this.#onThumbClick(event);
    this.#thumb.addEventListener("mousedown", this.#thumbClickListener);
    this.#contentScrollListener = () => this.#applyState();
    this.#content.addEventListener("scroll", this.#contentScrollListener);
    this.#thumbWheelListener = (event) => this.#onThumbWheel(event);
    this.#thumb.addEventListener("wheel", this.#thumbWheelListener);
  }

  stop() {
    this.#resizeObserver.unobserve(this.#content);
    this.#thumb.removeEventListener("mousedown", this.#thumbClickListener);
    document.removeEventListener("mousemove", this.#thumbDragListener);
    document.removeEventListener("mouseup", this.#thumbReleaseListener);
    this.#content.removeEventListener("scroll", this.#contentScrollListener);
    this.#thumb.removeEventListener("wheel", this.#thumbWheelListener);
  }

  #applyState() {
    const scrollRatio = this.#content.clientHeight / this.#content.scrollHeight;

    if (scrollRatio >= 1) {
      this.#thumb.style.display = "none";
      this.#thumb.style.height = "100%";
      this.#thumb.style.top = "0";
    } else {
      const scrolledRatio = this.#content.scrollTop / this.#content.scrollHeight;
      this.#thumb.style.display = "block";
      this.#thumb.style.height = scrollRatio * 100 + "%";
      this.#thumb.style.top = scrolledRatio * 100 + "%";
    }
  }

  #onThumbClick(event) {
    this.#thumbDragListener = (event) => this.#onScrollThumbDrag(event);
    document.addEventListener("mousemove", this.#thumbDragListener);
    this.#thumbReleaseListener = () => this.#onScrollThumbRelease();
    document.addEventListener("mouseup", this.#thumbReleaseListener);

    this.thumbClickOffsetY = event.offsetY;
    this.#thumb.classList.add(Scroll.SCROLL_THUMB_ACTIVE_CLASS);

    Util.pauseEvent(event);
  }

  #onScrollThumbDrag(event) {
    const containerBounds = this.#container.getBoundingClientRect();

    const containerTopOffsetY = event.clientY - containerBounds.top;
    const thumbScroll = containerTopOffsetY - this.thumbClickOffsetY;

    let scrollRatio = thumbScroll / (containerBounds.height - this.#thumb.offsetHeight);
    scrollRatio = Math.min(1, Math.max(0, scrollRatio));

    const scrollDistance = this.#content.scrollHeight - this.#content.clientHeight;

    this.#content.scrollTo(0, scrollDistance * scrollRatio);
    Util.pauseEvent(event);
  }

  #onScrollThumbRelease() {
    document.removeEventListener("mousemove", this.#thumbDragListener);
    document.removeEventListener("mouseup", this.#thumbReleaseListener);
    this.#thumb.classList.remove(Scroll.SCROLL_THUMB_ACTIVE_CLASS);
  }

  #onThumbWheel(event) {
    const newScrollDistance = this.#content.scrollTop - event.deltaY;
    this.#content.scrollTo(0, newScrollDistance);
  }
}
