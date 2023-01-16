export const getRouteRegexp = (path) => {
  return new RegExp(
    "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(\\w+)") + "$"
  );
};
