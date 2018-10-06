import PasswordValidator from 'password-validator';

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(6)
  .is().max(32)
  .has().digits()
  .has().not().spaces();

const emailRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator = value => {
  if (!value) return true;
  return emailRegularExpression.test(value.toLowerCase());
};

export const passwordValidator = value => {
  if (!value) return true;
  return passwordSchema.validate(value);
};
