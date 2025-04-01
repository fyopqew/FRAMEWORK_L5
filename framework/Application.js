const EventEmitter = require("events");
const http = require("http");

class Framework {
  constructor() {
    this.server = this._createServer();
    this.emitter = new EventEmitter();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(req.url, req.method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunck) => {
        body += chunck;
      });

      req.on("end", () => {
        if (body) req.body = JSON.parse(body);

        this.middlewares.forEach((middleware) => middleware(req, res));

        const emitted = this.emitter.emit(
          this._getRouteMask(req.url, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

module.exports = Framework;
