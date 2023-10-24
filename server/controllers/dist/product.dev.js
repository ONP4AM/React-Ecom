"use strict";

var Product = require('../models/product');

var User = require('../models/user');

var slugify = require('slugify');

exports.create = function _callee(req, res) {
  var newProduct;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);
          req.body.slug = slugify(req.body.title);
          _context.next = 5;
          return regeneratorRuntime.awrap(new Product(req.body).save());

        case 5:
          newProduct = _context.sent;
          res.json(newProduct);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); //res.status(400).send('Create Product fail')

          res.status(400).json({
            err: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.listAll = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = res;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find({}).limit(parseInt(req.params.count)).populate('category').populate('subs').sort({
            createdAt: -1
          }).exec());

        case 3:
          _context2.t1 = _context2.sent;

          _context2.t0.json.call(_context2.t0, _context2.t1);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}, exports.read = function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findOne({
            slug: req.params.slug
          }).populate('category').populate('subs').exec());

        case 2:
          product = _context3.sent;
          res.json(product);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.update = function _callee4(req, res) {
  var updated;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (req.body.title) {
            req.body.slug = slugify(req.body.title);
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(Product.findOneAndUpdate({
            slug: req.params.slug
          }, req.body, {
            "new": true
          }).exec());

        case 4:
          updated = _context4.sent;
          res.json(updated);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log('Product update Error ===>', err);
          res.status(400).json({
            err: err.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.remove = function _callee5(req, res) {
  var deleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findOneAndDelete({
            slug: req.params.slug
          }).exec());

        case 3:
          deleted = _context5.sent;
          res.json(deleted);
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(400).send(' Product delete failed');
          console.log(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // exports.list =async (req,res) =>{
//   try{
//         // createAt/updateAt , desc/asc ,3
//         const {sort,order ,limit} = req.body;
//         const products = await Product.find({})
//             .populate ('category')
//             .populate('subs')
//             .sort([[sort, order ]])
//             .limit(limit)
//             .exec();
//             res.json(products);
//   }catch(err){
//     console.log(err)
//   }
// }
//pagination


exports.list = function _callee6(req, res) {
  var _req$body, sort, order, page, currentPage, perPage, products;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          // createAt/updateAt , desc/asc ,3
          _req$body = req.body, sort = _req$body.sort, order = _req$body.order, page = _req$body.page;
          currentPage = page || 1;
          perPage = 3; //3

          _context6.next = 6;
          return regeneratorRuntime.awrap(Product.find({}).skip((currentPage - 1) * perPage).populate('category').populate('subs').sort([[sort, order]]).limit(perPage).exec());

        case 6:
          products = _context6.sent;
          res.json(products);
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.productsCount = function _callee7(req, res) {
  var total;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Product.find({}).estimatedDocumentCount().exec());

        case 2:
          total = _context7.sent;
          res.json(total);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.productStar = function _callee8(req, res) {
  var product, user, value, existingRatingObject, ratingAdded, ratingUpdated;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.productId).exec());

        case 2:
          product = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.user.email
          }).exec());

        case 5:
          user = _context8.sent;
          value = req.body.value;
          existingRatingObject = product.ratings.find(function (ele) {
            return ele.postedBy.toString() === user._id.toString();
          });

          if (!(existingRatingObject === undefined)) {
            _context8.next = 16;
            break;
          }

          _context8.next = 11;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(product._id, {
            $push: {
              ratings: {
                value: value,
                postedBy: user._id
              }
            }
          }, {
            "new": true
          }).exec());

        case 11:
          ratingAdded = _context8.sent;
          console.log("ratingAdded", ratingAdded);
          res.json(ratingAdded);
          _context8.next = 21;
          break;

        case 16:
          _context8.next = 18;
          return regeneratorRuntime.awrap(Product.updateOne({
            ratings: {
              $elemMatch: existingRatingObject
            }
          }, {
            $set: {
              "ratings.$.value": value
            }
          }, {
            "new": true
          }).exec());

        case 18:
          ratingUpdated = _context8.sent;
          console.log("ratingUpdated", ratingUpdated);
          res.json(ratingUpdated);

        case 21:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.listRelated = function _callee9(req, res) {
  var product, related;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Product.findById(req.params.productId).exec());

        case 2:
          product = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Product.find({
            _id: {
              $ne: product._id
            },
            category: product.category
          }).limit(3).populate('category').populate('subs').populate('postedBy').exec());

        case 5:
          related = _context9.sent;
          res.json(related);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
}; // search /Filter


var handleQuery = function handleQuery(req, res, query) {
  var products;
  return regeneratorRuntime.async(function handleQuery$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Product.find({
            $text: {
              $search: query
            }
          }).populate('category', '_id name').populate('subs', '_id name').populate('postedBy', '_id name').exec());

        case 2:
          products = _context10.sent;
          res.json(products);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.searchFilters = function _callee10(req, res) {
  var query;
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          query = req.body.query;

          if (!query) {
            _context11.next = 4;
            break;
          }

          _context11.next = 4;
          return regeneratorRuntime.awrap(handleQuery(req, res, query));

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
};