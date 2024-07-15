const httpStatus = require("http-status");
const userService = require("./user.service.js");
const pick = require("../../utils/pick.js");


//Query users based on what is passed as query
const httpQueryUsers = async (req, res) => {
  try {
    const isAdmin = req.user.role;

    if (isAdmin !== "Admin") {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "You are not authorized" });
    }
    
    const filter = pick(req.query, ["firstName", "lastName", "email"]);
   
    const result = await userService.queryUsers(filter, 10);

    res.status(httpStatus.FOUND).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

//Function to assign roles to users. Limited to Admins
const httpAssignRole = async(req, res) => {
  try {
    const { userID } = req.params; 
    const { role } = req.body;
    const isAdmin = req.user.role;

    if (isAdmin !== "Admin") {
      res.status(httpStatus.UNAUTHORIZED).json({ message: "You are not authorized" });
    }

    const result = await userService.assignUserRole(userID, role)
    res.status(httpStatus.ACCEPTED).json({ result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
}

module.exports = {
  httpAssignRole,
  httpQueryUsers
}
