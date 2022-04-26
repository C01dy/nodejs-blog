const { createUser } = require("../controllers/user")
const router = require("express").Router()

router.post("/sign_up", createUser)

module.exports = router;
