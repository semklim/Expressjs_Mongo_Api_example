const { validationResult } = require("express-validator");
const mailService = require('../service/mailService');
class EmailControl {
  async sendEmail(req, res, next) {
    try {
      console.log(req.body);
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.status(400).json(validation);
      }
      const { to, email } = req.body;
      const resEmail = await mailService.sendActivationMail(to, email);
      res.status(200).json(resEmail);
    } catch (e) {
      console.log(e);
      res.status(400).json({ code: 400, message: e.message });
    }
}
}

module.exports = new EmailControl();