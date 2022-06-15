// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import { Router } from "express";
import upload from "../utils/storage.mjs";
import categorieController from "../controllers/categorieController.mjs";
import itemController from "../controllers/itemController.mjs";
import cartController from "../controllers/cartController.mjs";

const router = Router();


// Categories
router.get("/categories", categorieController.getCategories);
router.post("/categorie",upload.single('image'),categorieController.addCategorie);
router.delete("/categorie/:id",categorieController.delCategorie);
router.put("/categorie/:id",upload.single('image'),categorieController.updateCategorie);


// Items
router.get("/categorie/:id/items", itemController.getItems)
router.post("/categorie/:id/item",upload.single('image'),itemController.addItem)
router.delete("/item/:id",itemController.delItem)
router.put("/item/:id",upload.single('image'),itemController.updateItem)
router.put("/item/:id/increment",itemController.incrementItem)
router.put("/item/:id/decrement",itemController.decrementItem)

// Cart
router.get("/cart", cartController.getCart)




export default router;