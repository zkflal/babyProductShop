const checkAdmin = (req, res, next) => {
  const { admin } = req.query;
  // 어드민인지 확인

  if (admin) {
    req.admin = true;
    console.log("어드민 확인되었습니다.");
    next();
  } else {
    req.admin = true;
    console.log("유저 확인되었습니다.");
    next();
  }
};

module.exports = checkAdmin;
