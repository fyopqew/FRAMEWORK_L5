class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method, path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    if (this.endpoints[path][method]) {
      throw new Error(`${method} уже реализован по адресу ${path}`);
    }

    this.endpoints[path][method] = (req, res) => {
      const paramNames = path.split("/").filter((part) => part.startsWith(":"));
      const urlParts = req.url.split("?")[0].split("/").filter(Boolean);
      const routeParts = path.split("/").filter(Boolean);

      req.params = {};

      routeParts.forEach((part, index) => {
        if (part.startsWith(":")) {
          req.params[part.slice(1)] = urlParts[index] || null;
        }
      });

      handler(req, res);
    };
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }

  post(path, handler) {
    this.request("POST", path, handler);
  }

  put(path, handler) {
    this.request("PUT", path, handler);
  }

  patch(path, handler) {
    this.request("PATCH", path, handler);
  }

  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}

module.exports = Router;
