exports.ids = [7];
exports.modules = {

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(10).default
module.exports.__inject__ = function (context) {
  add("71426ee4", content, false, context)
};

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsList_vue_vue_type_style_index_0_id_d37db69e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(102);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsList_vue_vue_type_style_index_0_id_d37db69e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsList_vue_vue_type_style_index_0_id_d37db69e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsList_vue_vue_type_style_index_0_id_d37db69e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PostsList_vue_vue_type_style_index_0_id_d37db69e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "section[data-v-d37db69e]{padding:10px;margin:10px 0;display:flex;flex-direction:row}section[data-v-d37db69e]:nth-child(2n){background-color:#ddd}img[data-v-d37db69e]{padding-right:20px;width:200px}.created[data-v-d37db69e]{font-size:70%}.short[data-v-d37db69e]{padding-top:10px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/PostsList.vue?vue&type=template&id=d37db69e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.posts),function(post){return _vm._ssrNode("<section data-v-d37db69e>","</section>",[_vm._ssrNode(((post.thumbnail)?("<div data-v-d37db69e><img"+(_vm._ssrAttr("src",post.thumbnail))+" data-v-d37db69e></div>"):"<!---->")+" "),_vm._ssrNode("<div data-v-d37db69e>","</div>",[_vm._ssrNode("<h3 data-v-d37db69e>","</h3>",[_c('nuxt-link',{attrs:{"to":{params: {post: post.path, category: post.category.path ? post.category.path : post.category}, name: 'category-post'}}},[_vm._v("\n\t\t\t\t\t"+_vm._s(post.title)+"\n\t\t\t\t")])],1),_vm._ssrNode(" <small class=\"created\" data-v-d37db69e>"+_vm._ssrEscape(_vm._s(_vm._f("dateTime")(post.created)))+"</small> <div class=\"short\" data-v-d37db69e>"+(_vm._s(post.short))+"</div>")],2)],2)}),0)}
var staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/components/PostsList.vue?vue&type=template&id=d37db69e&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/components/PostsList.vue?vue&type=script&lang=js&
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
/* harmony default export */ var PostsListvue_type_script_lang_js_ = ({
  props: {
    posts: Array
  }
});
// CONCATENATED MODULE: ./themes/default/components/PostsList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PostsListvue_type_script_lang_js_ = (PostsListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./themes/default/components/PostsList.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(103)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_PostsListvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "d37db69e",
  "257b5d38"
  
)

/* harmony default export */ var PostsList = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(127);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(10).default
module.exports.__inject__ = function (context) {
  add("ad732520", content, false, context)
};

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tag_vue_vue_type_style_index_0_id_7f2194e2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(119);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tag_vue_vue_type_style_index_0_id_7f2194e2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tag_vue_vue_type_style_index_0_id_7f2194e2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tag_vue_vue_type_style_index_0_id_7f2194e2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Tag_vue_vue_type_style_index_0_id_7f2194e2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "h1[data-v-7f2194e2],section[data-v-7f2194e2]{padding:10px}section[data-v-7f2194e2]{margin:10px;border-top:1px solid #ccc;border-radius:5px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/tag/_tag.vue?vue&type=template&id=a981df12&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Tag',{attrs:{"posts":_vm.posts,"tag":_vm.$route.params.tag}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/tag/_tag.vue?vue&type=template&id=a981df12&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/Tag.vue?vue&type=template&id=7f2194e2&scoped=true&
var Tagvue_type_template_id_7f2194e2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<h1 data-v-7f2194e2>"+_vm._ssrEscape("Tag: "+_vm._s(_vm.tag))+"</h1> "),_c('PostsList',{attrs:{"posts":_vm.posts}})],2)}
var Tagvue_type_template_id_7f2194e2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./themes/default/Tag.vue?vue&type=template&id=7f2194e2&scoped=true&

// EXTERNAL MODULE: ./themes/default/components/PostsList.vue + 4 modules
var PostsList = __webpack_require__(105);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./themes/default/Tag.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//

/* harmony default export */ var Tagvue_type_script_lang_js_ = ({
  components: {
    PostsList: PostsList["a" /* default */]
  },
  props: {
    tag: String,
    posts: Array
  },

  head() {
    return {
      title: this.tag,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.tag
      }]
    };
  }

});
// CONCATENATED MODULE: ./themes/default/Tag.vue?vue&type=script&lang=js&
 /* harmony default export */ var default_Tagvue_type_script_lang_js_ = (Tagvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./themes/default/Tag.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(126)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  default_Tagvue_type_script_lang_js_,
  Tagvue_type_template_id_7f2194e2_scoped_true_render,
  Tagvue_type_template_id_7f2194e2_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "7f2194e2",
  "33c74caa"
  
)

/* harmony default export */ var Tag = (component.exports);
// EXTERNAL MODULE: ./node_modules/vuex-composition-helpers/dist/index.js + 4 modules
var dist = __webpack_require__(23);

// EXTERNAL MODULE: ./store/tag/consts.js
var consts = __webpack_require__(7);

// CONCATENATED MODULE: ./compositions/tag-posts.js


const {
  useState
} = Object(dist["a" /* createNamespacedHelpers */])(consts["name"]);
function fetchTagPosts($store, $route) {
  return $store.dispatch(consts["name"] + '/' + consts["ACTIONS"].LOAD_POSTS, $route.params.tag);
}
function useTagPosts() {
  return useState({
    posts: consts["DATA"].POSTS
  });
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/tag/_tag.vue?vue&type=script&lang=js&
//
//
//
//


/* harmony default export */ var _tagvue_type_script_lang_js_ = ({
  components: {
    Tag: Tag
  },

  asyncData({
    store,
    route
  }) {
    return fetchTagPosts(store, route);
  },

  setup() {
    return useTagPosts();
  }

});
// CONCATENATED MODULE: ./pages/tag/_tag.vue?vue&type=script&lang=js&
 /* harmony default export */ var tag_tagvue_type_script_lang_js_ = (_tagvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/tag/_tag.vue





/* normalize component */

var _tag_component = Object(componentNormalizer["a" /* default */])(
  tag_tagvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "f27deb44"
  
)

/* harmony default export */ var _tag = __webpack_exports__["default"] = (_tag_component.exports);

/***/ })

};;
//# sourceMappingURL=_tag.js.map