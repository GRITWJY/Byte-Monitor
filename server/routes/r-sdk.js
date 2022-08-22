const router = require("koa-router")();
const sdkController = require("../controller/c-sdk");

router.prefix("/sdk");

router.post("/transportData", sdkController.addData);

router.post("/saveUser", sdkController.saveUser);

module.exports = router;
