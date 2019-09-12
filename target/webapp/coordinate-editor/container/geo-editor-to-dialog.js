"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var units_1 = require("../units");
var geometry_1 = require("../../geometry");
var coordinate_editor_dialog_1 = require("../presentation/coordinate-editor-dialog");
var _ = require("lodash");
var geoEditorToDialog = function (GeoEditor, defaultShape, finalizeGeo) {
    var GeoEditorDialog = /** @class */ (function (_super) {
        __extends(GeoEditorDialog, _super);
        function GeoEditorDialog(props) {
            var _this = _super.call(this, props) || this;
            _this.onOk = function () { return _this.props.onOk(finalizeGeo(_this.state.geo)); };
            _this.onUpdateGeo = function (geo) {
                _this.setState({ geo: geo });
            };
            _this.state = {
                coordinateUnit: units_1.LAT_LON,
                geo: _this.defaultGeo(),
            };
            return _this;
        }
        GeoEditorDialog.prototype.defaultGeo = function () {
            return geometry_1.makeEmptyGeometry('', defaultShape);
        };
        GeoEditorDialog.prototype.componentDidMount = function () {
            var geo = _.cloneDeep(this.props.geo || this.defaultGeo());
            this.setState({ geo: geo });
        };
        GeoEditorDialog.prototype.componentDidUpdate = function (prevProps) {
            if (!_.isEqual(prevProps.geo, this.props.geo)) {
                this.setState({ geo: _.cloneDeep(this.props.geo) });
            }
        };
        GeoEditorDialog.prototype.render = function () {
            var _this = this;
            var _a = this.state, coordinateUnit = _a.coordinateUnit, geo = _a.geo;
            return (React.createElement(coordinate_editor_dialog_1.default, { onOk: this.onOk, setUnit: function (coordinateUnit) {
                    _this.setState({
                        coordinateUnit: coordinateUnit,
                    });
                }, unit: coordinateUnit },
                React.createElement(GeoEditor, { geo: geo, coordinateUnit: coordinateUnit, onUpdateGeo: this.onUpdateGeo })));
        };
        return GeoEditorDialog;
    }(React.Component));
    return GeoEditorDialog;
};
exports.geoEditorToDialog = geoEditorToDialog;
//# sourceMappingURL=geo-editor-to-dialog.js.map