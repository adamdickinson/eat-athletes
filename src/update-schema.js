const schema = require("@elevated/tracker-backend").schema
const join = require("path").join
const writeFileSync = require("fs").writeFileSync
writeFileSync(join(__dirname, "..", "schema.graphql"), schema)
