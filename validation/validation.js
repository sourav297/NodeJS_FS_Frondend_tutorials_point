const validateRegistration = (body) => {
  let errors = {};
  //firstName
  if (body.firstName.trim().length < 3 || !/[A-Za-z]+$/.test(body.firstName.trim())) {
    errors.firstNameMsg = "Frist Name is required or it is invalid";
  }
  //lastName
  if (body.lastName.trim().length < 2 || !/[A-Za-z]+$/.test(body.lastName.trim())) {
    errors.lastNameMsg = "Frist Name is required or it is invalid";
  }
  //address
  if (body.address.trim().length < 3) {
    errors.addressMsg = "Address must be 3 characters or more";
  }
  //city
  if (body.city.trim().length < 2 || !/[A-Za-z]+$/.test(body.city.trim())) {
    errors.cityMsg = "City is required or it is invalid";
  }
  //state
  if (body.state.trim().length < 2 || !/[A-Za-z]+$/.test(body.state.trim())) {
    errors.stateMsg = "State is required or it is invalid";
  }
  //zipcode
  if (body.zipcode.trim().length < 3 || !/[0-9]+$/.test(body.zipcode.trim())) {
    errors.zipcodeMsg = "zip code format is 123";
  }
  //email
  if (body.email.trim() == "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email.trim())) {
    errors.emailMsg = "Invalid Email Address";
  }
  //password
  if (body.password.trim().length < 3 || !/[A-Za-z0-9]+$/.test(body.password.trim())) {
    errors.passwordMsg = "Password is invalid";
  }

  if (!/[A-Za-z0-9]+$/.test(body.confirmPassword.trim())) {
    errors.cpasswordMsg = "Confirm Password is required";
  }
  //confirmPasword
  if (body.password.trim() !== body.confirmPassword.trim()) {
    errors.cpasswordMsg = "Password not matched";
  }
  return errors;
};

const validateLogin = (body) => {
  let errors = {};

  if (body.email.trim() == "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email.trim())) {
    errors.emailMsg = "Invalid Email Address";
  }

  if (body.password.trim().length < 3 && !/[A-Za-z0-9]+$/.test(body.password.trim())) {
    errors.passwordMsg = "Invalid Password format";
  }

  return errors;
};

module.exports={validateRegistration, validateLogin};
