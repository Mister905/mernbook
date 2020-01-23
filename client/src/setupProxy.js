const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/auth/**", { target: "http://localhost:5000" }));
  app.use(proxy("/stripe/**", { target: "http://localhost:5000" }));
  app.use(proxy("/surveys/create", { target: "http://localhost:5000" }));
  app.use(proxy("/surveys/webhook", { target: "http://localhost:5000" }));
  app.use(proxy("/surveys/response/**", { target: "http://localhost:5000" }));
  app.use(proxy("/surveys", { target: "http://localhost:5000" }));
};
