import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { v4 as uuidv4, v4 } from "uuid";

export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  // validation
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Answer is required",
    });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: uuidv4(),
  });
  try {
    await user.save();

    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "no user found",
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;
  // validation
  if (!newPassword || newPassword < 6) {
    return res.json({
      error: "Wrong password",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats, Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: "Password is required and should be min 6 characters long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }
    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });

    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
  }
};

export const findPeople = async (req, res) => {
  try {
    // get own user
    const user = await User.findById(req.user._id);

    // get user following
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } }).limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};
