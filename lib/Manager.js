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
exports.Manager = React.forwardRef((_, ref) => {
    const [portals, setPortals] = React.useState([]);
    React.useImperativeHandle(ref, () => ({
        mount(key, node) {
            setPortals(prev => {
                const newPortals = [...prev, { key, node }].sort((p1, p2) => { var _a, _b; return ((_a = p1.node.order) !== null && _a !== void 0 ? _a : 0) - ((_b = p2.node.order) !== null && _b !== void 0 ? _b : 0); });
                return newPortals;
            });
        },
        update(key, node) {
            setPortals(prev => prev.map(item => {
                if (item.key === key) {
                    return Object.assign(Object.assign({}, item), { node });
                }
                return item;
            }));
        },
        unmount(key) {
            setPortals(prev => prev.filter(item => item.key !== key));
        },
    }));
    return portals.map(({ key, node }, index) => (React.createElement(react_native_1.View, { key: `react-native-portalize-${key}-${index}`, collapsable: false, pointerEvents: "box-none", style: react_native_1.StyleSheet.absoluteFill }, node.children)));
});
