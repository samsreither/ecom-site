import {Router, Request, Response} from 'express'

const router = express.Router();



router.post("/register", async (req: Request, res: Response) => {
    const {username, password} = req.body; // send username + password from front to back
})

export {router as userRouter}