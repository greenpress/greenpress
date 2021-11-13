module.exports = function (app) {
  const populateUser = require("../middleware/populate-user");
  const { onlyEditor } = require("../middleware/auth-check");

  const {
    getBlocksList,
    getBlockById,
    singleBlock,
    createBlock,
    updateBlock,
    deleteBlock,
  } = require("../controllers/blocks");

  app
    .get("/api/blocks", populateUser, onlyEditor, getBlocksList)
    .get(
      "/api/blocks/:blockId",
      populateUser,
      getBlockById,
      singleBlock,
    )
    .post("/api/blocks", populateUser, onlyEditor, createBlock)
    .put(
      "/api/blocks/:blockId",
      populateUser,
      onlyEditor,
      getBlockById,
      updateBlock,
    )
    .delete(
      "/api/blocks/:blockId",
      populateUser,
      onlyEditor,
      getBlockById,
      deleteBlock,
    );
};
