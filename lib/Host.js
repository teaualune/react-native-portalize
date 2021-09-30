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
const react_native_1 = require("react-native");
const useKey_1 = require("./hooks/useKey");
const Manager_1 = require("./Manager");
exports.Context = React.createContext(null);
exports.Host = ({ children, style }) => {
    const managerRef = React.useRef(null);
    const queueRef = React.useRef([]);
    const { generateKey, removeKey } = useKey_1.useKey();
    React.useEffect(() => {
        var _a, _b, _c, _d, _e;
        while (((_a = queueRef.current) === null || _a === void 0 ? void 0 : _a.length) && managerRef.current) {
            const action = (_b = queueRef.current) === null || _b === void 0 ? void 0 : _b.pop();
            if (action) {
                switch (action.type) {
                    case 'mount':
                        (_c = managerRef.current) === null || _c === void 0 ? void 0 : _c.mount(action.key, action.node);
                        break;
                    case 'update':
                        (_d = managerRef.current) === null || _d === void 0 ? void 0 : _d.update(action.key, action.node);
                        break;
                    case 'unmount':
                        (_e = managerRef.current) === null || _e === void 0 ? void 0 : _e.unmount(action.key);
                        break;
                }
            }
        }
    }, []);
    const mount = (node) => {
        var _a;
        const key = generateKey();
        if (managerRef.current) {
            managerRef.current.mount(key, children);
        }
        else {
            (_a = queueRef.current) === null || _a === void 0 ? void 0 : _a.push({ type: 'mount', key, node });
        }
        return key;
    };
    const update = (key, node) => {
        var _a, _b;
        if (managerRef.current) {
            managerRef.current.update(key, node);
        }
        else if (queueRef.current) {
            const op = { type: 'mount', key, node };
            const index = (_b = (_a = queueRef.current) === null || _a === void 0 ? void 0 : _a.findIndex(o => o.type === 'mount' || (o.type === 'update' && o.key === key))) !== null && _b !== void 0 ? _b : -1;
            if (index > -1) {
                queueRef.current[index] = op;
            }
            else {
                queueRef.current.push(op);
            }
        }
    };
    const unmount = (key) => {
        var _a;
        if (managerRef.current) {
            managerRef.current.unmount(key);
            removeKey(key);
        }
        else {
            (_a = queueRef.current) === null || _a === void 0 ? void 0 : _a.push({ type: 'unmount', key });
        }
    };
    return (React.createElement(exports.Context.Provider, { value: { mount, update, unmount } },
        React.createElement(react_native_1.View, { style: [{ flex: 1 }, style], collapsable: false, pointerEvents: "box-none" }, children),
        React.createElement(Manager_1.Manager, { ref: managerRef })));
};
