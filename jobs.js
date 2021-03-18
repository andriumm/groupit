const cron = require("node-cron");
const models = require("./models");
const nodemailer = require("nodemailer");


const job = cron.schedule("0 15 * * *", async function() {
  console.log("running a task every minute");

  const data = await models.Resources.findAll({
    where: {
        created_date: { [models.Sequelize.Op.eq]: models.Sequelize.fn('CURDATE')},
        reminder: true,
    }, 
  });
  console.log("here")
  console.log(data)

  data.forEach(resource => {
      const email = sendReminder(resource);
  })
});

const sendReminder = async function(resource) {
  const topic = await models.Topics.findOne({
    where: {
      id : resource.topic_id
    }
  })
  const user = await models.Users.findOne({
    where: {
      id : topic.user_id
    }
  })
  const email = user.email;
  sendEmail(email, resource.resource_name)
}

const sendEmail = async (email, content) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    sendmail: true, // doesn't work without this line, why?
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const mailOptions = {
    from: `GroupIT`,
    to: `${email}`,
    subject: `Here is your reminder`,
    text: `${content}`,
  }

  //async 
  return transporter.sendMail(mailOptions) //result is a promise
}

module.exports = job;