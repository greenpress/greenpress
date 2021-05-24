exports.ids = [6];
exports.modules = {

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(10).default
module.exports.__inject__ = function (context) {
  add("c87bafb6", content, false, context)
};

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(10).default
module.exports.__inject__ = function (context) {
  add("182b85fe", content, false, context)
};

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(115);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(10).default
module.exports.__inject__ = function (context) {
  add("6b6167b4", content, false, context)
};

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/FormInput.vue?vue&type=template&id=1936a04c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group field"},[_vm._ssrNode((((_vm.type)==='checkbox')?("<input"+(_vm._ssrAttr("placeholder",_vm.label))+(_vm._ssrAttr("name",_vm.name))+" required=\"required\" type=\"checkbox\""+(_vm._ssrAttr("checked",Array.isArray(_vm.input)?_vm._i(_vm.input,null)>-1:(_vm.input)))+" class=\"form-field\" data-v-1936a04c>"):((_vm.type)==='radio')?("<input"+(_vm._ssrAttr("placeholder",_vm.label))+(_vm._ssrAttr("name",_vm.name))+" required=\"required\" type=\"radio\""+(_vm._ssrAttr("checked",_vm._q(_vm.input,null)))+" class=\"form-field\" data-v-1936a04c>"):("<input"+(_vm._ssrAttr("placeholder",_vm.label))+(_vm._ssrAttr("name",_vm.name))+" required=\"required\""+(_vm._ssrAttr("type",_vm.type))+(_vm._ssrAttr("value",(_vm.input)))+" class=\"form-field\" data-v-1936a04c>"))+" <label class=\"form-label\" data-v-1936a04c>"+_vm._ssrEscape(_vm._s(_vm.label))+"</label> "),(_vm.input)?_c('ErrorDisplay',{attrs:{"errors":_vm.errors}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/components/FormInput.vue?vue&type=template&id=1936a04c&scoped=true&

// EXTERNAL MODULE: ./.nuxt/composition-api/index.js
var composition_api = __webpack_require__(11);

// CONCATENATED MODULE: ./compositions/useInputValidator.js

/* harmony default export */ var useInputValidator = (function (startVal, validators, onValidate) {
  const input = Object(composition_api["ref"])(startVal);
  const errors = Object(composition_api["ref"])([]);
  Object(composition_api["watch"])(input, value => {
    errors.value = validators.map(validator => validator(value));
    onValidate(value);
  });
  return {
    input,
    errors
  };
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/ErrorDisplay.vue?vue&type=template&id=130803f7&scoped=true&
var ErrorDisplayvue_type_template_id_130803f7_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_vm._ssrNode((_vm._ssrList((_vm.errors),function(error){return ("<li data-v-130803f7>"+_vm._ssrEscape(_vm._s(error))+"</li>")})))])}
var ErrorDisplayvue_type_template_id_130803f7_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/components/ErrorDisplay.vue?vue&type=template&id=130803f7&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/ErrorDisplay.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var ErrorDisplayvue_type_script_lang_js_ = ({
  name: "ErrorDisplay",
  props: {
    errors: Array
  }
});
// CONCATENATED MODULE: ./themes/default/components/ErrorDisplay.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ErrorDisplayvue_type_script_lang_js_ = (ErrorDisplayvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./themes/default/components/ErrorDisplay.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(110)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ErrorDisplayvue_type_script_lang_js_,
  ErrorDisplayvue_type_template_id_130803f7_scoped_true_render,
  ErrorDisplayvue_type_template_id_130803f7_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "130803f7",
  "02d0de7a"
  
)

/* harmony default export */ var ErrorDisplay = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/FormInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//


/* harmony default export */ var FormInputvue_type_script_lang_js_ = ({
  name: "FormInput",
  components: {
    ErrorDisplay: ErrorDisplay
  },
  props: {
    type: String,
    name: String,
    label: String,
    validators: Array
  },

  setup(props, {
    emit
  }) {
    const {
      input,
      errors
    } = useInputValidator(props.value, props.validators || [], value => emit("input", value));
    return {
      input,
      errors
    };
  }

});
// CONCATENATED MODULE: ./themes/default/components/FormInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormInputvue_type_script_lang_js_ = (FormInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./themes/default/components/FormInput.vue



function FormInput_injectStyles (context) {
  
  var style0 = __webpack_require__(112)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var FormInput_component = Object(componentNormalizer["a" /* default */])(
  components_FormInputvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  FormInput_injectStyles,
  "1936a04c",
  "7fd9610d"
  
)

/* harmony default export */ var FormInput = __webpack_exports__["a"] = (FormInput_component.exports);

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ErrorDisplay_vue_vue_type_style_index_0_id_130803f7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(106);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ErrorDisplay_vue_vue_type_style_index_0_id_130803f7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ErrorDisplay_vue_vue_type_style_index_0_id_130803f7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ErrorDisplay_vue_vue_type_style_index_0_id_130803f7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ErrorDisplay_vue_vue_type_style_index_0_id_130803f7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "li[data-v-130803f7]{flex:1;margin:0;display:block;color:red;font-size:10px}li[data-v-130803f7],ul[data-v-130803f7]{padding:0}ul[data-v-130803f7]{margin:auto;display:flex;flex-direction:column;align-items:flex-start;justify-content:center}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_1936a04c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(107);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_1936a04c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_1936a04c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_1936a04c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_1936a04c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".form-group[data-v-1936a04c]{position:relative;padding:15px 0 0;margin-top:10px;width:50%}.form-field[data-v-1936a04c]{z-index:10;font-family:inherit;width:100%;border:0;border-bottom:2px solid #9b9b9b;outline:0;font-weight:200;font-size:1rem;color:#111;padding:10px 0;background:transparent;transition:border-color .2s}.form-field[data-v-1936a04c]::-moz-placeholder{color:transparent}.form-field[data-v-1936a04c]:-ms-input-placeholder{color:transparent}.form-field[data-v-1936a04c]::placeholder{color:transparent}.form-field:-moz-placeholder-shown~.form-label[data-v-1936a04c]{font-size:.8rem;cursor:text;top:20px}.form-field:-ms-input-placeholder~.form-label[data-v-1936a04c]{font-size:.8rem;cursor:text;top:20px}.form-field:placeholder-shown~.form-label[data-v-1936a04c]{font-size:.8rem;cursor:text;top:20px}.form-label[data-v-1936a04c]{z-index:-10;position:absolute;top:0;display:block;transition:.2s;font-size:.6rem;color:#9b9b9b}.form-field[data-v-1936a04c]:focus{padding-bottom:2px;border-width:3px;-o-border-image:linear-gradient(90deg,#11998e,#38ef7d);border-image:linear-gradient(90deg,#11998e,#38ef7d);border-image-slice:1}.form-field:focus~.form-label[data-v-1936a04c]{position:absolute;top:0;display:block;transition:.2s;font-size:.6rem;color:#11998e;font-weight:700}.form-field[data-v-1936a04c]:invalid,.form-field[data-v-1936a04c]:required{box-shadow:none}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_847b3164_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(108);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_847b3164_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_847b3164_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_847b3164_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_style_index_0_id_847b3164_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "*[data-v-847b3164]{box-sizing:border-box}*[data-v-847b3164],body[data-v-847b3164]{padding:0;margin:0}body[data-v-847b3164]{background-size:cover;font-family:sans-serif}ul[data-v-847b3164]{list-style-type:none}form[data-v-847b3164]{flex:1;position:relative;flex-direction:column;justify-content:space-between}.box[data-v-847b3164],form[data-v-847b3164]{display:flex}.box[data-v-847b3164]{flex-direction:column;margin:auto;padding:.125rem;width:20rem;max-width:80%;box-sizing:border-box;border:2px solid #dadce0;border-radius:8px}.box h2[data-v-847b3164]{padding:0;text-align:center;color:#202124;font-family:\"Google Sans\",sans-serif;font-size:28px;font-weight:400;margin-top:25px}.box .btn[data-v-847b3164]{border:none;outline:none;color:#fff;background-color:#42b983;padding:.625rem 1.25rem;cursor:pointer;border-radius:.312rem;font-size:1rem;float:right;letter-spacing:1px;margin:1rem 2rem}.box .btn[data-v-847b3164]:hover{background-color:#42b983;box-shadow:0 1px 1px 0 rgba(66,185,131,.45),0 1px 3px 1px rgba(66,185,131,.3)}.box form[data-v-847b3164]{display:flex;flex-direction:column}.box form .bottom[data-v-847b3164]{flex:1;position:relative;display:flex;flex-direction:column;align-items:stretch;justify-content:space-between}.box a[data-v-847b3164]{color:grey}.form-inputs[data-v-847b3164]{display:flex;flex:1;flex-direction:column;justify-content:flex-start;align-items:center}.form-inputs>*[data-v-847b3164]{width:80%;padding:.2rem .5rem}.link[data-v-847b3164]{text-align:center;margin-bottom:1rem}img[data-v-847b3164]{max-width:100%;max-height:100%;display:block}.logo[data-v-847b3164]{width:70px;margin:.3rem auto 0}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export minLength */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isEmail; });
const minLength = min => {
  return input => input.length < min ? `Value must be at least ${min} characters` : null;
};

const isEmail = () => {
  const re = /\S+@\S+\.\S+/;
  return input => re.test(input) ? null : "Must be a valid email address";
};



/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/Form.vue?vue&type=template&id=847b3164&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"box"},[_vm._ssrNode("<h2 data-v-847b3164>Welcome</h2> <img src=\"/logo.png\" alt=\"logo\" class=\"logo\" data-v-847b3164> "),_vm._ssrNode("<form data-v-847b3164>","</form>",[_vm._ssrNode("<ul class=\"form-inputs\" data-v-847b3164>","</ul>",[_vm._t("default")],2),_vm._ssrNode(" <div class=\"bottom\" data-v-847b3164><button type=\"submit\" class=\"btn\" data-v-847b3164>"+_vm._ssrEscape(_vm._s(_vm.buttonTitle))+"</button> <a"+(_vm._ssrAttr("href",_vm.nextPage))+" class=\"link\" data-v-847b3164>"+_vm._ssrEscape(_vm._s(_vm.message))+"</a></div>")],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/components/Form.vue?vue&type=template&id=847b3164&scoped=true&

// EXTERNAL MODULE: ./themes/default/components/FormInput.vue + 10 modules
var FormInput = __webpack_require__(109);

// EXTERNAL MODULE: ./themes/default/components/Logo.vue + 2 modules
var Logo = __webpack_require__(24);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/Form.vue?vue&type=script&lang=js&
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


/* harmony default export */ var Formvue_type_script_lang_js_ = ({
  components: {
    FormInput: FormInput["a" /* default */],
    Logo: Logo["a" /* default */]
  },
  props: {
    inputs: Array,
    buttonTitle: String,
    message: String,
    nextPage: String
  }
});
// CONCATENATED MODULE: ./themes/default/components/Form.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Formvue_type_script_lang_js_ = (Formvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./themes/default/components/Form.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(114)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "847b3164",
  "1c3d13ed"
  
)

/* harmony default export */ var Form = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/signup.vue?vue&type=template&id=264e1aa5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SignUp')}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/signup.vue?vue&type=template&id=264e1aa5&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/SignUp.vue?vue&type=template&id=37bd268f&
var SignUpvue_type_template_id_37bd268f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SignupForm')}
var SignUpvue_type_template_id_37bd268f_staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/SignUp.vue?vue&type=template&id=37bd268f&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/SignupForm.vue?vue&type=template&id=3f5a758a&
var SignupFormvue_type_template_id_3f5a758a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Form',{attrs:{"buttonTitle":"Sign up","nextPage":"/signin","message":"Already have an account? Sign In"},on:{"submit":_vm.onSubmit}},[_c('FormInput',{attrs:{"label":"Display name","name":"name","type":"text"},model:{value:(_vm.inputs.name),callback:function ($$v) {_vm.$set(_vm.inputs, "name", $$v)},expression:"inputs.name"}}),_vm._v(" "),_c('FormInput',{attrs:{"label":"Email","name":"email","type":"text","validators":_vm.validators.email},model:{value:(_vm.inputs.email),callback:function ($$v) {_vm.$set(_vm.inputs, "email", $$v)},expression:"inputs.email"}}),_vm._v(" "),_c('FormInput',{attrs:{"label":"Password","name":"password","type":"password"},model:{value:(_vm.inputs.password),callback:function ($$v) {_vm.$set(_vm.inputs, "password", $$v)},expression:"inputs.password"}}),_vm._v(" "),_c('FormInput',{attrs:{"label":"Confirm password","name":"confirmPassword","type":"password"},model:{value:(_vm.inputs.confirmPassword),callback:function ($$v) {_vm.$set(_vm.inputs, "confirmPassword", $$v)},expression:"inputs.confirmPassword"}})],1)}
var SignupFormvue_type_template_id_3f5a758a_staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/components/SignupForm.vue?vue&type=template&id=3f5a758a&

// EXTERNAL MODULE: ./themes/default/components/FormInput.vue + 10 modules
var FormInput = __webpack_require__(109);

// EXTERNAL MODULE: ./themes/default/components/Form.vue + 4 modules
var Form = __webpack_require__(117);

// EXTERNAL MODULE: ./.nuxt/composition-api/index.js
var composition_api = __webpack_require__(11);

// EXTERNAL MODULE: ./compositions/validators.js
var validators = __webpack_require__(116);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/SignupForm.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SignupFormvue_type_script_lang_js_ = ({
  components: {
    FormInput: FormInput["a" /* default */],
    Form: Form["a" /* default */]
  },

  setup() {
    const inputs = Object(composition_api["reactive"])({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    return {
      inputs,
      validators: {
        email: [Object(validators["a" /* isEmail */])()]
      },
      onSubmit: e => {
        console.log('Submitting...'); // Call api
      }
    };
  }

});
// CONCATENATED MODULE: ./themes/default/components/SignupForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SignupFormvue_type_script_lang_js_ = (SignupFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./themes/default/components/SignupForm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SignupFormvue_type_script_lang_js_,
  SignupFormvue_type_template_id_3f5a758a_render,
  SignupFormvue_type_template_id_3f5a758a_staticRenderFns,
  false,
  null,
  null,
  "79856065"
  
)

/* harmony default export */ var SignupForm = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/SignUp.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var SignUpvue_type_script_lang_js_ = ({
  name: "SignUp",
  components: {
    SignupForm: SignupForm
  }
});
// CONCATENATED MODULE: ./themes/default/SignUp.vue?vue&type=script&lang=js&
 /* harmony default export */ var default_SignUpvue_type_script_lang_js_ = (SignUpvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./themes/default/SignUp.vue





/* normalize component */

var SignUp_component = Object(componentNormalizer["a" /* default */])(
  default_SignUpvue_type_script_lang_js_,
  SignUpvue_type_template_id_37bd268f_render,
  SignUpvue_type_template_id_37bd268f_staticRenderFns,
  false,
  null,
  null,
  "346db958"
  
)

/* harmony default export */ var SignUp = (SignUp_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/signup.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var signupvue_type_script_lang_js_ = ({
  components: {
    SignUp: SignUp
  }
});
// CONCATENATED MODULE: ./pages/signup.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_signupvue_type_script_lang_js_ = (signupvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/signup.vue





/* normalize component */

var signup_component = Object(componentNormalizer["a" /* default */])(
  pages_signupvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2af0f674"
  
)

/* harmony default export */ var signup = __webpack_exports__["default"] = (signup_component.exports);

/***/ })

};;
//# sourceMappingURL=signup.js.map