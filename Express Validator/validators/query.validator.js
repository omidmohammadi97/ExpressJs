const { query } = require("express-validator");

const queryValidaton = ()=>[ query("title").isString().isEmpty(),
query("sort").isEmpty().matches(/ASC|DESC/)
]

module.exports = {
    queryValidaton
}