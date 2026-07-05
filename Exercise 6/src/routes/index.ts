import { Request, Response, Router } from "express";
import { Offer, IOffer } from "../models/Offer";
import { Image, IImage } from "../models/Image";
import upload from "../middleware/multer-config";

const router: Router = Router();

// 1 & 2. upload offer (with or without image)
router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;
        // console.log(title, description, price);

        // no image 
        if (!req.file) {
            const offer: IOffer = new Offer({
                title,
                description,
                price: Number(price), // convert in case
                imageId: "default"
            });

            await offer.save();
            // console.log("Offer saved:", offer);

            return res.status(201).json({message: "Offer created successfully"});
        }

        // image exists 
        const imgPath = req.file.path.replace("public", "");

        const image: IImage = new Image({
            filename: req.file.filename,
            path: imgPath
        });

        await image.save();
        // console.log("Image saved:", image);

        const offer: IOffer = new Offer({
            title,
            description,
            price: Number(price), // convert in case
            imageId: image._id.toString() // save _id into imageID
        });

        await offer.save();

        return res.status(201).json({message: "Offer created successfully"});

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
});


// 3. Get all offers
router.get("/offers", async (req: Request, res: Response) => {

    try {
        const offers: IOffer[] = await Offer.find();
        // console.log("Offers:", offers);
        const response = await Promise.all(

            offers.map(async (offer) => {
                let image = null;

                if (offer.imageId !== "default") {
                    image = await Image.findById(offer.imageId);
                }

                return { //moodle
                    title: offer.title,
                    description: offer.description,
                    price: offer.price,
                    imagePath: image ? image.path : null
                };
            })
        );

        res.json(response);

    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;