const express = require("express");
const router = express.Router();

//挂载路由

router.get("/test", (req, res) => {
  const query = req.query;
  res.send({
    status: 0,
    msg: "GET SUCCESS",
    data: query,
  });
});

router.post("/post", (req, res) => {
  //req.body urlencoded
  const body = req.body;
  res.send({
    status: 0,
    msg: "POST SUCCESS",
    data: body,
  });
});

module.exports = router;
