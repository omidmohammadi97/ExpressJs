const { Router} = require("express");
const { getProfile} = require("../controller/profile.controller");

const router = Router()
console.log("ProfileRoutes")
router.get("/profile" ,  getProfile )

module.exports = {
    ProfileRoutes : router
}