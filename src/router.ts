import MainPage from "./pages/MainPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { $ } from "./utils/dom";
import { getRouteRegexp } from "./utils/regexp";

interface Route {
  path: string;
  view: any;
}

const routes: Route[] = [
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
    path: "/post/:postId",
    view: PostDetailPage,
  },
  {
    path: "/notfound",
    view: NotFoundPage,
  },
];

const findMatchRoute = (urlPath: string): [Route, RegExpMatchArray] | null => {
  let findResult: [Route, RegExpMatchArray] | null = null;

  routes.forEach((route) => {
    const routeRegexp = getRouteRegexp(route.path);
    const matchedPatternResult = urlPath.match(routeRegexp);

    if (matchedPatternResult) {
      findResult = [route, matchedPatternResult];
    }
  });

  return findResult;
};

const getParams = (matchedPatternResult: RegExpMatchArray) => {
  const [, params] = matchedPatternResult;

  if (typeof params === "string") {
    return params;
  }
};

const render = (path: string) => {
  const findMatchRouteResult = findMatchRoute(path);

  if (!findMatchRouteResult) {
    const notFoundRoute = routes[routes.length - 1];

    return new notFoundRoute.view({ target: $("#app") });
  }

  const [matchedRoute, matchedPatternResult] = findMatchRouteResult;
  const params = getParams(matchedPatternResult) ?? null;

  return new matchedRoute.view({
    target: $("#app"),
    params,
  });
};

export const navigate = (path: string, state?: any) => {
  history.pushState(state, "", `${path}`);
  render(path);
};

window.onpopstate = () => {
  render(location.pathname);
};
