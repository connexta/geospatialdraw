"use strict";
/** @internal */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Map_1 = __importDefault(require("ol/Map"));
var View_1 = __importDefault(require("ol/View"));
var Tile_1 = __importDefault(require("ol/layer/Tile"));
var OSM_1 = __importDefault(require("ol/source/OSM"));
var styled_components_1 = __importDefault(require("styled-components"));
var Root = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  padding: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  padding: 0;\n"])));
var MapContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  margin: 0;\n  padding: 0;\n"], ["\n  display: flex;\n  margin: 0;\n  padding: 0;\n"])));
var MapDiv = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 900px;\n  height: 500px;\n"], ["\n  width: 900px;\n  height: 500px;\n"])));
var renderChildren = function (children, map) {
    return React.Children.map(children, function (child) {
        // @ts-ignore (`yarn test` doesn't like this)
        return React.isValidElement(child) ? React.cloneElement(child, { map: map }) : null;
    });
};
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        _this.setMapDiv = function (element) {
            _this.mapDivElement = element || document.createElement('div');
        };
        _this.state = {
            map: null,
        };
        return _this;
    }
    Map.prototype.componentDidMount = function () {
        var map = new Map_1.default({
            layers: [
                new Tile_1.default({
                    source: new OSM_1.default(),
                }),
            ],
            target: this.mapDivElement,
            view: new View_1.default({
                center: [0, 0],
                zoom: 2,
                projection: this.props.projection,
                rotation: 0,
            }),
        });
        this.mapDivElement
            .querySelectorAll('.ol-overlaycontainer-stopevent, .ol-overlaycontainer')
            .forEach(function (el) { return (el.style.display = 'none'); });
        this.setState({ map: map });
    };
    Map.prototype.render = function () {
        var map = this.state.map;
        var children = this.props.children;
        return (React.createElement(Root, null,
            map === null ? null : renderChildren(children, map),
            React.createElement(MapContainer, null,
                React.createElement(MapDiv, { ref: this.setMapDiv, className: "map" }))));
    };
    return Map;
}(React.Component));
exports.default = Map;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=map.js.map