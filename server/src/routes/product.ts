import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { userModel } from "../models/user";
import { verifyToken } from "./user";
import { UserErrors, ProductErrors } from "../errors";
import { verify } from "crypto";

const router = Router();

router.get("/", verifyToken, async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});

    res.json({ products }); // send all the products back to the front end
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  // money goes down, item gets added, quantity of item goes down
  const { customerID, cartItems } = req.body;

  try {
    const user = await userModel.findById(customerID); // first find user by id from database
    const productIDs = Object.keys(cartItems); // get id's of everything in the cart
    const products = await ProductModel.find({ _id: { $in: productIDs } }); // get actual products array based on id's

    if (!user) {
      return res.status(400).json({
        type: UserErrors.NO_USER_FOUND,
      }); // if didn't find a user in db, return an error
    }

    if (products.length !== productIDs.length) {
      return res.status(400).json({
        type: ProductErrors.NO_PRODUCT_FOUND,
      }); // if length of products array doesn't equal product id's array
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({
          type: UserErrors.NO_USER_FOUND,
        });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({
          type: ProductErrors.NOT_ENOUGH_STOCK,
        });
      }
      // calculating total price of items in the cart ...
      totalPrice += product.price * cartItems[item];
    }
    // if user doesn't have enough money, send error
    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs); // push all the product id's that the user purchased to the user

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } } // update each item's stock quantity to -1 of what it was
    );

    res.json({ purchasedItems: user.purchasedItems})
    
  } catch (err) {
    res.status(400).json(err);
  }
});

export { router as productRouter };
