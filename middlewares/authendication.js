const jwt = require("jsonwebtoken");

exports.authentication = (req,res,next)=>{

    let token = req.headers.authorization;
  // check the token in body
  if (token) {
    try {
      // check the token is valid or not
      let decode = jwt.verify(token, process.env.SECRET_KEY)
      console.log(decode)
      if (decode) {
        req.user = decode;
        console.log(req.user)
        next();
      }

    } catch (error) {
      res.json({
        statusCode: 401,
        message: "Your Session is About to Expire!",
        error,
      })
    }

  } else {
    res.json({
      statusCode: 401,
      message: "Login required for further access..!!"
    })
  }

}

//authorization

exports.adminOnly = (req, res, next) => {
    console.log(req.user.role)
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }
    if (req.user.role !== 1) {
        return res.status(401).send("Access Denied");
    }
    next();
};
 
 
