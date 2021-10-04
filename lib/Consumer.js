"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
exports.Consumer = (props) => {
    const { manager } = props, node = __rest(props, ["manager"]);
    const key = React.useRef(undefined);
    const checkManager = () => {
        if (!manager) {
            throw new Error('No portal manager defined');
        }
    };
    const handleInit = () => {
        checkManager();
        key.current = manager === null || manager === void 0 ? void 0 : manager.mount(node);
    };
    React.useEffect(() => {
        checkManager();
        manager === null || manager === void 0 ? void 0 : manager.update(key.current, node);
    }, [manager, node]);
    React.useEffect(() => {
        handleInit();
        return () => {
            checkManager();
            manager === null || manager === void 0 ? void 0 : manager.unmount(key.current);
        };
    }, []);
    return null;
};
