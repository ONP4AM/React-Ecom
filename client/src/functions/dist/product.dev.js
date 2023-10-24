"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProductsByFilter = exports.getRelated = exports.productStar = exports.getProductsCount = exports.getProducts = exports.updateProduct = exports.getProduct = exports.removeProduct = exports.getProductsByCount = exports.createProduct = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createProduct = function createProduct(product, authtoken) {
  return regeneratorRuntime.async(function createProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:8000/api/product", product, {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createProduct = createProduct;

var getProductsByCount = function getProductsByCount(count) {
  return regeneratorRuntime.async(function getProductsByCount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:8000/api/products/".concat(count)));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getProductsByCount = getProductsByCount;

var removeProduct = function removeProduct(slug, authtoken) {
  return regeneratorRuntime.async(function removeProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("http://localhost:8000/api/product/".concat(slug), {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.removeProduct = removeProduct;

var getProduct = function getProduct(slug) {
  return regeneratorRuntime.async(function getProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:8000/api/product/".concat(slug)));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getProduct = getProduct;

var updateProduct = function updateProduct(slug, product, authtoken) {
  return regeneratorRuntime.async(function updateProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].put("http://localhost:8000/api/product/".concat(slug), product, {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateProduct = updateProduct;

var getProducts = function getProducts(sort, order, page) {
  return regeneratorRuntime.async(function getProducts$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:8000/api/products", {
            sort: sort,
            order: order,
            page: page
          }));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getProducts = getProducts;

var getProductsCount = function getProductsCount() {
  return regeneratorRuntime.async(function getProductsCount$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:8000/api/products/total"));

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getProductsCount = getProductsCount;

var productStar = function productStar(productId, value, authtoken) {
  return regeneratorRuntime.async(function productStar$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].put("http://localhost:8000/api/product/value/".concat(productId), {
            value: value
          }, {
            headers: {
              authtoken: authtoken
            }
          }));

        case 2:
          return _context8.abrupt("return", _context8.sent);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.productStar = productStar;

var getRelated = function getRelated(productId) {
  return regeneratorRuntime.async(function getRelated$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:8000/api/product/related/".concat(productId), {}));

        case 2:
          return _context9.abrupt("return", _context9.sent);

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.getRelated = getRelated;

var fetchProductsByFilter = function fetchProductsByFilter(arg) {
  return regeneratorRuntime.async(function fetchProductsByFilter$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:8000/api/search/filters", arg, {}));

        case 2:
          return _context10.abrupt("return", _context10.sent);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.fetchProductsByFilter = fetchProductsByFilter;