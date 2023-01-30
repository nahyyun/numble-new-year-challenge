export const $ = (selector) => document.querySelector(selector);

export const createDom = (tagName, child) => {
  const dom = document.createElement(tagName);

  dom.append(child);

  return dom;
};
