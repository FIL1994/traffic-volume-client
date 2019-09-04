const fs = require("fs");

if (!fs.existsSync(".env")) {
  fs.writeFileSync(".env", `HOST_URL=${process.env.HOST_URL}`);
}
