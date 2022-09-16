const express = require("express");
const router = express.Router();
const { auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers/index");
const ctrl = require("../../controllers/auth");

router.post("/registration", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrl.avatar);

module.exports = router;
