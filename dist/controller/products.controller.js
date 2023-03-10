"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var db_1 = require("../utils/db");
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    // development endpoint 
    ProductController.prototype.listAllProducst = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var db, products, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, db_1.connect)()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.query("SELECT * FROM products")];
                    case 2:
                        products = _a.sent();
                        res.status(200).send(products[0]);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.status(500).json({ message: "Error listing all products" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, _a, id, title, image, price, db, checkQuery, product, updateQuery, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        user_id = req.user.id;
                        _a = req.body, id = _a.id, title = _a.title, image = _a.image, price = _a.price;
                        return [4 /*yield*/, (0, db_1.connect)()];
                    case 1:
                        db = _b.sent();
                        checkQuery = "SELECT * FROM products WHERE id = ? ";
                        return [4 /*yield*/, db.query(checkQuery, [id])];
                    case 2:
                        product = (_b.sent());
                        if (!Array.isArray(product) || product[0].length === 0) {
                            return [2 /*return*/, res.status(404).send("Product not found")];
                        }
                        if (product[0][0].user_id != user_id) {
                            return [2 /*return*/, res.status(401).send("Not allowed to update this product")];
                        }
                        updateQuery = "UPDATE products SET title = ?, image = ?, price = ? WHERE id = ?";
                        return [4 /*yield*/, db.query(updateQuery, [
                                title || product[0][0].title,
                                image || product[0][0].image,
                                price || product[0][0].price,
                                id,
                            ])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.send("Product updated")];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).send(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.removeProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, id, db, checkQuery, product, removeQuery, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        user_id = req.user.id;
                        id = req.body.id;
                        return [4 /*yield*/, (0, db_1.connect)()];
                    case 1:
                        db = _a.sent();
                        checkQuery = "SELECT * FROM products WHERE id = ? ";
                        return [4 /*yield*/, db.query(checkQuery, [id])];
                    case 2:
                        product = (_a.sent());
                        if (!Array.isArray(product) || product[0].length === 0) {
                            return [2 /*return*/, res.status(404).send("Product not found")];
                        }
                        if (product[0][0].user_id != user_id) {
                            return [2 /*return*/, res.status(401).send("Not allowed to delete this product")];
                        }
                        removeQuery = "DELETE FROM products WHERE id = ?";
                        return [4 /*yield*/, db.query(removeQuery, [id])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.send("Product Deleted")];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(500).send(error_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
