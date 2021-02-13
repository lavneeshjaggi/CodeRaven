const express = require("express"),
  hackerEarth = require("hackerearth-node");

const router = express.Router(),
  HE = new hackerEarth("f13bcdf4184fe97589898c30fa7c7099e5f2f443", "");

router.post("/", (req, res, next) => {
  const config = {
    time_limit: 5,
    memory_limit: 323244,
    source: req.body.code,
    input: req.body.input,
    language: req.body.language,
  };
  HE.run(config, function (err, response) {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Unable to process the request",
        error: err,
      });
    } else {
      console.log(JSON.parse(response));

      const obj = JSON.parse(response),
        error = obj.run_status.stderr,
        output = obj.run_status.output;

      return res.status(200).json({
        error: error,
        output: output,
      });
    }
  });
});

module.exports = router;
