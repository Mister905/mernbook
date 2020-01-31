const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/auth/**", { target: "http://localhost:5000" }));
  app.use(proxy("/profiles/active", { target: "http://localhost:5000" }));
  app.use(proxy("/profiles/update", { target: "http://localhost:5000" }));
  app.use(proxy("/experience/**", { target: "http://localhost:5000" }));
  app.use(proxy("/education/**", { target: "http://localhost:5000" }));
};
