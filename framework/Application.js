const EventEmitter = require("events");
const http = require("http");
const url = require("url");
const Router = require("./Router.js");

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
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), async (req, res) => {
          try {
            for (const middleware of this.middlewares) {
              await new Promise((resolve) => middleware(req, res, resolve));
            }
            endpoint[method](req, res);
          } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
          }
        });
      });
    });
  }

  get(path, handler) {
    const r = new Router();
    r.get(path, handler);
    this.addRouter(r);
  }

  post(path, handler) {
    const r = new Router();
    r.post(path, handler);
    this.addRouter(r);
  }

  put(path, handler) {
    const r = new Router();
    r.put(path, handler);
    this.addRouter(r);
  }

  patch(path, handler) {
    const r = new Router();
    r.patch(path, handler);
    this.addRouter(r);
  }

  delete(path, handler) {
    const r = new Router();
    r.delete(path, handler);
    this.addRouter(r);
  }

  _createServer() {
    return http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      req.query = parsedUrl.query;
      req.params = {};

      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          req.body = body ? JSON.parse(body) : {};
        } catch {
          req.body = {};
        }

        this._extendResponse(res);

        let emitted = false;

        for (const eventName of this.emitter.eventNames()) {
          const [registeredPath, registeredMethod] = eventName
            .slice(1, -1)
            .split("]:[");

          if (req.method !== registeredMethod) continue;

          const paramNames = registeredPath.split("/");
          const urlParts = parsedUrl.pathname.split("/");

          if (paramNames.length !== urlParts.length) continue;

          let match = true;
          const params = {};

          for (let i = 0; i < paramNames.length; i++) {
            if (paramNames[i].startsWith(":")) {
              params[paramNames[i].slice(1)] = urlParts[i];
            } else if (paramNames[i] !== urlParts[i]) {
              match = false;
              break;
            }
          }

          if (match) {
            req.params = params;
            this.emitter.emit(eventName, req, res);
            emitted = true;
            break;
          }
        }

        if (!emitted) {
          res.status(404).json({ error: "Not found" });
        }
      });
    });
  }

  _extendResponse(res) {
    res.send = (data) => res.end(data);
    res.json = (data) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    };
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

module.exports = Framework;
