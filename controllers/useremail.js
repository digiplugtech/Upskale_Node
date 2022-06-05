const NmSender = require('nm-sender').default;
const config = require("../index");
const emailconfig = config.config.emailconfig

  const {host, port, user, password, subject, defaultmsg, fromAddress, defaultAddress} = emailconfig;
  const e = new NmSender({
    host: host,
    port: Number(port),
    user: user,
    password: password,
    defaultFromAddress: defaultAddress,
  });


  exports.sendMail = async(usermail, subject="", msg="", callback) => {
    //console.log("sendMail", useremail, subject, msg)
    try {
        await e.sendMail({
          to: usermail,
          subject: subject,
          from: fromAddress !== "" ? fromAddress : defaultAddress ,
          html: msg !== "" ? msg: defaultmsg,
        });
        return callback("success");
      } catch (err) {
          return callback(err);
          console.error(err);
      }
  }
  