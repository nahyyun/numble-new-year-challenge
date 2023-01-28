export const $ = (selector) => document.querySelector(selector);

export const createDom = (tagName, attribute, child) => {
  const dom = document.createElement(tagName, attribute);

  dom.append(child);

  return dom;
};
