import { faker } from "@faker-js/faker";
import * as con from '../utils/GlobalConstants.mjs'

export default function generateProduct() {
    const name = faker.commerce.productName()
    return {
        [con.TITLE]: name,
        [con.CODE]: faker.commerce.isbn(),
        [con.PRICE]: Number(faker.commerce.price({ min: 10, max: 200 })),
        [con.STOCK]: Number(faker.commerce.price({ min: 10, max: 200 })),
        [con.CATEGORY]: faker.commerce.department(),
        [con.THUMBNAIL]: `https://example.com/${name}.jpg`, 
    }
}