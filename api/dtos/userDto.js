module.exports = class UserDto {
  userEmail;
  id;
  isActivated;

  constructor(model) {
    this.userEmail = model.userEmail;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
