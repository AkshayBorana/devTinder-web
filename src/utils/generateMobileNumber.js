const generateRandomMobileNumber = () => {
  let phoneNumber = 1;
  for (let i = 0; i < 10; i++) {
    phoneNumber = phoneNumber * 10 + Math.floor(Math.random() * 10);
  }
  return phoneNumber;
};

export default generateRandomMobileNumber;
