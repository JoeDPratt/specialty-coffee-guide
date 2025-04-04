'use client';

import { useQuery } from '@tanstack/react-query';
import Image from "next/image";
import SCGLogo from "@/assets/scg-logo-hz-dark.svg";
import SCGIcon from "@/assets/scg-logomark-red.svg";
import SCALogo from "@/assets/sca-logo.svg";
import ProdcutPlaceholder from "/placeholders/coffee_product_placeholder.svg"
import { JSX } from "react";
import { Product } from "@/types/product";
import ProvenanceSection from "@/components/product/ProvenanceSection";
import AttributeSection from "@/components/product/AttributeSection";
import SafeHtml from '@/components/shared/SafeHtml';
import BrandLogo from "@/components/product/BrandLogo"
import ProductOptionsList from "@/components/product/ProductOptionsList";

interface ProductPageProps {
    product: Product;
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
    const bgColor = colorMap[roast?.toLowerCase()]?.bg ?? "bg-gray-600";
    console.log("ROAST LABEL", bgColor);

    return (
        <span
            aria-label={`${roast} roast`}
            className={`${bgColor} text-white px-3 py-1.5 font-bold leading-5 tracking-wider`}>{roast.toUpperCase()}
        </span>
    )
}

// Define the fetch function for the client
const fetchProductBySlugFromApi = async (slug: string): Promise<Product> => {
    const response = await fetch(`/api/products/${slug}`);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data as Product; // Assume the API returns data matching the Product type
};

export default function ProductPage({ slug }: { slug: string }) {

    console.log("Product Page Component...", slug);
    const { data: product, isLoading, isError, error } = useQuery<Product, Error>({
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlugFromApi(slug),
    });

    if (isLoading) return <p>Loading…</p>;

    if (isError) {
        console.error("Error fetching product:", error);
        return <p>Error loading product: {error.message}</p>;
    }

    // If hydration worked and no error, product should be available
    if (!product) return <p>Product not found</p>;

    const flavors = product.flavours.join(" • ");

    return (
        <>
            {/* Dynamic product metadata */}
            {/* <Head>
                <title>{`${product.product_name} | Buy Specialty Coffee from ${product.roaster}`}</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={product.product_name} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={product.images?.[0]?.image_url || ''} />
                <meta property="og:type" content="product" />
                {firstVariant && (
                    <>
                        <meta property="product:price:amount" content={(firstVariant?.price ?? 0).toString()} />
                        <meta property="product:price:currency" content={firstVariant?.currency || 'GBP'} />
                    </>
                )}
            </Head> */}

            <div className="w-full">
                {/* SITE HEADER: Contains logo/branding */}
                <header className="bg-pr-800 flex justify-center gap-3 items-center h-20" role="banner" aria-label="SCG site header">
                    <SCGLogo />
                </header>

                {/* MAIN CONTENT AREA */}
                <main role="main" id="main-content" className="lg:max-w-[1400px] w-full mx-auto md:max-lg:max-w-172 font-teko text-pr-800 dark:text-white xl:px-20 xl:pt-20 sm:px-6.5 sm:pt-12 px-4 pt-12 md:pt-20">

                    {/* PRODUCT INFO SECTION */}
                    <section id="coffee-info" aria-labelledby="product-title" role="region" className="flex flex-col lg:flex-row w-full xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16">

                        {/* LEFT COLUMN: Product image */}
                        <div className="lg:sticky lg:top-8 relative aspect-square lg:self-start lg:w-auto lg:flex-1 border-pr-100 sm:border-16 border-8 order-1">
                            <Image
                                src={product.images[2]?.image_url ?? "/placeholders/coffee-placeholder.svg"}
                                alt={`${product.images[0]?.alt_text || product.product_name} specialty coffee product`}
                                fill
                                className="object-cover bg-pr-100"
                            />
                        </div>

                        {/* RIGHT COLUMN: Product details and attributes */}
                        <div id="product-details" aria-label="Product details section" role="region" className="@container text-left flex-1 sm:min-w-[350px] order-2">
                            <BrandLogo
                                src={product.roaster.logo_img_url}
                                alt={product.roaster.alt_text}
                                aria-label={product.roaster.alt_text}
                                height={32}
                                width={32}
                                className="h-8 w-auto mb-7 dark:mb-6.5 dark:bg-white dark:border-4 dark:border-white dark:p-1"
                            />
                            <h1 className="mb-1">{product.product_name}</h1>
                            <div id="roast-flavours" className="font-sofia-sans-condensed text-xl flex flex-col items-start gap-2 pb-11">
                                <div
                                    id="roasts"

                                    className="flex flex-row gap-1 pb-1 sm:pb-1 md:pb-1">
                                    {product?.roasts.map((roast, index) => (
                                        <RoastLabel
                                            roast={roast.toLowerCase()}
                                            key={roast}
                                        />
                                    ))}
                                </div>
                                <span className="font-sofia-sans font-medium">{flavors}</span>
                            </div>
                            <p>{product.description}</p>
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none h-0.5 w-full @sm:mt-11.5 mt-10.5 mb-9 @sm:mb-8"></hr>
                            <div className="flex flex-col @sm:flex-row flex-1">

                                {/* Product attributes: e.g. Organic, Fairtrade */}
                                <AttributeSection
                                    attributeData={product?.attribute || {}}
                                />
                                <div className="@sm:w-1/3 w-full @sm:py-0 pb-8.25 @sm:pb-0 flex flex-row items-center gap-4 @sm:order-2 order-1 @sm:border-none border-b-2 border-pr-300 shadow-b-neumorphic @sm:shadow-none">
                                    <SCALogo
                                        role="img"
                                        aria-label="Specialty Coffee Association cup score logo"
                                        className="h-[64px] w-auto fill-pr-800 dark:fill-white"
                                    />
                                    <div className="font-sofia-sans">
                                        <div className="text-lg font-light pl-1 pb-1.25">Cup score</div>
                                        {product.sca_cup_score ?
                                            <div className="text-5xl -mt-2">{product.sca_cup_score}</div>
                                            :
                                            <div className=" pl-1 text-xl -mt-2 opacity-50">Unrated</div>
                                        }
                                    </div>
                                </div>

                            </div>
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none h-0.5 w-full mb-7.25 mt-7.5"></hr>

                            {/* Provenance details such as origin, producer, altitude */}
                            <ProvenanceSection provenanceData={product?.provenance} />
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none h-0.5 w-full @sm:mt-0.25 mt-1.25"></hr>
                        </div>
                    </section>

                    {/* Specialty Coffee Guide Insight – high-value content section */}
                    <section
                        id="specialty-coffee-guide"
                        role="region"
                        aria-labelledby="scg-insight-heading"
                        className="flex flex-col-reverse lg:flex-row w-full xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16 pb-8"
                    >
                        {product.insight ? <div id="scg-insight" className="flex-1 lg:mt-20">
                            <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:justify-items-center">
                                <SCGIcon className="mb-4 lg:mb-2" />
                                <h2 id="scg-insight-heading" className="text-center lg:text-left">Specialty Coffee Guide Insight</h2>
                            </div>
                            <div className="pb-1 pt-4"><SafeHtml html={product.insight} />
                            </div>
                        </div>
                            : <div id="scg-insight" className="flex-1 lg:mt-20" />}

                        {/* Purchase options – links to the brand's product page */}
                        <div id="product-options" className="dark:text-pr-800 lg:sticky lg:top-8 relative lg:w-[calc(50%-36px)] lg:self-start lg:mt-8.75 mt-12.75">
                            <h2 className="pb-1.25">Buy this coffee</h2>
                            <ProductOptionsList
                                roaster={product.roaster}
                                productOptions={product.product_variants}
                                url={product.product_url}
                            />
                        </div>
                    </section>
                    <section className="bg-white h-200">
                    </section>
                </main>
            </div>
        </>
    );
}
