"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Offer_1 = require("../models/Offer");
const Image_1 = require("../models/Image");
const multer_config_1 = __importDefault(require("../middleware/multer-config"));
const router = (0, express_1.Router)();
// 1 & 2. upload offer (with or without image)
router.post("/upload", multer_config_1.default.single("image"), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        // console.log(title, description, price);
        // no image 
        if (!req.file) {
            const offer = new Offer_1.Offer({
                title,
                description,
                price: Number(price), // convert in case
                imageId: "default"
            });
            await offer.save();
            // console.log("Offer saved:", offer);
            return res.status(201).json({ message: "Offer created successfully" });
        }
        // image exists 
        const imgPath = req.file.path.replace("public", "");
        const image = new Image_1.Image({
            filename: req.file.filename,
            path: imgPath
        });
        await image.save();
        // console.log("Image saved:", image);
        const offer = new Offer_1.Offer({
            title,
            description,
            price: Number(price), // convert in case
            imageId: image._id.toString() // save _id into imageID
        });
        await offer.save();
        return res.status(201).json({ message: "Offer created successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// 3. Get all offers
router.get("/offers", async (req, res) => {
    try {
        const offers = await Offer_1.Offer.find();
        // console.log("Offers:", offers);
        const response = await Promise.all(offers.map(async (offer) => {
            let image = null;
            if (offer.imageId !== "default") {
                image = await Image_1.Image.findById(offer.imageId);
            }
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: image ? image.path : null
            };
        }));
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
