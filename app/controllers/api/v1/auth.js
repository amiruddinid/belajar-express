const jwt = require('jsonwebtoken');
const { User } = require("../../../models");
const {
  checkPassword,
  encryptPassword,
  createToken
} = require("../../../../utils/auth");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    })

    if(!user){
        res.status(404).json({
            message: "Email tidak ditemukan!"
        })
        return;
    }
    
    const isPasswordCorrect = await checkPassword(
        password,
        user.password,
    )

    if(!isPasswordCorrect){
        res.status(401).json({
            message: "Password Salah!"
        })
        return;
    }

    const userData = {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }

    const token = createToken(userData)

    res.status(201).json({
        ...userData,
        token
    });  
  },

  async register(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const encryptedPassword = await encryptPassword(password);
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        role: "user",
        password: encryptedPassword,
      });
      return res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (e) {
      res.status(400).json({
        status: "FAIL",
        message: e.message,
      });
    }
  },
};
