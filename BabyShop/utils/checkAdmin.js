const checkAdmin = (req, res, next) => {
  // const { Admin } = req.decoded;
  // console.log(Admin);
  if (req.decoded.Admin) {
    req.admin = true;
    console.log("어드민 확인되었습니다.");
  } else {
    req.admin = false;
    console.log("유저 확인되었습니다.");
  }
  next();
};

module.exports = checkAdmin;
