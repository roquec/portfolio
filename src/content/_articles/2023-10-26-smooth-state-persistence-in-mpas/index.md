---
title: Achieving Smooth SPA-Like State Persistence in Multi-Page Applications
tags: [ javascript, front-end ]
date: 2023-10-26
---

Modern web design aims for seamless, swift user experiences reminiscent of native applications. While Single Page Applications (SPAs) cater to this, what if we could mirror this behavior in the simpler and scalable Multi-Page Applications (MPAs)? This article delves into a method to achieve such smooth navigation in MPAs.

You can see a working example of this technique in [roquec.com](https://roquec.com). The frame around the content (menu, tabs...) maintains its state while the content changes with navigation.

<video width="100%" preload="auto" muted autoplay loop>
    <source src="state.webm" type="video/webm"/>
</video>

## Context

### What is SPA?
A Single Page Application (SPA) dynamically rewrites its current content instead of loading new pages, providing a fluid and faster experience. Read more about SPAs [here](https://developer.mozilla.org/en-US/docs/Glossary/SPA).

### Why Choose MPA?
Despite the appeal of SPAs, many developers still opt for MPAs because of their simpler architecture, scalability, and easier SEO management. Additionally, MPAs don't require heavy frameworks or extensive client-side scripting.

## Challenge

Let's imagine we want to create a website with a side menu that can be open or closed. This is controlled by a class that gets added to the menu element. We want the state of that panel to stay consistent through page navigations. Let's review some options:

### Naive implementation
A straightforward approach might involve storing the state in localStorage. Then, when the next page loads (at the DOM ready event), we retrieve the state and adjust the menu. However, this can cause flickering since the browser initially renders the default state before we apply our changes.

<video width="100%" preload="auto" muted autoplay loop>
    <source src="flicker.webm" type="video/webm"/>
</video>

### Apply state earlier
While we might think about applying the state changes as soon as possible, this would mean acting before the full DOM has loaded. As a result, our desired element (like the menu) might not yet be accessible, leaving us with no way to add our class to it.

### Styles instead of DOM changes
We could inject style rules in the `head` or apply them to the `html` before the DOM loads allowing us to prepare styles depending on the state of the elements beforehand. This approach does indeed work but has some serious limitations. 

First of all now we cannot just add our class to the element and rely on our css, we need custom style rules to be added via javascript to override the normal css (probably need `!important`). This means duplication of the css and bad maintainability. Secondly this solution is limited to what CSS can do, for example we can't make changes to the inner text of an element. All in all this approach is hacky and not reliable enough for us.


## Solution
So if we can't apply the state changes before the DOM loads or after the DOM is ready, what can we do?
The solution I propose is to leverage the power of `MutationObserver` to apply our state as soon as the elements we are interested in are added to the DOM. This approach allows for instantaneous updates without waiting for the entire DOM to be ready, eliminating flicker and creating a smooth transition.

The process would look like this:

### 1. Initialization
As soon as your JavaScript runs in the head (even before the full DOM loads), initialize the `MutationObserver`.
```javascript
const config = {attributes: false, childList: true, subtree: true};
const observer = new MutationObserver(callback);
observer.observe(document.documentElement, config);
```
* The `config` specifies what our `MutationObserver` is checking for, in our case we are interested in changes in the whole subtree.
* We create the `MutationObserver` with a reference to our `callback` function where we'll handle the changes to the elements.
* Finally, we start observing for changes by calling the `observe` method.

### 2. Observation
Look for the elements we are interested in withing the `callback` function of the `MutationObserver`.
```javascript
function callback(mutationList, observer) {
  for (const mutation of mutationList) {
    for (const addedNode of mutation.addedNodes) {
      if(addedNode.id === "menu-panel"){
        applyMenuPanelState(addedNode);
      }
    }
  }
};
```
* This is our callback function, the `MutationObserver` will call it for every single element that is added to the DOM.
* In our case we are interested in our menu panel element, we check for it with `addedNode.id === "menu-panel"`.
* We then call our `applyMenuPanelState` function to set the state of the menu panel element.

### 3. Apply state
Read the state of the element from storage and make any necessary modifications to it.
```javascript
function applyMenuPanelState(element) {
  const state = localStorage.getItem("menu-panel-state");
  if(state === "closed"){
    element.classList.add("closed");
  }
};
```
* This function sets the state of our menu panel element depending on the stored state.
* First we read the state from `localStorage`.
* Then we apply the state, in this case if the panel is supposed to be closed we add the `closed` class to it.


### 4. Cleanup
After the DOM is ready, you can opt to stop the observation, ensuring that the observer doesn't unnecessarily consume resources.
```javascript
observer.disconnect();
```
* The call to `disconnect` makes the observer stop the notifications on DOM changes.

### Next steps

A more involved implementation of this solution can be found [here](https://github.com/roquec/portfolio/blob/main/src/_js/modules/state.js). In this case any js module can register rules to set the initial state of elements and the management of the `MutationObserver` is encapsulated in a `State` class. For example:
```javascript
stateManager.setStateById(
  Resizer.RESIZER_TARGET_ID,
  (element) => element.style.width = width
)
```
* The function `setStateById` encapsulates the same solution we implemented previously but in a more reusable and maintainable way.
* `Resizer.RESIZER_TARGET_ID` is the ID of the element we are interested in.
* `(element) => element.style.width = width` is the callback where we apply the state to the element.

## Conclusion
Utilizing the `MutationObserver` offers a straightforward solution to a nuanced problem. It bridges the gap between the fluidity of SPAs and the architectural simplicity of MPAs. Experiment with the `MutationObserver` to enhance your MPA's user experience. If you've tried this at a larger scale or have improvements, I'd love to hear about your findings.

 Have fun with your smooth stateful MPAs!


## References
* [MutationObserver documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
* [SPA definition](https://developer.mozilla.org/en-US/docs/Glossary/SPA)
