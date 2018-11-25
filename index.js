const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing
app.use(cors());
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oqtavelabs@gmail.com",
    pass: "oqtavelabs2020"
  }
});

app.post("/contact", (req, res) => {
  var sender = req.body.name;
  var email = req.body.email;
  var body = req.body.message;

  var mailOptions = {
    from: "oqtavelabs@gmail.com", // sender address
    to: "oqtavelabs@gmail.com", // list of receivers
    subject: "Contact Form Submission", // Subject line
    html: `<h1>${sender}</h1>
    <h5>${email}</h5>
    <h6>${body}</h6>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.status(404).send("Error");
    } else {
      console.log(info);
      res.status(200).send("ok");
    }
  });
});

app.listen(3000, () => {
  console.log("server started.");
});
