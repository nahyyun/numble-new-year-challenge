import MainPage from "./pages/MainPage/index.js";
import PostWritePage from "./pages/PostWritePage/index.js";
import PostEditPage from "./pages/PostEditPage/index.js";
import PostDetailPage from "./pages/PostDetailPage/index.js";
import NotFoundPage from "./pages/NotFoundPage/index.js";
import { $ } from "./utils/dom.js";

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
    path: "/:postId",
    view: PostDetailPage,
  },
  {
    path: "/notfound",
    view: NotFoundPage,
  },
];

const findMatchRoute = (path) => {
  return routes.find((route) => route.path === path);
};

const render = (path) => {
  const match = findMatchRoute(path);

  if (match) {
    return new match.view({ target: $("#app") });
  }

  const notFoundRoute = routes[routes.length - 1];
  new notFoundRoute.view({ target: $("#app") });
};

export const navigate = (path) => {
  history.pushState(null, null, `${path}`);
  render(path);
};

window.onpopstate = () => {
  render(location.pathname);
};
