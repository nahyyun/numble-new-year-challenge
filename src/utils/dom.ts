export const $ = (selector: string) =>
  document.querySelector(selector) as HTMLElement;

export const createDom = (tagName: string, child: Node | string) => {
  const dom = document.createElement(tagName);

  dom.append(child);

  return dom;
};
