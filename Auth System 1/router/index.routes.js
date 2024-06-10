const { Router} = require("express");
const { Authroutes} = require("./auth.routes");
const { ProfileRoutes} = require("./profile.routes");
const {f_checkAuth } = require("../middleware/check-auth")
const router = Router();
console.log("Allroutes")

router.use("/auth" , Authroutes)
router.use("/user" , f_checkAuth , ProfileRoutes)
module.exports = {
    Allroutes : router
}