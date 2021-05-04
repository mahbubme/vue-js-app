pluginWebpack([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_LineChart_js__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_LineChart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__mixins_LineChart_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'Graph',

    components: { LineChart: __WEBPACK_IMPORTED_MODULE_0__mixins_LineChart_js___default.a },

    data() {
        return {
            loaded: false,
            refresh: false,
            chartdata: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },

    async mounted() {
        this.fetchGraphData();
    },

    methods: {
        fetchGraphData() {
            self = this;
            self.loaded = false;

            wp.ajax.send('vue_js_app_get_data', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                    refresh: this.refresh
                },
                success: function (response) {
                    self.prepareGraphData(response.graph);
                    self.loaded = true;
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        prepareGraphData(graphData) {
            let items = Object.keys(graphData);
            let labels = [];
            let datasets = [];
            let chartDataSets = {
                label: this.__('Value', 'vue-js-app'),
                backgroundColor: '#f87979',
                data: []
            };

            items.map(key => {
                let item = graphData[key];

                labels.push(this.getTimeFromDate(item.date));
                chartDataSets.data.push(item.value);
            });

            datasets.push(chartDataSets);

            this.chartdata.labels = labels;
            this.chartdata.datasets = datasets;
        },

        refreshData() {
            this.refresh = true;
            this.fetchGraphData();
        }
    }

});

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(146);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(149);

var _router2 = _interopRequireDefault(_router);

var _store = __webpack_require__(167);

var _store2 = _interopRequireDefault(_store);

var _common = __webpack_require__(188);

var _common2 = _interopRequireDefault(_common);

var _i18n = __webpack_require__(142);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mixin
_vue2.default.mixin(_common2.default);
_vue2.default.mixin({
    methods: {
        __: _i18n.__,
        _x: _i18n._x,
        _nx: _i18n._nx,
        sprintf: _i18n.sprintf
    }
});

(0, _i18n.setLocaleData)(window.vueJSApp.locale_data, 'vue-js-app');

_vue2.default.config.productionTip = false;

new _vue2.default({
    el: '#vue-js-app',
    router: _router2.default,
    store: _store2.default,
    render: function render(h) {
        return h(_App2.default);
    }
});

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(6);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6bc4b6d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(148);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6bc4b6d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/admin/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bc4b6d8", Component.options)
  } else {
    hotAPI.reload("data-v-6bc4b6d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 147:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "vue-backend-app" } }, [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6bc4b6d8", esExports)
  }
}

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(7);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Home = __webpack_require__(150);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
    routes: [{
        path: '/',
        name: 'Home',
        component: _Home2.default
    }]
});

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(8);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ce03f2f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(166);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ce03f2f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/admin/components/Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ce03f2f", Component.options)
  } else {
    hotAPI.reload("data-v-0ce03f2f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 151:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Table_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c5ffc1a4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Table_vue__ = __webpack_require__(157);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c5ffc1a4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Table_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/admin/components/Table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c5ffc1a4", Component.options)
  } else {
    hotAPI.reload("data-v-c5ffc1a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 153:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loaded
    ? _c(
        "div",
        { staticClass: "tabcontent" },
        [
          _c("list-table", {
            attrs: {
              columns: _vm.columns,
              rows: _vm.rows,
              actions: [],
              "bulk-actions": [],
              "show-cb": false
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "vue-js-app-setting-row" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("Emails", "vue-js-app")))]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "vue-js-app-email-list" },
              _vm._l(_vm.settings.emails, function(email) {
                return _c("li", [_vm._v(_vm._s(email))])
              })
            )
          ])
        ],
        1
      )
    : _c("div", { staticClass: "vue-js-app-loading" }, [
        _vm._v(_vm._s(_vm.__("Loading...", "vue-js-app")))
      ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c5ffc1a4", esExports)
  }
}

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Graph_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64dc36a4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Graph_vue__ = __webpack_require__(165);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(159)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Graph_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_64dc36a4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Graph_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/admin/components/Graph.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64dc36a4", Component.options)
  } else {
    hotAPI.reload("data-v-64dc36a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 159:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loaded
    ? _c("div", { staticClass: "tabcontent" }, [
        _c(
          "div",
          { staticClass: "vue-js-app-graph" },
          [
            _c("line-chart", {
              attrs: { chartdata: _vm.chartdata, options: _vm.options }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "refresh-graph" }, [
          _c(
            "button",
            {
              staticClass: "vue-js-app-button",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.refreshData($event)
                }
              }
            },
            [_vm._v(_vm._s(_vm.__("Refresh", "vue-js-app")))]
          )
        ])
      ])
    : _c("div", { staticClass: "vue-js-app-loading" }, [
        _vm._v(_vm._s(_vm.__("Loading...", "vue-js-app")))
      ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-64dc36a4", esExports)
  }
}

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "home" }, [
    _c("div", { staticClass: "container", attrs: { id: "tabs" } }, [
      _c(
        "div",
        { staticClass: "tabs" },
        [
          _c(
            "router-link",
            {
              class: [_vm.activetab === "settings" ? "active" : ""],
              attrs: { to: "/" }
            },
            [_vm._v(_vm._s(_vm.__("Settings", "vue-js-app")))]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              class: [_vm.activetab === "table" ? "active" : ""],
              attrs: { to: "/?tab=table" }
            },
            [_vm._v(_vm._s(_vm.__("Table", "vue-js-app")))]
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              class: [_vm.activetab === "graph" ? "active" : ""],
              attrs: { to: "/?tab=graph" }
            },
            [_vm._v(_vm._s(_vm.__("Graph", "vue-js-app")))]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content" },
        [
          _vm.activetab === "settings"
            ? [
                _vm.loaded
                  ? _c("div", { staticClass: "tabcontent" }, [
                      _c(
                        "form",
                        {
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                              _vm.updateSettings($event)
                            }
                          }
                        },
                        [
                          _c("div", { staticClass: "vue-js-app-setting-row" }, [
                            _c(
                              "div",
                              { staticClass: "vue-js-app-setting-label" },
                              [
                                _c("label", [
                                  _vm._v(
                                    _vm._s(_vm.__("Numrows", "vue-js-app"))
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "vue-js-app-setting-field" },
                              [
                                _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.settings.numrows,
                                        expression: "settings.numrows"
                                      }
                                    ],
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.$set(
                                          _vm.settings,
                                          "numrows",
                                          $event.target.multiple
                                            ? $$selectedVal
                                            : $$selectedVal[0]
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "option",
                                      { attrs: { disabled: "", value: "" } },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.__(
                                              "Please select one",
                                              "vue-js-app"
                                            )
                                          )
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm._l(_vm.numrowsOptions, function(
                                      numrow
                                    ) {
                                      return _c(
                                        "option",
                                        { domProps: { value: numrow.value } },
                                        [
                                          _vm._v(
                                            "\n                                      " +
                                              _vm._s(numrow.label) +
                                              "\n                                  "
                                          )
                                        ]
                                      )
                                    })
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "desc" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__(
                                        "How many rows on the table you want to show.",
                                        "vue-js-app"
                                      )
                                    )
                                  )
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "vue-js-app-setting-row" }, [
                            _c(
                              "div",
                              { staticClass: "vue-js-app-setting-label" },
                              [
                                _c("label", [
                                  _vm._v(
                                    _vm._s(_vm.__("Humandate", "vue-js-app"))
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "vue-js-app-setting-field" },
                              [
                                _c("label", [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.settings.humandate,
                                        expression: "settings.humandate"
                                      }
                                    ],
                                    attrs: { type: "checkbox" },
                                    domProps: {
                                      checked: Array.isArray(
                                        _vm.settings.humandate
                                      )
                                        ? _vm._i(_vm.settings.humandate, null) >
                                          -1
                                        : _vm.settings.humandate
                                    },
                                    on: {
                                      change: function($event) {
                                        var $$a = _vm.settings.humandate,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              (_vm.settings.humandate = $$a.concat(
                                                [$$v]
                                              ))
                                          } else {
                                            $$i > -1 &&
                                              (_vm.settings.humandate = $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1)))
                                          }
                                        } else {
                                          _vm.$set(
                                            _vm.settings,
                                            "humandate",
                                            $$c
                                          )
                                        }
                                      }
                                    }
                                  }),
                                  _vm._v(
                                    "\n                                  " +
                                      _vm._s(
                                        _vm.__(
                                          "Human readable date format",
                                          "vue-js-app"
                                        )
                                      ) +
                                      "\n                              "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "desc" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__(
                                        "Enable if you want to show human readable date format on date column in the table.",
                                        "vue-js-app"
                                      )
                                    )
                                  )
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "vue-js-app-setting-row" },
                            [
                              _c(
                                "div",
                                { staticClass: "vue-js-app-setting-label" },
                                [
                                  _c("label", [
                                    _vm._v(
                                      _vm._s(_vm.__("Emails", "vue-js-app"))
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _vm._l(_vm.settings.emails, function(
                                email,
                                index
                              ) {
                                return _c(
                                  "div",
                                  {
                                    staticClass: "vue-js-app-setting-field",
                                    attrs: { "data-index": index }
                                  },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.settings.emails[index],
                                          expression: "settings.emails[index]"
                                        }
                                      ],
                                      attrs: {
                                        type: "email",
                                        placeholder: "example@example.com"
                                      },
                                      domProps: {
                                        value: _vm.settings.emails[index]
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.settings.emails,
                                            index,
                                            $event.target.value
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "vue-js-app-button btn-control",
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            _vm.addNewEmail($event)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.__("+", "vue-js-app"))
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "vue-js-app-button btn-control danger",
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            _vm.removeEmail(index)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.__("-", "vue-js-app"))
                                        )
                                      ]
                                    )
                                  ]
                                )
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "vue-js-app-setting-field" },
                                [
                                  _c("p", { staticClass: "desc" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__(
                                          "You can add up to 5 emails.",
                                          "vue-js-app"
                                        )
                                      )
                                    )
                                  ])
                                ]
                              )
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "vue-js-app-setting-row" }, [
                            _c(
                              "button",
                              {
                                staticClass: "vue-js-app-button",
                                attrs: { type: "submit" }
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__("Update Settings", "vue-js-app")
                                  )
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _vm.settingsUpdated
                            ? _c(
                                "div",
                                { staticClass: "notice notice-success" },
                                [
                                  _c("p", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__("Settings Updated", "vue-js-app")
                                      )
                                    )
                                  ])
                                ]
                              )
                            : _vm._e()
                        ]
                      )
                    ])
                  : _c("div", { staticClass: "vue-js-app-loading" }, [
                      _vm._v(_vm._s(_vm.__("Loading...", "vue-js-app")))
                    ])
              ]
            : _vm._e(),
          _vm._v(" "),
          _vm.activetab === "table" ? [_c("Table")] : _vm._e(),
          _vm._v(" "),
          _vm.activetab === "graph" ? [_c("Graph")] : _vm._e()
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0ce03f2f", esExports)
  }
}

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(5);

var _vuex2 = _interopRequireDefault(_vuex);

var _settings = __webpack_require__(168);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = new _vuex2.default.Store({
    modules: {
        settings: _settings2.default
    }
});

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Initial state
var state = {
    emails: false,
    humandate: false,
    numrows: false
};

// Getters
var getters = {
    getSettings: function getSettings(state) {
        return state;
    }
};

// Actions
var actions = {
    setSettings: function setSettings(_ref, data) {
        var commit = _ref.commit;

        commit('setSettings', data);
    },
    addNewEmail: function addNewEmail(_ref2, email) {
        var commit = _ref2.commit;

        commit('addNewEmail', email);
    },
    removeEmail: function removeEmail(_ref3, index) {
        var commit = _ref3.commit;

        commit('removeEmail', index);
    }
};

// Mutations
var mutations = {
    setSettings: function setSettings(state, data) {
        state.emails = data.emails;
        state.humandate = data.humandate;
        state.numrows = data.numrows;
    },
    addNewEmail: function addNewEmail(state, email) {
        state.emails.push(email);
    },
    removeEmail: function removeEmail(state, index) {
        state.emails.splice(index, 1);
    }
};

exports.default = {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        getTimeFromDate: function getTimeFromDate(timestamp) {
            var monthsArr = [this.__('Jan', 'vue-js-app'), this.__('Feb', 'vue-js-app'), this.__('March', 'vue-js-app'), this.__('April', 'vue-js-app'), this.__('May', 'vue-js-app'), this.__('Jun', 'vue-js-app'), this.__('July', 'vue-js-app'), this.__('Aug', 'vue-js-app'), this.__('Sep', 'vue-js-app'), this.__('Oct', 'vue-js-app'), this.__('Nov', 'vue-js-app'), this.__('Dec', 'vue-js-app')];
            var date = new Date(timestamp * 1000);
            var year = date.getFullYear();
            var month = monthsArr[date.getMonth()];
            var day = date.getDate();
            var readableTime = month + ' ' + day + ', ' + year;

            return readableTime;
        }
    }
};

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueChartjs = __webpack_require__(13);

exports.default = {
    extends: _vueChartjs.Line,

    props: {
        chartdata: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },

    mounted: function mounted() {
        this.renderChart(this.chartdata, this.options);
    }
};

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'App'
});

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Table_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Graph_vue__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Home',

    components: {
        Table: __WEBPACK_IMPORTED_MODULE_0__Table_vue__["a" /* default */],
        Graph: __WEBPACK_IMPORTED_MODULE_1__Graph_vue__["a" /* default */]
    },

    data() {
        return {
            loaded: false,
            settingsUpdated: false,
            activetab: 'settings',
            numrowsOptions: [{
                value: 1,
                label: this.__('One', 'vue-js-app')
            }, {
                value: 2,
                label: this.__('Two', 'vue-js-app')
            }, {
                value: 3,
                label: this.__('Three', 'vue-js-app')
            }, {
                value: 4,
                label: this.__('Four', 'vue-js-app')
            }, {
                value: 5,
                label: this.__('Five', 'vue-js-app')
            }]
        };
    },

    computed: Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["mapState"])({
        settings: state => state.settings
    }),

    watch: {
        '$route.query.tab': function () {
            this.handleTabs(this.$route.query.tab);
        }
    },

    created() {
        this.setSettings();
    },

    mounted() {
        this.handleTabs(this.$route.query.tab);
    },

    methods: {
        handleTabs(query) {
            if (query) {
                this.activetab = query;
            } else {
                this.activetab = 'settings';
            }
        },

        setSettings() {
            let self = this;
            self.loaded = false;

            wp.ajax.send('vue_js_app_settings', {
                data: {
                    _wpnonce: vueJSApp.nonce
                },
                success: function (response) {
                    self.$store.dispatch('settings/setSettings', response);
                    self.loaded = true;
                },
                error: function (error) {
                    alert(error);
                }
            });
        },

        updateSettings() {
            let self = this;
            self.settingsUpdated = false;

            wp.ajax.send('vue_js_app_update_settings', {
                data: {
                    _wpnonce: vueJSApp.nonce,
                    settings: this.settings
                },
                success: function (response) {
                    self.settingsUpdated = true;
                },
                error: function (error) {
                    alert(error);
                }
            });
        },

        addNewEmail() {
            if (this.settings.emails.length >= 5) {
                alert(this.__('You cannot add more than 5 emails.', 'vue-js-app'));
                return;
            }

            this.$store.dispatch('settings/addNewEmail', 'example@example.com');
        },

        removeEmail(index) {
            if (this.settings.emails.length <= 1) {
                alert(this.__('At least 1 email required.', 'vue-js-app'));
                return;
            }

            this.$store.dispatch('settings/removeEmail', index);
        }
    }
});

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_wp_list_table__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Table',

    components: {
        ListTable: __WEBPACK_IMPORTED_MODULE_0_vue_wp_list_table__["default"]
    },

    data() {
        return {
            loaded: false,
            rows: [],
            columns: {}
        };
    },

    computed: Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["mapState"])({
        settings: state => state.settings
    }),

    async mounted() {
        this.prepareTable();
    },

    methods: {
        prepareTable() {
            let self = this;
            self.loaded = false;

            wp.ajax.send('vue_js_app_get_data', {
                data: {
                    _wpnonce: vueJSApp.nonce
                },
                success: function (response) {
                    self.prepareTableColumns(response.table.data.headers);
                    self.prepareTableRows(response.table.data.rows);
                    self.loaded = true;
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },

        prepareTableColumns(columns) {
            let self = this;

            columns.forEach(function (column) {
                self.columns[column.toLowerCase()] = { 'label': column };
            });
        },

        prepareTableRows(rows) {
            self = this;
            rows = rows.slice(0, self.settings.numrows);

            if (self.settings.humandate) {
                rows.forEach(function (row) {
                    row.date = self.getTimeFromDate(row.date);
                });
            }

            self.rows = rows;
        }
    }
});

/***/ })

},[143]);