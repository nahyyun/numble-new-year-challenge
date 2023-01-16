import MainPage from "./pages/MainPage/index.js";
import PostWritePage from "./pages/PostWritePage/index.js";
import PostEditPage from "./pages/PostEditPage/index.js";
import PostDetailPage from "./pages/PostDetailPage/index.js";
import NotFoundPage from "./pages/NotFoundPage/index.js";
import { $ } from "./utils/dom.js";
import { getRouteRegexp } from "./utils/regexp.js";

const routes = [
  {
    path: "/",
    view: MainPage,
  },
  {
    path: "/write",
    view: PostWritePage,
  },
  {
    path: "/edit/:postId",
    view: PostEditPage,
  },
  {
    path: "/posts/:postId",
    view: PostDetailPage,
  },
  {
    path: "/notfound",
    view: NotFoundPage,
  },
];

const findMatchRoute = (UrlPath) => {
  const findResult = [];

  routes.forEach((route) => {
    const routeRegexp = getRouteRegexp(route.path);
    const matchResult = UrlPath.match(routeRegexp);

    if (matchResult) {
      findResult.push(route, matchResult);
    }
  });

  return findResult;
};

const getParams = (matchResult) => {
  const [, params] = matchResult;

  if (typeof params === "string") {
    return params;
  }
};

const render = (path) => {
  const [matchedRoute, matchResult] = findMatchRoute(path);

  if (matchedRoute) {
    const [, params] = getParams(matchResult) ?? [];

    return new matchedRoute.view({
      target: $("#app"),
      props: params ? params : null,
    });
  }

  const notFoundRoute = routes[routes.length - 1];
  new notFoundRoute.view({ target: $("#app") });
};

export const navigate = (path) => {
  history.pushState(null, null, `${path}`);
  render(location.pathname);
};

window.onpopstate = () => {
  render(location.pathname);
};
