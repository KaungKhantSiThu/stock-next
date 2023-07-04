import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(jsonDirectory + "/products.json", "utf8");
    const products = JSON.parse(fileContents);

    const p = products.find((product) => product.id === (+req.query.id));
    
    if (!p) {
        res.status(404).json({ message: "Product not found" });
        return;
    }
    res.json(p);
}
