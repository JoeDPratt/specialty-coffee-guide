import Image from "next/image";
import SCGLogo from "@/assets/scg-logo-hz-dark.svg";
import SCGIcon from "@/assets/scg-logomark-red.svg";
import SCALogo from "@/assets/sca-logo.svg";
import ProductImage from "@/assets/test-product-image.jpg";
import BrandLogo from "@/assets/rave.png";
import { JSX } from "react";
import { Product } from "@/types/product";
import SafeHtml from '@/components/shared/SafeHtml';

interface AttributeItemProps {
    flagName: string;
    position: number;
    isActive?: boolean
}

interface ProvenanceItemProps {
    label: string;
    value: string;
    isActive?: boolean
}
const testHTML = `<p>Wogan Coffee's Indonesia Sumatra Mandheling is a distinguished single-origin coffee that stands out for its deep, robust flavor profile and meticulous production process. Sourced from the Permata Gayo co-operative in Sumatra's Aceh Province, this coffee is cultivated at elevations ranging from 1,200 to 1,600 meters, utilizing the unique Giling-Basah processing method.</p>
<h3>Flavor Profile and Roast</h3>
<p>This offering is Wogan Coffee's darkest roast, taken through the beginning of the second crack to achieve a smoky, intense flavor. Despite its boldness, it maintains nuanced notes of red berries and dark chocolate, providing a complex and satisfying cup.</p>
<h3>Processing Method</h3>
<p>The Giling-Basah, or wet-hulled process, is distinctive to Indonesia. It involves drying the green coffee beans to three different levels of humidity as they are transported down the mountain. This method imparts a slightly blue hue to the raw beans and contributes to the coffee's full-bodied, low-acidity profile.</p>
<h3>Certifications and Sustainability</h3>
<p>This coffee is both Organic and Fairtrade certified, reflecting Wogan Coffee's commitment to ethical sourcing and environmental sustainability. The Permata Gayo co-operative, established in 2006, emphasizes traceability and quality, managing all aspects of production to ensure consistency and excellence.</p>`

const test_product: Product = {
    "brand": "RAVE Coffee",
    "product_name": "Guatemala Bosques de San Francisco Nº 52",
    "product_url": "https://ravecoffee.co.uk/products/guatemala-bosques-de-san-francisco?variant=19388682141750",
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
        "varietals": [],
        "altitude_min": 1600,
        "altitude_max": 1800,
        "process": []
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

function AttributeItem({ flagName, position, isActive = false }: AttributeItemProps): JSX.Element {

    const gridItemClass = `grid-item-flag-${position}`;

    const colorMap: Record<string, { label: string; bg: string }> = {
        "is_organic": { label: "ORGANIC", bg: "bg-green-400" },
        "is_mycotoxin_free": { label: "MYCO FREE", bg: "bg-teal-400" }, // Tailwind doesn't have 'aqua-400'
        "is_fairtrade": { label: "FAIRTRADE", bg: "bg-brown-400" },
        "is_decaf": { label: "DECAF", bg: "bg-blue-400" }
    };

    // Default to green if the flagName doesn't exist in the map
    const { label: labelText, bg: bgColor } = colorMap[flagName] || { label: "ORGANIC", bg: "bg-green-400" };

    return (
        <div className={`w-1/2 py-2 flex flex-row gap-2 justify-left items-start self-start`}>
            <div className={`${isActive ? bgColor : "bg-pr-400"} aspect-square h-6 w-6 rounded-full inline-block`}></div>
            <div className={`${isActive ? "text-pr-800" : "text-pr-400"} leading-6`}>{labelText}</div>
        </div>
    );
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
        <span className={`${bgColor} text-white px-3 py-1.5 font-bold leading-5 tracking-wider`}>{roast.toUpperCase()}</span>
    )
}

function ProvenanceItem({ label, value, isActive = false }: ProvenanceItemProps): JSX.Element {

    return (
        <div className="font-sofia-sans text-pr-800 text-lg w-1/2 @sm:w-1/3 pb-7">
            <div className="font-extralight">{label}</div>
            {isActive ?
                <div className="font-medium">{value}</div>
                :
                <div className="font-medium text-pr-400">-</div>
            }
        </div>
    )

}


export default function Home() {

    const flavors = test_product.flavours.join(" • ");

    return (
        <div>
            <header className="bg-pr-800 flex justify-center gap-3 items-center h-20">
                <SCGLogo />
            </header>
            <main className="font-teko text-pr-800 max-w-[1400px] mx-auto xl:px-20 xl:pt-20 sm:px-6.5 sm:pt-12 px-4 pt-12 md:pt-20 md:max-lg:max-w-172">
                <section id="coffee-info" className="flex flex-col-reverse lg:flex-row w-full xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16">
                    <div className="lg:sticky lg:top-8 relative aspect-square lg:self-start lg:w-auto lg:flex-1 border-pr-100 sm:border-16 border-8 order-2">
                        <Image
                            src={ProductImage}
                            alt="Product Image"
                            fill
                            className="object-cove"
                        />
                    </div>
                    <div id="product-details" className="@container text-left flex-1 min-w-[350px] order-1">
                        <Image src={BrandLogo} alt="Brand Logo" width="85.5" height="32" className="pb-7" />
                        <h1 className="pb-1">{test_product.product_name}</h1>
                        <div id="roast-flavours" className="font-sofia-sans-condensed text-xl flex flex-col items-start gap-2 pb-11">
                            <div className="flex flex-row gap-1 pb-1 sm:pb-1 md:pb-1">
                                {test_product?.roasts.map((roast, index) => (
                                    <RoastLabel roast={roast} key={roast} />
                                ))}
                            </div>
                            {/* <span className="bg-brown-800 text-white px-2 font-bold tracking-wider">DARK</span> */}
                            <span className="font-sofia-sans font-medium">{flavors}</span>
                        </div>
                        <p>{test_product.description}</p>
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full md:mt-11.5 md:mb-8 mt-10.5 mb-8"></hr>
                        <div className="flex flex-col @sm:flex-row flex-1">
                            <div className="flex flex-row @sm:w-2/3 w-full flex-wrap font-sofia-sans-condensed text-lg tracking-wide font-medium @sm:order-1 order-2 @sm:pt-0 pt-8">
                                {Object.entries(test_product?.attribute || {})
                                    .map(([key, value], index) => (
                                        <AttributeItem
                                            key={key}
                                            flagName={key}
                                            position={index + 1}
                                            isActive={Boolean(value)}
                                        />
                                    ))}
                            </div>
                            <div className="@sm:w-1/3 w-full @sm:py-0 pb-7.5 flex flex-row items-center gap-4 @sm:order-2 order-1 @sm:border-none border-b-2 border-pr-300">
                                <SCALogo className="h-[64px] w-auto" />
                                <div className="font-sofia-sans">
                                    <div className="text-lg font-light pl-1 pb-0.25">Cup score</div>
                                    <div className="text-5xl -mt-2">{test_product.sca_cup_score}</div>
                                </div>
                            </div>

                        </div>
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full md:mb-7.25 mb:mt-6.5 mb-10 mt-7.5"></hr>
                        <div className="flex flex-row flex-wrap">
                            <ProvenanceItem label="Origin countries" value="Guatemala" isActive={true} />
                            <ProvenanceItem label="Origin region" value="Antigua" isActive={true} />
                            <ProvenanceItem label="Producers" value="-" isActive={false} />
                            <ProvenanceItem label="Altitude (masl)" value="1200-2000" isActive={true} />
                            <ProvenanceItem label="Varietals" value="Red bourboon" isActive={true} />
                            <ProvenanceItem label="Process" value="Washed" isActive={true} />
                        </div>
                        <hr className="text-pr-300 bg-pr-300 color-pr-300 border-none h-0.5 w-full @md:mt-0.25 mb-8.75"></hr>
                        <div>
                            <h2 className="pb-1.25">Available from</h2>
                            <a href={test_product.product_url} target="_blank">
                                <div className="bg-white flex flex-col wrap pt-6 px-6 pb-4.25 items-center hover:shadow-lg hover:bg-pr-100 gap-4.5">
                                    <div className="w-full flex flex-row justify-between border-b-2 border-pr-400 pb-4.5 items-center">
                                        <Image src={BrandLogo} alt="Brand Logo" className="h-[20px] w-auto" />
                                        <div className="text-sc-100 hover:underline">Visit store to purchase →</div>
                                    </div>
                                    <div className="flex flex-col gap-3.75 w-full font-sofia-sans text-lg">
                                        <div className="flex flex-row justify-between items-baseline pt-0.5 px-2">
                                            <div className="w-full text-3xl">250g</div>
                                            <div className="font-sofia-sans text-3xl text-right font-bold leading-none w-auto">£10.00<span className="font-normal text-pr-600 text-base pt-0.5 block">£40.00 /kg</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between items-baseline border-t-2 border-pr-200 pt-5 px-2">
                                            <div className="w-full text-3xl">500g</div>
                                            <div className="font-sofia-sans text-3xl text-right font-bold leading-none w-auto">£20.00<span className="font-normal text-pr-600 text-base pt-0.5 block">£40.00 /kg</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
                <section id="product-insight" className="mt-20">
                    <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:justify-items-center">
                        <SCGIcon className="mb-4 lg:mb-2" />
                        <h1 className="text-center lg:text-left">Specialty Coffee Guide Insight</h1>
                    </div>
                    <div className="w-full lg:w-2/3 bg-white mt-8 md:pt-10 pb-1 md:px-10 pt-10 px-8"><SafeHtml html={testHTML} />
                    </div>
                </section>

            </main>

        </div>
    );
}
