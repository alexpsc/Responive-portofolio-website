const express = require("express");
const app = express();

const nodemaoiler = require("nodemailer");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("assets"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const trasnsporter = nodemaoiler.createTransport({
    service: "gmail",
    auth: {
      user: "alexandru.pascu1985@gmail.com",
      pass: "Aa3EDa2012!",
    },
  });
  const mailOption = {
    from: req.body.email,
    to: "alexandru.pascu1985@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject} `,
    text: req.body.message,
  };
  trasnsporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("email sent: " + info.response);
      res.send("succes");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
