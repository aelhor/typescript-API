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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var db_1 = require("../utils/db");
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_model_1 = require("../models.ts/user.model");
var jwt_1 = require("../utils/jwt");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var db, email, password, sqlQuery, rows, user, match, jwt, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!req.body.email || !req.body.password) {
                            return [2 /*return*/, res.status(400).send("Email and Password are Required")];
                        }
                        return [4 /*yield*/, (0, db_1.connect)()];
                    case 1:
                        db = _a.sent();
                        email = req.body.email;
                        password = req.body.password;
                        sqlQuery = "SELECT * FROM users WHERE email = ?";
                        return [4 /*yield*/, db.query(sqlQuery, [email])];
                    case 2:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, res.status(401).send("Invalid Email or password")];
                        }
                        user = new user_model_1.User(rows[0]);
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 3:
                        match = _a.sent();
                        if (!match) {
                            return [2 /*return*/, res.status(401).send("Invalid password")];
                        }
                        jwt = new jwt_1.JWT();
                        token = jwt.generateToken({ id: user.id, email: user.email });
                        return [2 /*return*/, res.status(200).json({ email: user.email, token: token })];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(500).json(err_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var db, _a, email, password, name_1, sqlQuery, rows, hashedPassword, insertQuery, createdUser, user, jwt, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if (!req.body.email || !req.body.password || !req.body.name) {
                            return [2 /*return*/, res.status(400).send("Name, Email and Password are Required")];
                        }
                        return [4 /*yield*/, (0, db_1.connect)()];
                    case 1:
                        db = _b.sent();
                        _a = req.body, email = _a.email, password = _a.password, name_1 = _a.name;
                        sqlQuery = "SELECT * FROM users WHERE email = ?";
                        return [4 /*yield*/, db.query(sqlQuery, [email])];
                    case 2:
                        rows = (_b.sent())[0];
                        if (rows.length !== 0) {
                            return [2 /*return*/, res.status(401).send("Email aleady exist")];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        hashedPassword = _b.sent();
                        insertQuery = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
                        // insert the user 
                        return [4 /*yield*/, db.query(insertQuery, [name_1, email, hashedPassword])];
                    case 4:
                        // insert the user 
                        _b.sent();
                        return [4 /*yield*/, db.query("SELECT * FROM users WHERE email = ?", [email])];
                    case 5:
                        createdUser = _b.sent();
                        user = new user_model_1.User(createdUser[0]);
                        jwt = new jwt_1.JWT();
                        token = jwt.generateToken({ id: user.id, email: user.email });
                        return [2 /*return*/, res.status(201).send({ message: "User created", token: token })];
                    case 6:
                        err_2 = _b.sent();
                        console.log(err_2);
                        return [2 /*return*/, res.status(500).json(err_2)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
