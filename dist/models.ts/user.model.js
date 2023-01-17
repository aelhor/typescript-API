"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(data) {
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.password = data.password;
    }
    return User;
}());
exports.User = User;
