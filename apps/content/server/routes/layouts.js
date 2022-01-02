module.exports = function (app) {
  const populateUser = require("../middleware/populate-user");
  const { onlyEditor } = require("../middleware/auth-check");

  const {
    getLayoutsList,
    singleLayout,
    createLayout,
    getLayoutByKind,
    updateLayout,
    deleteLayout,
  } = require("../controllers/layouts");

  app
    .get("/api/layouts", populateUser, onlyEditor, getLayoutsList)
    .get(
      "/api/layouts/:kind", populateUser, singleLayout)
    .post("/api/layouts", populateUser, onlyEditor, createLayout)
    .put(
      "/api/layouts/:kind",
      populateUser,
      onlyEditor,
      getLayoutByKind,
      updateLayout,
    )
    .delete(
      "/api/layouts/:kind",
      populateUser,
      onlyEditor,
      getLayoutByKind,
      deleteLayout
    );
};
