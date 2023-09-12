"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_1 = __importDefault(require("postgres"));
dotenv_1.default.config();
// db.js
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
console.log(URL);
exports.sql = (0, postgres_1.default)(URL, { ssl: 'require' });
