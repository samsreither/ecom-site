import express, { Router, Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { IUser, userModel } from "../models/user";
import { UserErrors } from "../errors";

const router: Router = express.Router()

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body; // send username + password from front to back
  // have to add try in case there are errors (on server, other errors, etc)
  try {
    const user = await userModel.findOne({ username });
    // if user already in database, return that it already exists
    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user modal with username and hashed password
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User Registered Sccessfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password} = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ type: UserErrors.NO_USER_FOUND})
        }

        // compare password entered to hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS})
        }

        const token = jwt.sign({id: user._id}, "secret") // assign token with id
        res.json({ token, userID: user._id}); // send response back

    } catch (err) {
        res.status(500).json({ type: err});
    }
})

// check token from front end before checking username and password
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403)
            }

            next(); // no errors in the authheader, keep going...
        })
    }

    return res.sendStatus(401) // if no authheader at all, return 401
}

export { router as userRouter }