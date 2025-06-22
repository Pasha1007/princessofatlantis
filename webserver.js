var express = require("express"),
  path = require("path"),
  app = express(),
  server = require("http").createServer(app).listen(8094, "0.0.0.0");

app.use(express.static(path.join(__dirname, "./")));

console.log(
  "Local server is running with 8094 port if you want you can change other server"
);

app.get("/", function (req, res) {
  res.redirect("/app/games/lobby/?env=local");
});
