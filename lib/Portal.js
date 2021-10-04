"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Consumer_1 = require("./Consumer");
const Host_1 = require("./Host");
exports.Portal = (props) => (React.createElement(Host_1.Context.Consumer, null, (manager) => (React.createElement(Consumer_1.Consumer, { manager: manager, order: props.order }, props.children))));