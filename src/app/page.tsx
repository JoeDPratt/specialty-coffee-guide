import Image from "next/image";
import SCGLogo from "@/assets/scg-logo-hz-dark.svg";
import SCGIcon from "@/assets/scg-logomark-red.svg";
import SCALogo from "@/assets/sca-logo.svg";
import ProductImage from "@/assets/test-product-image.jpg";
import { JSX } from "react";
import { Product } from "@/types/product";
import ProvenanceSection from "@/components/product/ProvenanceSection";
import AttributeSection from "@/components/product/AttributeSection";
import SafeHtml from '@/components/shared/SafeHtml';
import BrandLogo from "@/components/product/BrandLogo"
import ProductOptionsList from "@/components/product/ProductOptionsList";

const testHTML = `<p>Wogan Coffee's Indonesia Sumatra Mandheling is a distinguished single-origin coffee that stands out for its deep, robust flavor profile and meticulous production process. Sourced from the Permata Gayo co-operative in Sumatra's Aceh Province, this coffee is cultivated at elevations ranging from 1,200 to 1,600 meters, utilizing the unique Giling-Basah processing method.</p>
<h3>Flavor Profile and Roast</h3>
<p>This offering is Wogan Coffee's darkest roast, taken through the beginning of the second crack to achieve a smoky, intense flavor. Despite its boldness, it maintains nuanced notes of red berries and dark chocolate, providing a complex and satisfying cup.</p>
<h3>Processing Method</h3>
<p>The Giling-Basah, or wet-hulled process, is distinctive to Indonesia. It involves drying the green coffee beans to three different levels of humidity as they are transported down the mountain. This method imparts a slightly blue hue to the raw beans and contributes to the coffee's full-bodied, low-acidity profile.</p>
<h3>Certifications and Sustainability</h3>
<p>This coffee is both Organic and Fairtrade certified, reflecting Wogan Coffee's commitment to ethical sourcing and environmental sustainability. The Permata Gayo co-operative, established in 2006, emphasizes traceability and quality, managing all aspects of production to ensure consistency and excellence.</p>
`

const test_product: Product = {
    "brand": "RAVE Coffee",
    "product_name": "Guatemala Bosques de San Francisco Nº 52",
    "product_url": "https://ravecoffee.co.uk/products/guatemala-bosques-de-san-francisco?variant=19388682141750",
    "slug": "guatemala-bosques-de-san-francisco-52",
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
            "min": 1200,
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

function RoastLabel({ roast }: { roast: string }): JSX.Element | null {

    const colorMap: Record<string, { bg: string }> = {
        "dark": { bg: "bg-brown-800" },
        "medium dark": { bg: "bg-brown-700" }, // Tailwind doesn't have 'aqua-400'
        "medium": { bg: "bg-brown-600" },
        "medium light": { bg: "bg-brown-500" },
        "light": { bg: "bg-brown-400" }
    };

    // Default to green if the flagName doesn't exist in the map
    const { bg: bgColor } = colorMap[roast];

    return (
        <span 
            aria-label={`${roast} roast`}
            className={`${bgColor} text-white px-3 py-1.5 font-bold leading-5 tracking-wider`}>{roast.toUpperCase()}
        </span>
    )
}

export default function Home() {

    const flavors = test_product.flavours.join(" • ");

    return (
        // Root wrapper for the full product page layout
        <div className="w-full">
            {/* SITE HEADER: Contains logo/branding */}
            <header className="bg-pr-800 flex justify-center gap-3 items-center h-20" role="banner" aria-label="SCG site header">
                <SCGLogo />
            </header>

            {/* MAIN CONTENT AREA */}
            <main role="main"id="main-content" className="lg:max-w-[1400px] w-full mx-auto md:max-lg:max-w-172 font-teko text-pr-800 dark:text-white xl:px-20 xl:pt-20 sm:px-6.5 sm:pt-12 px-4 pt-12 md:pt-20">

                {/* PRODUCT INFO SECTION */}
                <section id="coffee-info" aria-labelledby="product-title" role="region" className="flex flex-col lg:flex-row w-full xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16">

                    {/* LEFT COLUMN: Product image */}
                    <div className="lg:sticky lg:top-8 relative aspect-square lg:self-start lg:w-auto lg:flex-1 border-pr-100 sm:border-16 border-8 order-1">
                        <Image
                            // src={test_product.images[0]?.image_url || placeholder}
                            src={ProductImage}
                            alt={`${test_product.images[0]?.alt_text || test_product.product_name} specialty coffee product`}
                            fill
                            className="object-cove"
                        />
                    </div>

                    {/* RIGHT COLUMN: Product details and attributes */}
                    <div id="product-details" aria-label="Product details section" role="region" className="@container text-left flex-1 sm:min-w-[350px] order-2">
                        <BrandLogo 
                            src={"/rave-logo.svg"} 
                            alt={`${test_product.brand} logo`} 
                            aria-label={`${test_product.brand} logo`} 
                            height={32} 
                            width={32} 
                            className="h-8 w-auto mb-7 dark:mb-6.5 dark:bg-white dark:border-4 dark:border-white dark:p-1" 
                        />
                        <h1 className="mb-1">{test_product.product_name}</h1>
                        <div id="roast-flavours" className="font-sofia-sans-condensed text-xl flex flex-col items-start gap-2 pb-11">
                            <div 
                                id="roasts" 
                                
                                className="flex flex-row gap-1 pb-1 sm:pb-1 md:pb-1">
                                {test_product?.roasts.map((roast, index) => (
                                    <RoastLabel 
                                        roast={roast} 
                                        key={roast}
                                    />
                                ))}
                            </div>
                            <span className="font-sofia-sans font-medium">{flavors}</span>
                        </div>
                        <p>{test_product.description}</p>
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full @sm:mt-11.5 mt-10.5 mb-9 @sm:mb-8"></hr>
                        <div className="flex flex-col @sm:flex-row flex-1">

                            {/* Product attributes: e.g. Organic, Fairtrade */}
                            <AttributeSection 
                                attributeData={test_product?.attribute || {}} 
                            />
                            <div className="@sm:w-1/3 w-full @sm:py-0 pb-8.25 @sm:pb-0 flex flex-row items-center gap-4 @sm:order-2 order-1 @sm:border-none border-b-2 border-pr-300">
                                <SCALogo 
                                    role="img"
                                    aria-label="Specialty Coffee Association cup score logo"
                                    className="h-[64px] w-auto fill-pr-800 dark:fill-white" 
                                />
                                <div className="font-sofia-sans">
                                    <div className="text-lg font-light pl-1 pb-1.25">Cup score</div>
                                    {!test_product.sca_cup_score ?
                                        <div className="text-5xl -mt-2">{test_product.sca_cup_score}</div> 
                                        :
                                        <div className=" pl-1 text-xl -mt-2 opacity-50">Unrated</div> 
                                    }
                                </div>
                            </div>

                        </div>
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full mb-7.25 mt-7.5"></hr>

                        {/* Provenance details such as origin, producer, altitude */}
                        <ProvenanceSection provenanceData={test_product?.provenance} />
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full @sm:mt-0.25 mt-1.25"></hr>
                    </div>
                </section>

                {/* Specialty Coffee Guide Insight – high-value content section */}
                <section 
                    id="specialty-coffee-guide" 
                    role="region" 
                    aria-labelledby="scg-insight-heading" 
                    className="flex flex-col-reverse lg:flex-row w-full xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16 pb-8"
                >
                    {testHTML ? <div id="scg-insight" className="flex-1 lg:mt-20">
                        <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:justify-items-center">
                            <SCGIcon className="mb-4 lg:mb-2" />
                            <h2 id="scg-insight-heading" className="text-center lg:text-left">Specialty Coffee Guide Insight</h2>
                        </div>
                        <div className="pb-1 pt-4"><SafeHtml html={testHTML} />
                        </div> 
                    </div> 
                    : <div id="scg-insight" className="flex-1 lg:mt-20" /> }

                    {/* Purchase options – links to the brand's product page */}
                    <div id="product-options" className="dark:text-pr-800 lg:sticky lg:top-8 relative lg:w-[calc(50%-36px)] lg:self-start lg:mt-8.75 mt-12.75">
                        <h2 className="pb-1.25">Buy this coffee</h2>
                        <ProductOptionsList 
                            brand={test_product.brand}
                            productOptions={test_product.product_variants} 
                            url={test_product.product_url} 
                            brandLogoUrl="/rave-logo.svg" 
                        />
                    </div>
                </section>
                <section className="bg-white h-200">
                </section>

            </main>

        </div>
    );
}
