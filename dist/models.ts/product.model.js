"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(data) {
        this.id = data.id;
        this.title = data.title;
        this.image = data.image;
        this.price = data.price;
        this.user_id = data.user_id;
    }
    return Product;
}());
exports.Product = Product;
