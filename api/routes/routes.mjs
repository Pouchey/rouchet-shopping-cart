// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
import { Router } from "express";
import upload from "../utils/storage.mjs";
import * as categorieController from "../controllers/categorieController.mjs";

const router = Router();

router.get("/categorie", categorieController.getCategories);
router.post("/categorie",upload.single('image'),categorieController.addCategorie);
router.delete("/categorie/:id",categorieController.delCategorie);
router.put("/categorie/:id",upload.single('image'),categorieController.updateCategorie);


export default router;