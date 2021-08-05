/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common-midleware/index.js":
/*!***************************************!*\
  !*** ./src/common-midleware/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var __dirname = \"src\\\\common-midleware\";\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar storage = multer.diskStorage({\n  destination: function destination(req, file, cb) {\n    cb(null, path.join(path.dirname(__dirname), \"uploads\"));\n  },\n  filename: function filename(req, file, cb) {\n    cb(null, shortid.generate() + \"-\" + file.originalname);\n  }\n});\nexports.upload = multer({\n  storage: storage\n});\n\nexports.requireSignin = function (req, res, next) {\n  if (req.headers.authorization) {\n    var token = req.headers.authorization.split(\" \")[1];\n    var user = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = user;\n    next();\n  } else {\n    res.status(400).json({\n      message: \"Authorization required\"\n    });\n  }\n};\n\nexports.userMiddleware = function (req, res, next) {\n  if (req.user.role !== \"user\") {\n    return res.status(400).json({\n      message: \"User access denied\"\n    });\n  }\n\n  next();\n};\n\nexports.adminMiddleware = function (req, res, next) {\n  if (req.user.role !== \"admin\") {\n    return res.status(400).json({\n      message: \"Admin access denied\"\n    });\n  }\n\n  next();\n};\n\n//# sourceURL=webpack://server/./src/common-midleware/index.js?");

/***/ }),

/***/ "./src/controller/address.js":
/*!***********************************!*\
  !*** ./src/controller/address.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var address = __webpack_require__(/*! ../models/address */ \"./src/models/address.js\");\n\nvar UserAddress = __webpack_require__(/*! ../models/address */ \"./src/models/address.js\");\n\nexports.addAddress = function (req, res) {\n  //return res.status(200).json({body: req.body})\n  var payload = req.body.payload;\n\n  if (payload.address) {\n    if (payload.address._id) {\n      UserAddress.findOneAndUpdate({\n        user: req.user._id,\n        \"address._id\": payload.address._id\n      }, {\n        $set: {\n          \"address.$\": payload.address\n        }\n      }).exec(function (error, address) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n\n        if (address) {\n          res.status(201).json({\n            address: address\n          });\n        }\n      });\n    } else {\n      UserAddress.findOneAndUpdate({\n        user: req.user._id\n      }, {\n        $push: {\n          address: payload.address\n        }\n      }, {\n        \"new\": true,\n        upsert: true\n      }).exec(function (error, address) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n\n        if (address) {\n          res.status(201).json({\n            address: address\n          });\n        }\n      });\n    }\n  } else {\n    res.status(400).json({\n      error: \"Params address required\"\n    });\n  }\n};\n\nexports.getAddress = function (req, res) {\n  UserAddress.findOne({\n    user: req.user._id\n  }).exec(function (error, userAddress) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (userAddress) {\n      res.status(200).json({\n        userAddress: userAddress\n      });\n    }\n  });\n};\n\n//# sourceURL=webpack://server/./src/controller/address.js?");

/***/ }),

/***/ "./src/controller/admin/auth.js":
/*!**************************************!*\
  !*** ./src/controller/admin/auth.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nvar User = __webpack_require__(/*! ../../models/user */ \"./src/models/user.js\");\n\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nexports.signup = function (req, res) {\n  User.findOne({\n    email: req.body.email\n  }).exec(function (error, user) {\n    if (user) return res.status(400).json({\n      message: \"Admin already registered\"\n    });\n    User.estimatedDocumentCount( /*#__PURE__*/function () {\n      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(err, count) {\n        var role, _req$body, firstName, lastName, email, password, hash_password, _user;\n\n        return _regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                if (!err) {\n                  _context.next = 2;\n                  break;\n                }\n\n                return _context.abrupt(\"return\", res.status(400).json({\n                  error: error\n                }));\n\n              case 2:\n                role = \"admin\";\n\n                if (count === 0) {\n                  role = \"super-admin\";\n                }\n\n                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;\n                _context.next = 7;\n                return bcrypt.hash(password, 10);\n\n              case 7:\n                hash_password = _context.sent;\n                _user = new User({\n                  firstName: firstName,\n                  lastName: lastName,\n                  email: email,\n                  hash_password: hash_password,\n                  username: shortid.generate(),\n                  role: role\n                });\n\n                _user.save(function (error, data) {\n                  if (error) {\n                    return res.status(400).json({\n                      message: \"Something went wrong\"\n                    });\n                  }\n\n                  if (data) {\n                    return res.status(201).json({\n                      message: \"Admin created Successfully..!\"\n                    });\n                  }\n                });\n\n              case 10:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      return function (_x, _x2) {\n        return _ref.apply(this, arguments);\n      };\n    }());\n  });\n};\n\nexports.signin = function (req, res) {\n  User.findOne({\n    email: req.body.email\n  }).exec( /*#__PURE__*/function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error, user) {\n      var isPassword, token, _id, firstName, lastName, email, role, fullName;\n\n      return _regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              if (!error) {\n                _context2.next = 2;\n                break;\n              }\n\n              return _context2.abrupt(\"return\", res.status(400).json({\n                error: error\n              }));\n\n            case 2:\n              if (!user) {\n                _context2.next = 16;\n                break;\n              }\n\n              _context2.next = 5;\n              return user.authenticate(req.body.password);\n\n            case 5:\n              isPassword = _context2.sent;\n\n              if (!(isPassword && (user.role === \"admin\" || user.role === \"super-admin\"))) {\n                _context2.next = 13;\n                break;\n              }\n\n              token = jwt.sign({\n                _id: user._id,\n                role: user.role\n              }, process.env.JWT_SECRET // { expiresIn: \"1d\" }\n              );\n              _id = user._id, firstName = user.firstName, lastName = user.lastName, email = user.email, role = user.role, fullName = user.fullName;\n              res.cookie(\"token\", token //  { expiresIn: \"1d\" }\n              );\n              res.status(200).json({\n                token: token,\n                user: {\n                  _id: _id,\n                  firstName: firstName,\n                  lastName: lastName,\n                  email: email,\n                  role: role,\n                  fullName: fullName\n                }\n              });\n              _context2.next = 14;\n              break;\n\n            case 13:\n              return _context2.abrupt(\"return\", res.status(400).json({\n                message: \"Invalid Password\"\n              }));\n\n            case 14:\n              _context2.next = 17;\n              break;\n\n            case 16:\n              return _context2.abrupt(\"return\", res.status(400).json({\n                message: \"Something went wrong\"\n              }));\n\n            case 17:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function (_x3, _x4) {\n      return _ref2.apply(this, arguments);\n    };\n  }());\n};\n\nexports.signout = function (req, res) {\n  res.clearCookie(\"token\");\n  res.status(200).json({\n    message: \"Signout successfully...!\"\n  });\n};\n\n//# sourceURL=webpack://server/./src/controller/admin/auth.js?");

/***/ }),

/***/ "./src/controller/admin/order.admin.js":
/*!*********************************************!*\
  !*** ./src/controller/admin/order.admin.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nvar Order = __webpack_require__(/*! ../../models/order */ \"./src/models/order.js\");\n\nexports.updateOrder = function (req, res) {\n  Order.updateOne({\n    _id: req.body.orderId,\n    \"orderStatus.type\": req.body.type\n  }, {\n    $set: {\n      \"orderStatus.$\": [{\n        type: req.body.type,\n        date: new Date(),\n        isCompleted: true\n      }]\n    }\n  }).exec(function (error, order) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (order) {\n      res.status(201).json({\n        order: order\n      });\n    }\n  });\n};\n\nexports.getCustomerOrders = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {\n    var orders;\n    return _regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Order.find({}).populate(\"items.productId\", \"name\").exec();\n\n          case 2:\n            orders = _context.sent;\n            res.status(200).json({\n              orders: orders\n            });\n\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack://server/./src/controller/admin/order.admin.js?");

/***/ }),

/***/ "./src/controller/auth.js":
/*!********************************!*\
  !*** ./src/controller/auth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nvar User = __webpack_require__(/*! ../models/user */ \"./src/models/user.js\");\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nexports.signup = function (req, res) {\n  User.findOne({\n    email: req.body.email\n  }).exec( /*#__PURE__*/function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(error, user) {\n      var _req$body, firstName, lastName, email, password, hash_password, _user;\n\n      return _regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              if (!user) {\n                _context.next = 2;\n                break;\n              }\n\n              return _context.abrupt(\"return\", res.status(400).json({\n                success: false,\n                message: \"User already registered\"\n              }));\n\n            case 2:\n              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;\n              _context.next = 5;\n              return bcrypt.hashSync(password, 10);\n\n            case 5:\n              hash_password = _context.sent;\n              _user = new User({\n                firstName: firstName,\n                lastName: lastName,\n                email: email,\n                hash_password: hash_password,\n                useName: shortid.generate()\n              });\n\n              _user.save(function (error, data) {\n                if (error) {\n                  return res.status(400).json({\n                    message: {\n                      error: error\n                    }\n                  });\n                }\n\n                if (data) {\n                  res.status(201).json({\n                    user: data\n                  });\n                }\n              });\n\n            case 8:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function (_x, _x2) {\n      return _ref.apply(this, arguments);\n    };\n  }());\n};\n\nexports.signin = function (req, res) {\n  User.findOne({\n    email: req.body.email\n  }).exec(function (error, user) {\n    if (error) return res.status(400).json({\n      message: \"Have something wrong\"\n    });\n\n    if (user) {\n      if (user.authenticate(req.body.password)) {\n        var token = jwt.sign({\n          _id: user._id,\n          role: user.role\n        }, process.env.JWT_SECRET);\n        var _id = user._id,\n            firstName = user.firstName,\n            lastName = user.lastName,\n            email = user.email,\n            role = user.role,\n            fullName = user.fullName;\n        res.cookie(\"token\", token, {\n          expiresIn: \"1h\"\n        });\n        res.status(200).json({\n          token: token,\n          user: {\n            firstName: firstName,\n            lastName: lastName,\n            email: email,\n            role: role,\n            fullName: fullName\n          }\n        });\n      } else {\n        return res.status(400).json({\n          message: \"Invalid Password\"\n        });\n      }\n    } else {\n      return res.status(400).json({\n        message: \"Something went wrong\"\n      });\n    }\n  });\n};\n\nexports.signout = function (req, res) {\n  res.clearCookie(\"token\");\n  res.status(200).json({\n    message: \"Sign out successfully\"\n  });\n};\n\n//# sourceURL=webpack://server/./src/controller/auth.js?");

/***/ }),

/***/ "./src/controller/cart.js":
/*!********************************!*\
  !*** ./src/controller/cart.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nvar Cart = __webpack_require__(/*! ../models/cart */ \"./src/models/cart.js\");\n\nfunction runUpdate(condition, updateData) {\n  return new Promise(function (resolve, reject) {\n    //you update code here\n    Cart.findOneAndUpdate(condition, updateData, {\n      upsert: true\n    }).then(function (result) {\n      return resolve();\n    })[\"catch\"](function (err) {\n      return reject(err);\n    });\n  }); // return new Promise((resolve, reject) => {\n  //   Cart.findOneAndUpdate(condition, updateData, { upsert: true })\n  //     .then((result) => {\n  //       resolve();\n  //     })\n  //     .catch((error) => {\n  //       reject(error);\n  //     });\n  // });\n}\n\nexports.addItemToCart = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {\n    var cart, product, item, condition, update, promise, _cart;\n\n    return _regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return Cart.findOne({\n              user: req.user._id\n            });\n\n          case 2:\n            cart = _context.sent;\n            _context.prev = 3;\n\n            if (cart) {\n              product = req.body.cartItems.product;\n              item = cart.cartItems.find(function (c) {\n                return c.product == product;\n              });\n              promise = [];\n\n              if (item) {\n                condition = {\n                  user: req.user._id,\n                  \"cartItems.product\": product\n                };\n                update = {\n                  $set: {\n                    cartItems: _objectSpread(_objectSpread({}, req.body.cartItems), {}, {\n                      quantity: item.quantity + req.body.cartItems.quantity\n                    })\n                  }\n                };\n              } else {\n                condition = {\n                  user: req.user._id\n                };\n                update = {\n                  $push: {\n                    cartItems: req.body.cartItems\n                  }\n                };\n              }\n\n              promise.push(runUpdate(condition, update));\n              Promise.all(promise); // .then((response) => res.status(201).json({ response }))\n              // .catch((error) => res.status(400).json({ error }));\n              // Cart.findOneAndUpdate(condition, update).exec((error, cart) => {\n              //   if (error) return res.status(400).json({ message: error });\n              //   if (cart) {\n              //     return res.status(200).json({ cart });\n              //   }\n              // });\n            } else {\n              _cart = new Cart({\n                user: req.user._id,\n                cartItems: req.body.cartItems\n              });\n\n              _cart.save(function (error, cart) {\n                if (error) return res.status(400).json({\n                  message: error\n                });\n\n                if (cart) {\n                  return res.status(200).json({\n                    cart: cart\n                  });\n                }\n              });\n            }\n\n            _context.next = 10;\n            break;\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](3);\n            return _context.abrupt(\"return\", res.status(400).json({\n              error: _context.t0\n            }));\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[3, 7]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nexports.getCartItems = function (req, res) {\n  Cart.findOne({\n    user: req.user._id\n  }).populate(\"cartItems.product\", \"_id name price productPictures\").exec(function (error, cart) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (cart) {\n      var cartItems = {};\n      cart.cartItems.forEach(function (item, index) {\n        cartItems[item.product._id] = {\n          _id: item.product._id.toString(),\n          name: item.product.name,\n          img: item.product.productPictures[0].img,\n          price: item.product.price,\n          qty: item.quantity\n        };\n      });\n      res.status(200).json({\n        cartItems: cartItems\n      });\n    }\n  }); //}\n}; // new update remove cart items\n\n\nexports.removeCartItems = function (req, res) {\n  var productId = req.body.payload.productId;\n\n  if (productId) {\n    Cart.update({\n      user: req.user._id\n    }, {\n      $pull: {\n        cartItems: {\n          product: productId\n        }\n      }\n    }).exec(function (error, result) {\n      if (error) return res.status(400).json({\n        error: error\n      });\n\n      if (result) {\n        res.status(202).json({\n          result: result\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack://server/./src/controller/cart.js?");

/***/ }),

/***/ "./src/controller/category.js":
/*!************************************!*\
  !*** ./src/controller/category.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar Category = __webpack_require__(/*! ../models/category */ \"./src/models/category.js\");\n\nvar slugify = __webpack_require__(/*! slugify */ \"slugify\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar createCategories = function createCategories(categories) {\n  var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var categoryList = [];\n  var category;\n\n  if (parentId == null) {\n    category = categories.filter(function (cat) {\n      return cat.parentId == undefined;\n    });\n  } else {\n    category = categories.filter(function (cat) {\n      return cat.parentId == parentId;\n    });\n  }\n\n  var _iterator = _createForOfIteratorHelper(category),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var cate = _step.value;\n      categoryList.push({\n        _id: cate._id,\n        name: cate.name,\n        slug: cate.slug,\n        parentId: cate.parentId,\n        type: cate.type,\n        children: createCategories(categories, cate._id)\n      });\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n\n  return categoryList;\n};\n\nexports.addCategory = function (req, res) {\n  var CategoryObj = {\n    name: req.body.name,\n    slug: \"\".concat(slugify(req.body.name), \"-\").concat(shortid.generate())\n  };\n\n  if (req.file) {\n    CategoryObj.categoryImage = process.env.APP_API + \"public/\" + req.file.filename;\n  }\n\n  if (req.body.parentId) {\n    CategoryObj.parentId = req.body.parentId;\n  }\n\n  var cat = new Category(CategoryObj);\n  cat.save(function (error, category) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (category) {\n      return res.status(201).json({\n        category: category\n      });\n    }\n  });\n};\n\nexports.getCategories = function (req, res) {\n  Category.find({}).exec(function (error, categories) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (categories) {\n      var categoryList = createCategories(categories);\n      return res.json({\n        categoryList: categoryList\n      });\n    }\n  });\n};\n\nexports.updateCategories = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {\n    var _req$body, _id, name, parentId, type, updatedCategories, category, updateCategory, _category, _updateCategory;\n\n    return _regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _req$body = req.body, _id = _req$body._id, name = _req$body.name, parentId = _req$body.parentId, type = _req$body.type;\n            updatedCategories = [];\n\n            if (!(name instanceof Array)) {\n              _context.next = 17;\n              break;\n            }\n\n            i = 0;\n\n          case 4:\n            if (!(i < name.length)) {\n              _context.next = 14;\n              break;\n            }\n\n            category = {\n              name: name[i],\n              type: type[i]\n            };\n\n            if (parentId[i] !== \"\") {\n              category.parentId = parentId[i];\n            }\n\n            _context.next = 9;\n            return Category.findByIdAndUpdate({\n              _id: _id[i]\n            }, category, {\n              \"new\": true\n            });\n\n          case 9:\n            updateCategory = _context.sent;\n            updatedCategories.push(updateCategory);\n\n          case 11:\n            i++;\n            _context.next = 4;\n            break;\n\n          case 14:\n            res.status(201).json({\n              updatedCategories: updatedCategories\n            });\n            _context.next = 24;\n            break;\n\n          case 17:\n            _category = {\n              name: name,\n              type: type\n            };\n\n            if (parentId !== \"\") {\n              _category.parentId = parentId;\n            }\n\n            _context.next = 21;\n            return Category.findByIdAndUpdate({\n              _id: _id\n            }, _category, {\n              \"new\": true\n            });\n\n          case 21:\n            _updateCategory = _context.sent;\n            updatedCategories.push(_updateCategory);\n            res.status(201).json({\n              updatedCategories: updatedCategories\n            });\n\n          case 24:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nexports.deleteCategories = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {\n    var ids, categories, _i, category;\n\n    return _regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            ids = req.body.payload.ids;\n            categories = [];\n            _i = 0;\n\n          case 3:\n            if (!(_i < ids.length)) {\n              _context2.next = 11;\n              break;\n            }\n\n            _context2.next = 6;\n            return Category.findByIdAndDelete({\n              _id: ids[_i]._id\n            });\n\n          case 6:\n            category = _context2.sent;\n            categories.push(category);\n\n          case 8:\n            _i++;\n            _context2.next = 3;\n            break;\n\n          case 11:\n            if (categories.length == ids.length) {\n              res.status(201).json({\n                message: \"Categories removed\"\n              });\n            } else {\n              res.status(400).json({\n                message: \"Something went wrong\"\n              });\n            }\n\n          case 12:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack://server/./src/controller/category.js?");

/***/ }),

/***/ "./src/controller/comment.js":
/*!***********************************!*\
  !*** ./src/controller/comment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nvar Comment = __webpack_require__(/*! ../models/comment */ \"./src/models/comment.js\");\n\nexports.addComment = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {\n    var comment, condition, cmtImg, updatedComment, productId, _req$body, star, content, updatedAt, _cmtImg, newComment;\n\n    return _regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return Comment.findOne({\n              userId: req.user._id,\n              productId: req.params.idProduct\n            });\n\n          case 3:\n            comment = _context.sent;\n\n            if (!comment) {\n              _context.next = 16;\n              break;\n            }\n\n            condition = {\n              userId: req.user._id,\n              productId: req.params.idProduct\n            };\n            cmtImg = [];\n            console.log(req, \"1\");\n\n            if (req.files.length > 0) {\n              cmtImg = req.files.map(function (file) {\n                return {\n                  img: file.filename\n                };\n              });\n            }\n\n            _context.next = 11;\n            return Comment.findOneAndUpdate(condition, {\n              $set: {\n                content: req.body.content,\n                star: req.body.star,\n                cmtImg: cmtImg\n              }\n            }, {\n              \"new\": true\n            });\n\n          case 11:\n            updatedComment = _context.sent;\n\n            if (!updatedComment) {\n              res.status(400).json({\n                err: err\n              });\n            }\n\n            return _context.abrupt(\"return\", res.status(200).json({\n              updatedComment: updatedComment\n            }));\n\n          case 16:\n            productId = req.params.idProduct;\n            _req$body = req.body, star = _req$body.star, content = _req$body.content, updatedAt = _req$body.updatedAt;\n            _cmtImg = [];\n            console.log(req.files, \"2\");\n\n            if (req.files.length > 0) {\n              _cmtImg = req.files.map(function (file) {\n                return {\n                  img: file.filename\n                };\n              });\n            }\n\n            newComment = new Comment({\n              userId: req.user._id,\n              content: content,\n              star: star,\n              cmtImg: _cmtImg,\n              productId: productId,\n              updatedAt: updatedAt\n            });\n            _context.next = 24;\n            return newComment.save(function (error, comment) {\n              if (error) return res.status(400).json({\n                message: error\n              });\n\n              if (comment) {\n                return res.status(200).json({\n                  comment: comment\n                });\n              }\n            });\n\n          case 24:\n            _context.next = 29;\n            break;\n\n          case 26:\n            _context.prev = 26;\n            _context.t0 = _context[\"catch\"](0);\n            return _context.abrupt(\"return\", res.status(400).json({\n              error: _context.t0\n            }));\n\n          case 29:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 26]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}(); // exports.updateComment = async (req, res) => {\n//   try {\n//     const comment = await Comment.findOne({\n//       userId: req.user._id,\n//       productId: req.body.productId,\n//     });\n//     console.log(comment);\n//     if (comment) {\n//       const condition = { userId: req.user._id, productId: req.body.productId };\n//       if (req.files.length > 0) {\n//         cmtImg = req.file.map((fileName) => {\n//           return {\n//             img: fileName,\n//           };\n//         });\n//       }\n//       const updatedComment = await Comment.findOneAndUpdate(\n//         condition,\n//         {\n//           $set: {\n//             content: req.body.content,\n//             star: req.body.star,\n//             cmtImg: cmtImg,\n//           },\n//         },\n//         { new: true }\n//       );\n//       if (!updatedComment) {\n//         res.status(400).json({ err });\n//       }\n//       return res.status(200).json({ updatedComment });\n//     }\n//   } catch (error) {\n//     return res.status(400).json({ error });\n//   }\n// };\n\n\nexports.getAllComments = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res) {\n    return _regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            _context2.next = 3;\n            return Comment.find({\n              productId: req.params.idProduct\n            }).exec(function (error, comment) {\n              if (error) {\n                return res.status(400).json({\n                  error: error\n                });\n              }\n\n              if (comment) {\n                return res.status(200).json({\n                  comment: comment\n                });\n              }\n            });\n\n          case 3:\n            _context2.next = 8;\n            break;\n\n          case 5:\n            _context2.prev = 5;\n            _context2.t0 = _context2[\"catch\"](0);\n            return _context2.abrupt(\"return\", res.status(400).json({\n              error: _context2.t0\n            }));\n\n          case 8:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[0, 5]]);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack://server/./src/controller/comment.js?");

/***/ }),

/***/ "./src/controller/initialData.js":
/*!***************************************!*\
  !*** ./src/controller/initialData.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar Category = __webpack_require__(/*! ../models/category */ \"./src/models/category.js\");\n\nvar Product = __webpack_require__(/*! ../models/product */ \"./src/models/product.js\");\n\nexports.initialData = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res) {\n    var createCategories, categories, products;\n    return _regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            createCategories = function createCategories(categories) {\n              var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n              var categoryList = [];\n              var category;\n\n              if (parentId == null) {\n                category = categories.filter(function (cat) {\n                  return cat.parentId == undefined;\n                });\n              } else {\n                category = categories.filter(function (cat) {\n                  return cat.parentId == parentId;\n                });\n              }\n\n              var _iterator = _createForOfIteratorHelper(category),\n                  _step;\n\n              try {\n                for (_iterator.s(); !(_step = _iterator.n()).done;) {\n                  var cate = _step.value;\n                  categoryList.push({\n                    _id: cate._id,\n                    name: cate.name,\n                    slug: cate.slug,\n                    parentId: cate.parentId,\n                    type: cate.type,\n                    children: createCategories(categories, cate._id)\n                  });\n                }\n              } catch (err) {\n                _iterator.e(err);\n              } finally {\n                _iterator.f();\n              }\n\n              return categoryList;\n            };\n\n            _context.next = 3;\n            return Category.find({}).exec();\n\n          case 3:\n            categories = _context.sent;\n            _context.next = 6;\n            return Product.find({}).select(\"_id name slug quantity description price productPictures\").populate({\n              path: \"category\",\n              select: \"_id name\"\n            }).exec();\n\n          case 6:\n            products = _context.sent;\n            res.json({\n              categories: createCategories(categories),\n              products: products\n            });\n\n          case 8:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\n//# sourceURL=webpack://server/./src/controller/initialData.js?");

/***/ }),

/***/ "./src/controller/orders.js":
/*!**********************************!*\
  !*** ./src/controller/orders.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var Orders = __webpack_require__(/*! ../models/order */ \"./src/models/order.js\");\n\nvar Cart = __webpack_require__(/*! ../models/cart */ \"./src/models/cart.js\");\n\nvar Address = __webpack_require__(/*! ../models/address */ \"./src/models/address.js\");\n\nexports.addOrder = function (req, res) {\n  Cart.deleteOne({\n    user: req.user._id\n  }).exec(function (error, result) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (result) {\n      req.body.user = req.user._id;\n      req.body.orderStatus = [{\n        type: \"ordered\",\n        date: new Date(),\n        isCompleted: true\n      }, {\n        type: \"packed\",\n        isCompleted: false\n      }, {\n        type: \"shipped\",\n        isCompleted: false\n      }, {\n        type: \"delivered\",\n        isCompleted: false\n      }];\n      var order = new Orders(req.body);\n      order.save(function (error, order) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n\n        if (order) {\n          res.status(201).json({\n            order: order\n          });\n        }\n      });\n    }\n  });\n};\n\nexports.getOrders = function (req, res) {\n  Orders.find({\n    user: req.user._id\n  }).select(\"_id paymentStatus paymentType orderStatus items\").populate(\"items.productId\", \"_id name productPictures\").exec(function (error, orders) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (orders) {\n      res.status(200).json({\n        orders: orders\n      });\n    }\n  });\n};\n\nexports.getOrder = function (req, res) {\n  Orders.findOne({\n    _id: req.body.orderId\n  }).populate(\"items.productId\", \"_id name productPictures\").lean().exec(function (error, order) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (order) {\n      Address.findOne({\n        user: req.user._id\n      }).exec(function (error, address) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n        order.address = address.address.find(function (adr) {\n          return adr._id.toString() == order.addressId.toString();\n        });\n        res.status(200).json({\n          order: order\n        });\n      });\n    }\n  });\n};\n\n//# sourceURL=webpack://server/./src/controller/orders.js?");

/***/ }),

/***/ "./src/controller/page.js":
/*!********************************!*\
  !*** ./src/controller/page.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! lodash */ \"lodash\"),\n    identity = _require.identity;\n\nvar Page = __webpack_require__(/*! ../models/page */ \"./src/models/page.js\");\n\nexports.createPage = function (req, res) {\n  var _req$files = req.files,\n      products = _req$files.products,\n      banners = _req$files.banners;\n\n  if (banners && banners.length > 0) {\n    req.body.banners = banners.map(function (banner) {\n      return {\n        img: \"\".concat(process.env.APP_API, \"public/\").concat(banner.filename),\n        navigator: \"/bannerClicked?categoryId=\".concat(req.body.category, \"&type=\").concat(req.body.type)\n      };\n    });\n  }\n\n  if (products && products.length > 0) {\n    req.body.products = products.map(function (product) {\n      return {\n        img: \"\".concat(process.env.APP_API, \"public/\").concat(product.filename),\n        navigator: \"/productClicked?categoryId=\".concat(req.body.category, \"&type=\").concat(req.body.type)\n      };\n    });\n  }\n\n  req.body.createdBy = req.user._id;\n  Page.findOne({\n    category: req.body.category\n  }).exec(function (error, page) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (page) {\n      Page.findOneAndUpdate({\n        category: req.body.category\n      }, req.body, {\n        \"new\": true\n      }).exec(function (error, updatedPage) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n\n        if (updatedPage) {\n          return res.status(201).json({\n            page: updatedPage\n          });\n        }\n      });\n    } else {\n      var _page = new Page(req.body);\n\n      _page.save(function (error, page) {\n        if (error) return res.status(400).json({\n          error: error\n        });\n\n        if (page) {\n          return res.status(201).json({\n            page: page\n          });\n        }\n      });\n    }\n  });\n};\n\nexports.getPage = function (req, res) {\n  var _req$params = req.params,\n      category = _req$params.category,\n      type = _req$params.type;\n\n  if (type === \"page\") {\n    Page.findOne({\n      category: category\n    }).exec(function (error, page) {\n      if (error) return res.status(400).json({\n        error: error\n      });\n      if (page) return res.status(200).json({\n        page: page\n      });\n    });\n  }\n};\n\n//# sourceURL=webpack://server/./src/controller/page.js?");

/***/ }),

/***/ "./src/controller/product.js":
/*!***********************************!*\
  !*** ./src/controller/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var Product = __webpack_require__(/*! ../models/product */ \"./src/models/product.js\");\n\nvar Category = __webpack_require__(/*! ../models/category */ \"./src/models/category.js\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar slugify = __webpack_require__(/*! slugify */ \"slugify\");\n\nexports.createProduct = function (req, res) {\n  console.log(req.files);\n  var _req$body = req.body,\n      name = _req$body.name,\n      price = _req$body.price,\n      description = _req$body.description,\n      category = _req$body.category,\n      quantity = _req$body.quantity;\n  var productPictures = [];\n\n  if (req.files.length > 0) {\n    productPictures = req.files.map(function (file) {\n      return {\n        img: file.filename\n      };\n    });\n  }\n\n  var product = new Product({\n    name: name,\n    slug: slugify(name),\n    price: price,\n    quantity: quantity,\n    description: description,\n    productPictures: productPictures,\n    category: category,\n    createdBy: req.user._id\n  });\n  product.save(function (error, product) {\n    if (error) return res.status(400).json({\n      error: error\n    });\n\n    if (product) {\n      res.status(201).json({\n        product: product,\n        files: req.files\n      });\n    }\n  });\n};\n\nexports.getProductsBySlug = function (req, res) {\n  var slug = req.params.slug;\n  Category.findOne({\n    slug: slug\n  }).select(\"_id\").exec(function (error, category) {\n    if (error) {\n      res.status(400).json({\n        error: error\n      });\n    }\n\n    if (category) {\n      Product.find({\n        category: category._id\n      }).exec(function (error, products) {\n        if (error) {\n          res.status(400).json({\n            error: error\n          });\n        }\n\n        if (products.length > 0) {\n          res.status(200).json({\n            products: products,\n            priceRange: {\n              under5k: 5000,\n              under10k: 10000,\n              under15k: 15000,\n              under20k: 20000,\n              under30k: 30000\n            },\n            productsByPrice: {\n              under5k: products.filter(function (product) {\n                return product.price <= 5000;\n              }),\n              under10k: products.filter(function (product) {\n                return product.price > 5000 && product.price <= 10000;\n              }),\n              under15k: products.filter(function (product) {\n                return product.price > 10000 && product.price <= 15000;\n              }),\n              under20k: products.filter(function (product) {\n                return product.price > 15000 && product.price <= 20000;\n              }),\n              under30k: products.filter(function (product) {\n                return product.price > 20000 && product.price <= 30000;\n              })\n            }\n          });\n        }\n      });\n    }\n  });\n};\n\nexports.getProductDetailById = function (req, res) {\n  var productId = req.params.productId;\n\n  if (productId) {\n    Product.findOne({\n      _id: productId\n    }).exec(function (error, product) {\n      if (error) return res.status(400).json({\n        error: error\n      });\n\n      if (product) {\n        res.status(200).json({\n          product: product\n        });\n      }\n    });\n  } else {\n    return res.status(400).json({\n      error: \"Params required\"\n    });\n  }\n};\n\n//# sourceURL=webpack://server/./src/controller/product.js?");

/***/ }),

/***/ "./src/index.server.js":
/*!*****************************!*\
  !*** ./src/index.server.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("var __dirname = \"src\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/auth */ \"./src/routes/auth.js\");\n/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_routes_auth__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _routes_admin_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/admin/auth */ \"./src/routes/admin/auth.js\");\n/* harmony import */ var _routes_admin_auth__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_routes_admin_auth__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _routes_category__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/category */ \"./src/routes/category.js\");\n/* harmony import */ var _routes_category__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_routes_category__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _routes_product__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/product */ \"./src/routes/product.js\");\n/* harmony import */ var _routes_product__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_routes_product__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _routes_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/cart */ \"./src/routes/cart.js\");\n/* harmony import */ var _routes_cart__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_routes_cart__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _routes_initialData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes/initialData */ \"./src/routes/initialData.js\");\n/* harmony import */ var _routes_initialData__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_routes_initialData__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _routes_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./routes/page */ \"./src/routes/page.js\");\n/* harmony import */ var _routes_page__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_routes_page__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _routes_address__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./routes/address */ \"./src/routes/address.js\");\n/* harmony import */ var _routes_address__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_routes_address__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _routes_orders__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./routes/orders */ \"./src/routes/orders.js\");\n/* harmony import */ var _routes_orders__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_routes_orders__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _routes_admin_order_routes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./routes/admin/order.routes */ \"./src/routes/admin/order.routes.js\");\n/* harmony import */ var _routes_admin_order_routes__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_routes_admin_order_routes__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _routes_comment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./routes/comment */ \"./src/routes/comment.js\");\n/* harmony import */ var _routes_comment__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_routes_comment__WEBPACK_IMPORTED_MODULE_16__);\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n\n\n\n\nvar isProduction = \"development\" === \"production\";\n\n\n\n\n\n\n\n\n\n\n\ndotenv__WEBPACK_IMPORTED_MODULE_1___default().config(); //mongoose connect\n\ntry {\n  mongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(\"mongodb+srv://\".concat(process.env.DB_USER, \":\").concat(process.env.DB_PASSWORD, \"@cluster0.4k7m7.mongodb.net/Cluster0?retryWrites=true&w=majority\"), {\n    useCreateIndex: true,\n    useNewUrlParser: true,\n    useUnifiedTopology: true,\n    useFindAndModify: false\n  });\n  console.log(\"MongoDB connect\");\n} catch (error) {\n  console.log(error);\n}\n\napp.use(isProduction ? morgan__WEBPACK_IMPORTED_MODULE_5___default()(\"combined\", {\n  stream: accessLogStream\n}) : morgan__WEBPACK_IMPORTED_MODULE_5___default()(\"dev\"));\napp.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\napp.use(\"/public\", express__WEBPACK_IMPORTED_MODULE_0___default().static(path__WEBPACK_IMPORTED_MODULE_4___default().join(__dirname, \"uploads\")));\napp.use(\"/api\", (_routes_auth__WEBPACK_IMPORTED_MODULE_6___default()));\napp.use(\"/api/admin\", (_routes_admin_auth__WEBPACK_IMPORTED_MODULE_7___default()));\napp.use(\"/api\", (_routes_category__WEBPACK_IMPORTED_MODULE_8___default()));\napp.use(\"/api\", (_routes_product__WEBPACK_IMPORTED_MODULE_9___default()));\napp.use(\"/api\", (_routes_cart__WEBPACK_IMPORTED_MODULE_10___default()));\napp.use(\"/api\", (_routes_initialData__WEBPACK_IMPORTED_MODULE_11___default()));\napp.use(\"/api\", (_routes_page__WEBPACK_IMPORTED_MODULE_12___default()));\napp.use(\"/api\", (_routes_address__WEBPACK_IMPORTED_MODULE_13___default()));\napp.use(\"/api\", (_routes_orders__WEBPACK_IMPORTED_MODULE_14___default()));\napp.use(\"/api\", (_routes_admin_order_routes__WEBPACK_IMPORTED_MODULE_15___default()));\napp.use(\"/api\", (_routes_comment__WEBPACK_IMPORTED_MODULE_16___default()));\napp.listen(process.env.PORT, function () {\n  return console.log(\"Server is running on port \".concat(process.env.PORT));\n});\n\n//# sourceURL=webpack://server/./src/index.server.js?");

/***/ }),

/***/ "./src/models/address.js":
/*!*******************************!*\
  !*** ./src/models/address.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\"); // C\n\n\nvar addressSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true,\n    trim: true,\n    min: 3,\n    max: 50\n  },\n  mobileNumber: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  pinCode: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  locality: {\n    type: String,\n    required: true,\n    trim: true,\n    min: 10,\n    max: 100\n  },\n  address: {\n    type: String,\n    required: true,\n    trim: true,\n    min: 10,\n    max: 100\n  },\n  cityDistrictTown: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  state: _defineProperty({\n    type: String,\n    required: true\n  }, \"required\", true),\n  landmark: {\n    type: String,\n    min: 10,\n    max: 100\n  },\n  alternatePhone: {\n    type: String\n  },\n  addressType: _defineProperty({\n    type: String,\n    required: true,\n    \"enum\": [\"home\", \"work\"]\n  }, \"required\", true)\n}); // B\n\nvar userAddressSchema = new mongoose.Schema({\n  user: {\n    type: mongoose.Schema.Types.ObjectId,\n    required: true,\n    ref: \"User\"\n  },\n  address: [addressSchema]\n}, {\n  timestamps: true\n});\nmongoose.model(\"Address\", addressSchema);\nmodule.exports = mongoose.model(\"UserAddress\", userAddressSchema);\n\n//# sourceURL=webpack://server/./src/models/address.js?");

/***/ }),

/***/ "./src/models/cart.js":
/*!****************************!*\
  !*** ./src/models/cart.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar cartSchema = new mongoose.Schema({\n  user: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"User\",\n    required: true\n  },\n  cartItems: [{\n    product: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: \"Product\",\n      require: true\n    },\n    quantity: {\n      type: Number,\n      required: true\n    },\n    price: {\n      type: Number,\n      required: true\n    }\n  }]\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Cart\", cartSchema);\n\n//# sourceURL=webpack://server/./src/models/cart.js?");

/***/ }),

/***/ "./src/models/category.js":
/*!********************************!*\
  !*** ./src/models/category.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar categorySchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  slug: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  type: {\n    type: String\n  },\n  categoryImage: {\n    type: String\n  },\n  parentId: {\n    type: String\n  } // createdBy: {\n  //   type: mongoose.Schema.Types.ObjectId,\n  //   ref: \"User\",\n  //   required: true,\n  // },\n\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Category\", categorySchema);\n\n//# sourceURL=webpack://server/./src/models/category.js?");

/***/ }),

/***/ "./src/models/comment.js":
/*!*******************************!*\
  !*** ./src/models/comment.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar commentSchema = new mongoose.Schema({\n  content: {\n    type: String,\n    required: true\n  },\n  star: {\n    type: Number,\n    required: true\n  },\n  userId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"User\"\n  },\n  productId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"Product\" // required: trues,\n\n  },\n  cmtImg: [{\n    img: {\n      type: String\n    }\n  }],\n  updatedAt: Date\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Comment\", commentSchema);\n\n//# sourceURL=webpack://server/./src/models/comment.js?");

/***/ }),

/***/ "./src/models/order.js":
/*!*****************************!*\
  !*** ./src/models/order.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\"); // A\n\n\nvar orderSchema = new mongoose.Schema({\n  user: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"User\",\n    required: true\n  },\n  addressId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"UserAddress.address\",\n    required: true\n  },\n  totalAmount: {\n    type: Number,\n    required: true\n  },\n  items: [{\n    productId: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: \"Product\"\n    },\n    payablePrice: {\n      type: Number,\n      required: true\n    },\n    purchasedQty: {\n      type: Number,\n      required: true\n    }\n  }],\n  paymentStatus: {\n    type: String,\n    \"enum\": [\"pending\", \"completed\", \"cancelled\", \"refund\"],\n    required: true\n  },\n  paymentType: {\n    type: String,\n    \"enum\": [\"cod\", \"card\"],\n    required: true\n  },\n  orderStatus: [{\n    type: {\n      type: String,\n      \"enum\": [\"ordered\", \"packed\", \"shipped\", \"delivered\"],\n      \"default\": \"ordered\"\n    },\n    date: {\n      type: Date\n    },\n    isCompleted: {\n      type: Boolean,\n      \"default\": false\n    }\n  }]\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Order\", orderSchema);\n\n//# sourceURL=webpack://server/./src/models/order.js?");

/***/ }),

/***/ "./src/models/page.js":
/*!****************************!*\
  !*** ./src/models/page.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar pageSchema = new mongoose.Schema({\n  title: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  description: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  banners: [{\n    img: {\n      type: String\n    },\n    navigateTo: {\n      type: String\n    }\n  }],\n  products: [{\n    img: {\n      type: String\n    },\n    navigateTo: {\n      type: String\n    }\n  }],\n  category: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"Category\",\n    required: true,\n    unique: true\n  },\n  createdBy: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"User\",\n    required: true\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Page\", pageSchema);\n\n//# sourceURL=webpack://server/./src/models/page.js?");

/***/ }),

/***/ "./src/models/product.js":
/*!*******************************!*\
  !*** ./src/models/product.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar productSchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  slug: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  price: {\n    type: Number,\n    required: true\n  },\n  quantity: {\n    type: Number,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  offer: {\n    type: Number\n  },\n  productPictures: [{\n    img: {\n      type: String\n    }\n  }],\n  reviews: [{\n    userId: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: \"User\"\n    },\n    review: String\n  }],\n  category: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"Category\" // required: true,\n\n  },\n  createdBy: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: \"User\",\n    required: true\n  },\n  updatedAt: Date\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Product\", productSchema);\n\n//# sourceURL=webpack://server/./src/models/product.js?");

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n\nvar _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nvar userSchema = new mongoose.Schema({\n  firstName: {\n    type: String,\n    required: true,\n    trim: true,\n    min: 3,\n    max: 20\n  },\n  lastName: {\n    type: String,\n    required: true,\n    trim: true,\n    min: 3,\n    max: 20\n  },\n  username: {\n    type: String,\n    trim: true,\n    unique: true,\n    index: true,\n    lowercase: true\n  },\n  email: {\n    type: String,\n    required: true,\n    trim: true,\n    unique: true,\n    lowercase: true\n  },\n  hash_password: {\n    type: String\n  },\n  role: {\n    type: String,\n    \"enum\": [\"user\", \"admin\", \"super-admin\"],\n    \"default\": \"admin\"\n  },\n  contactNumber: {\n    type: String\n  },\n  profilePicture: {\n    type: String\n  }\n}, {\n  timestamps: true\n});\nuserSchema.virtual(\"password\").set(function (password) {\n  this.hash_password = bcrypt.hashSync(password, 10);\n});\nuserSchema.virtual(\"fullName\").set(function () {\n  return \"\".concat(this.firstName, \" \").concat(this.lastName);\n});\nuserSchema.methods = {\n  authenticate: function () {\n    var _authenticate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(password) {\n      return _regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return bcrypt.compareSync(password, this.hash_password);\n\n            case 2:\n              return _context.abrupt(\"return\", _context.sent);\n\n            case 3:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, this);\n    }));\n\n    function authenticate(_x) {\n      return _authenticate.apply(this, arguments);\n    }\n\n    return authenticate;\n  }()\n};\nmodule.exports = mongoose.model(\"User\", userSchema);\n\n//# sourceURL=webpack://server/./src/models/user.js?");

/***/ }),

/***/ "./src/routes/address.js":
/*!*******************************!*\
  !*** ./src/routes/address.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require.requireSignin,\n    adminMiddleware = _require.adminMiddleware;\n\nvar _require2 = __webpack_require__(/*! ../controller/address */ \"./src/controller/address.js\"),\n    addAddress = _require2.addAddress,\n    getAddress = _require2.getAddress;\n\nrouter.post(\"/user/address/create\", requireSignin, adminMiddleware, addAddress);\nrouter.post(\"/user/getaddress\", requireSignin, adminMiddleware, getAddress);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/address.js?");

/***/ }),

/***/ "./src/routes/admin/auth.js":
/*!**********************************!*\
  !*** ./src/routes/admin/auth.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar _require = __webpack_require__(/*! ../../controller/admin/auth */ \"./src/controller/admin/auth.js\"),\n    signup = _require.signup,\n    signin = _require.signin;\n\nvar router = express.Router();\nrouter.post(\"/signup\", signup);\nrouter.post(\"/signin\", signin);\nrouter.post(\"/profile\", function (req, res) {\n  res.json({\n    message: \"ok\"\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/admin/auth.js?");

/***/ }),

/***/ "./src/routes/admin/order.routes.js":
/*!******************************************!*\
  !*** ./src/routes/admin/order.routes.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar _require = __webpack_require__(/*! ../../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require.requireSignin,\n    adminMiddleware = _require.adminMiddleware;\n\nvar _require2 = __webpack_require__(/*! ../../controller/admin/order.admin */ \"./src/controller/admin/order.admin.js\"),\n    updateOrder = _require2.updateOrder,\n    getCustomerOrders = _require2.getCustomerOrders;\n\nvar router = express.Router();\nrouter.post(\"/order/update\", requireSignin, adminMiddleware, updateOrder);\nrouter.post(\"/order/getCustomerOrders\", requireSignin, adminMiddleware, getCustomerOrders);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/admin/order.routes.js?");

/***/ }),

/***/ "./src/routes/auth.js":
/*!****************************!*\
  !*** ./src/routes/auth.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar _require = __webpack_require__(/*! ../controller/admin/auth */ \"./src/controller/admin/auth.js\"),\n    signup = _require.signup,\n    signin = _require.signin;\n\nvar router = express.Router();\n\nvar _require2 = __webpack_require__(/*! ../validators/auth */ \"./src/validators/auth.js\"),\n    validateSignupRequest = _require2.validateSignupRequest,\n    validateSigninRequest = _require2.validateSigninRequest,\n    isRequestValidated = _require2.isRequestValidated;\n\nvar _require3 = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require3.requireSignin;\n\nvar _require4 = __webpack_require__(/*! ../controller/auth */ \"./src/controller/auth.js\"),\n    signout = _require4.signout;\n\nrouter.post(\"/signup\", validateSignupRequest, isRequestValidated, signup);\nrouter.post(\"/signin\", validateSigninRequest, isRequestValidated, signin); // router.post(\"/profile\", (req, res) => {\n//   res.json({\n//     message: \"ok\",\n//   });\n// });\n\nrouter.post(\"/signout\", requireSignin, signout);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/auth.js?");

/***/ }),

/***/ "./src/routes/cart.js":
/*!****************************!*\
  !*** ./src/routes/cart.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../controller/cart */ \"./src/controller/cart.js\"),\n    addItemToCart = _require.addItemToCart,\n    getCartItems = _require.getCartItems,\n    removeCartItems = _require.removeCartItems;\n\nvar _require2 = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require2.requireSignin,\n    adminMiddleware = _require2.adminMiddleware;\n\nrouter.post(\"/cart/addtocart\", requireSignin, addItemToCart);\nrouter.post(\"/cart/getCartItems\", requireSignin, getCartItems);\nrouter.post(\"/cart/removeItem\", requireSignin, removeCartItems);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/cart.js?");

/***/ }),

/***/ "./src/routes/category.js":
/*!********************************!*\
  !*** ./src/routes/category.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __dirname = \"src\\\\routes\";\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../controller/category */ \"./src/controller/category.js\"),\n    addCategory = _require.addCategory,\n    getCategories = _require.getCategories,\n    updateCategories = _require.updateCategories,\n    deleteCategories = _require.deleteCategories;\n\nvar _require2 = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require2.requireSignin,\n    adminMiddleware = _require2.adminMiddleware;\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar storage = multer.diskStorage({\n  destination: function destination(req, file, cb) {\n    cb(null, path.join(path.dirname(__dirname), \"uploads\"));\n  },\n  filename: function filename(req, file, cb) {\n    cb(null, shortid.generate() + \"-\" + file.originalname);\n  }\n});\nvar upload = multer({\n  storage: storage\n});\nrouter.post(\"/category/create\", // requireSignin,\n// adminMiddleware,\nupload.single(\"categoryImage\"), addCategory);\nrouter.get(\"/category/getcategory\", // requireSignin,\n// adminMiddleware,\ngetCategories);\nrouter.post(\"/category/update\", upload.single(\"categoryImage\"), updateCategories);\nrouter.post(\"/category/delete\", deleteCategories);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/category.js?");

/***/ }),

/***/ "./src/routes/comment.js":
/*!*******************************!*\
  !*** ./src/routes/comment.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require.requireSignin,\n    adminMiddleware = _require.adminMiddleware,\n    upload = _require.upload;\n\nvar _require2 = __webpack_require__(/*! ../controller/comment */ \"./src/controller/comment.js\"),\n    getAllComments = _require2.getAllComments,\n    addComment = _require2.addComment;\n\nrouter.post(\"/comment/:idProduct\", requireSignin, upload.array(\"commentImage\"), addComment);\nrouter.post(\"/getAllComments/:idProduct\", getAllComments);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/comment.js?");

/***/ }),

/***/ "./src/routes/initialData.js":
/*!***********************************!*\
  !*** ./src/routes/initialData.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar _require = __webpack_require__(/*! ../controller/initialData */ \"./src/controller/initialData.js\"),\n    initialData = _require.initialData;\n\nvar router = express.Router();\nrouter.get(\"/initialData\", initialData);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/initialData.js?");

/***/ }),

/***/ "./src/routes/orders.js":
/*!******************************!*\
  !*** ./src/routes/orders.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require.requireSignin,\n    adminMiddleware = _require.adminMiddleware;\n\nvar _require2 = __webpack_require__(/*! ../controller/orders */ \"./src/controller/orders.js\"),\n    addOrder = _require2.addOrder,\n    getOrders = _require2.getOrders,\n    getOrder = _require2.getOrder;\n\nvar router = __webpack_require__(/*! express */ \"express\").Router();\n\nrouter.post(\"/addOrder\", requireSignin, addOrder);\nrouter.get(\"/getOrders\", requireSignin, getOrders);\nrouter.post(\"/getOrder\", requireSignin, getOrder);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/orders.js?");

/***/ }),

/***/ "./src/routes/page.js":
/*!****************************!*\
  !*** ./src/routes/page.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../controller/cart */ \"./src/controller/cart.js\"),\n    addItemToCart = _require.addItemToCart;\n\nvar _require2 = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require2.requireSignin,\n    adminMiddleware = _require2.adminMiddleware,\n    upload = _require2.upload;\n\nvar _require3 = __webpack_require__(/*! ../controller/page */ \"./src/controller/page.js\"),\n    createPage = _require3.createPage,\n    getPage = _require3.getPage;\n\nrouter.post(\"/page/create\", requireSignin, upload.fields([{\n  name: \"banners\"\n}, {\n  name: \"products\"\n}]), createPage);\nrouter.get(\"/:category/:type\", getPage);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/page.js?");

/***/ }),

/***/ "./src/routes/product.js":
/*!*******************************!*\
  !*** ./src/routes/product.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../controller/product */ \"./src/controller/product.js\"),\n    createProduct = _require.createProduct,\n    getProductsBySlug = _require.getProductsBySlug,\n    getProductDetailById = _require.getProductDetailById;\n\nvar _require2 = __webpack_require__(/*! ../common-midleware */ \"./src/common-midleware/index.js\"),\n    requireSignin = _require2.requireSignin,\n    adminMiddleware = _require2.adminMiddleware,\n    upload = _require2.upload;\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\n\nvar shortid = __webpack_require__(/*! shortid */ \"shortid\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nrouter.post(\"/product/create\", requireSignin, upload.array(\"productPicture\"), createProduct);\nrouter.get(\"/product/:slug\", getProductsBySlug);\nrouter.post(\"/product/:productId\", getProductDetailById);\nmodule.exports = router;\n\n//# sourceURL=webpack://server/./src/routes/product.js?");

/***/ }),

/***/ "./src/validators/auth.js":
/*!********************************!*\
  !*** ./src/validators/auth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! express-validator */ \"express-validator\"),\n    check = _require.check;\n\nvar _require2 = __webpack_require__(/*! express-validator */ \"express-validator\"),\n    validationResult = _require2.validationResult;\n\nexports.validateSignupRequest = [check('firstName').notEmpty().withMessage('firstName not required'), check('lastName').notEmpty().withMessage('lastName is required'), check('email').isEmail().withMessage('Email is required'), check('password').isLength({\n  min: 6\n}).withMessage('password is required')];\nexports.validateSigninRequest = [check('email').isEmail().withMessage('Email is required'), check('password').isLength({\n  min: 6\n}).withMessage('password is required')];\n\nexports.isRequestValidated = function (req, res, next) {\n  var errors = validationResult(req);\n\n  if (errors.array().length > 0) {\n    return res.status(400).json({\n      error: errors.array()[0].msg\n    });\n  }\n\n  next();\n};\n\n//# sourceURL=webpack://server/./src/validators/auth.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/asyncToGenerator");;

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/helpers/defineProperty");;

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@babel/runtime/regenerator");;

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-validator");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");;

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");;

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("multer");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("shortid");;

/***/ }),

/***/ "slugify":
/*!**************************!*\
  !*** external "slugify" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("slugify");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.server.js");
/******/ 	
/******/ })()
;