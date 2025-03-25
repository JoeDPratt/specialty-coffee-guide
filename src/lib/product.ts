// lib/products.ts
import { Product } from '@/types/product';

const testHTML = `<p>Wogan Coffee's Indonesia Sumatra Mandheling is a distinguished single-origin coffee that stands out for its deep, robust flavor profile and meticulous production process. Sourced from the Permata Gayo co-operative in Sumatra's Aceh Province, this coffee is cultivated at elevations ranging from 1,200 to 1,600 meters, utilizing the unique Giling-Basah processing method.</p>
<h3>Flavor Profile and Roast</h3>
<p>This offering is Wogan Coffee's darkest roast, taken through the beginning of the second crack to achieve a smoky, intense flavor. Despite its boldness, it maintains nuanced notes of red berries and dark chocolate, providing a complex and satisfying cup.</p>
<h3>Processing Method</h3>
<p>The Giling-Basah, or wet-hulled process, is distinctive to Indonesia. It involves drying the green coffee beans to three different levels of humidity as they are transported down the mountain. This method imparts a slightly blue hue to the raw beans and contributes to the coffee's full-bodied, low-acidity profile.</p>
<h3>Certifications and Sustainability</h3>
<p>This coffee is both Organic and Fairtrade certified, reflecting Wogan Coffee's commitment to ethical sourcing and environmental sustainability. The Permata Gayo co-operative, established in 2006, emphasizes traceability and quality, managing all aspects of production to ensure consistency and excellence.</p>
`

const test_products: Product[] = [
    {
        "brand": "RAVE Coffee",
        "product_name": "Guatemala Bosques de San Francisco Nº 52",
        "product_url": "https://ravecoffee.co.uk/products/guatemala-bosques-de-san-francisco?variant=19388682141750",
        "slug": "rave-coffee-guatemala-bosques-de-san-francisco-52",
        "flavours": [
            "Milk Chocolate",
            "Red Apple",
            "Toffee"
        ],
        "roasts": ["dark", "light"],
        "grinds": [],
        "product_variants": [
            {
                "weight": 250,
                "weight_unit": "g",
                "price": 9.95,
                "currency": "GBP",
                "discount_percent": "",
                "is_soldout": false
            },
            {
                "weight": 500,
                "weight_unit": "g",
                "price": 21.05,
                "currency": "GBP",
                "discount_percent": "",
                "is_soldout": false
            },
            {
                "weight": 1000,
                "weight_unit": "g",
                "price": 33.85,
                "currency": "GBP",
                "discount_percent": "",
                "is_soldout": false
            }
        ],
        "images": [
            {
                "image_url": "https://ravecoffee.co.uk/cdn/shop/files/052_Guatemala_Bosques_De_San_Francisco_250g_NEW_1000x1000.jpg?v=1710430006",
                "alt_text": "Guatemala Bosques de San Francisco Nº 52"
            },
        ],
        "description": "We've worked with Marta Dalton and her family over the last few years through her company Coffee Bird, in fact most of our Guatemalan coffees have come through her! We decided that the Dalton family farm had produced something perfect for us, a balanced sweet coffee with notes of Red apple and Toffee.",
        "insight": testHTML,
        "attribute": {
            "is_organic": true,
            "is_mycotoxin_free": null,
            "is_decaf": false,
            "is_fairtrade": true
        },
        "is_single_origin": null,
        "sca_cup_score": 86.5,
        "provenance": {
            "origin_countries": [
                "Guatemala"
            ],
            "origin_regions": [
                "Bosques de San Francisco"
            ],
            "producers": [
                "Dalton family"
            ],
            "altitude": {
                "min": 1600,
                "max": 1800
            },
            "varietals": [],
            "processes": []
        },
        "brewing_info": {
            "suggested_brewing_method": "",
            "dose": "",
            "yield": "",
            "extraction_time": "",
            "ratio": "",
            "temperature": ""
        }
    }
];


export async function getProductBySlug(slug: string): Promise<Product | null> {
    return test_products.find(p => p.slug === slug) || null
  }