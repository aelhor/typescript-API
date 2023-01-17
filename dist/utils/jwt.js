"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT = /** @class */ (function () {
    function JWT() {
    }
    //   private secret: string;
    //   constructor(secret: string) {
    //     this.secret = secret;
    //   }
    JWT.prototype.generateToken = function (payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
    };
    JWT.prototype.verifyToken = function (token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    };
    return JWT;
}());
exports.JWT = JWT;
