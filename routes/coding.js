const express = require("express"),
  config = require("config"),
  request = require("request");

const router = express.Router();

router.post("/", (req, res, next) => {
  const program = {
    script: req.body.code,
    stdin: req.body.input,
    language: req.body.language,
    versionIndex: "0",
    clientId: config.clientId,
    clientSecret: config.clientSecret
  };
  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program,
    },
    function (error, response, body) {
      if (error) {
        console.log(err);

        return res.status(500).json({
          message: "Unable to process the request",
          error: err,
        });
      } else {
        console.log(response);

        return res.status(200).json({
          error: error,
          output: body.output,
        });
      }
    }
  );
});

module.exports = router;
