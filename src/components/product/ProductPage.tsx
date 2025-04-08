'use client';

import { useQuery } from '@tanstack/react-query';
import Image from "next/image";
import SCGLogo from "@/assets/scg-logo-hz-dark.svg";
import SCGIcon from "@/assets/scg-logomark-red.svg";
import { JSX } from "react";
import { Product } from "@/types/product";
import ProvenanceSection from "@/components/product/ProvenanceSection";
import AttributeSection from "@/components/product/AttributeSection";
import SafeHtml from '@/components/shared/SafeHtml';
import BrandLogo from "@/components/product/BrandLogo"
import ProductOptionsList from "@/components/product/ProductOptionsList";
import FollowButton from '../shared/FollowButton';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { cloudinaryLoader } from '@/utils/image/cloudinaryLoader';

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
            className={`${bgColor} text-white font-sofia-sans px-1.5 pt-1.5 pb-1 text-center text-base font-bold leading-3 tracking-wider`}>{roast.toUpperCase()}
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
    console.log("BRAND LOGO URL:", product.roaster.logo_img_url)
    const flavors = product.flavours.join(" • ");
    console.log("LPPKG", product.lowest_price_per_kg)

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
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Coffee Beans", href: "/coffee-beans" },
                        { label: "Passion Fruit Filter" }
                    ]}
                    className={"lg:max-w-[1400px] mx-auto md:max-lg:max-w-172 pt-3 xl:px-20 sm:px-6.5 px-4"}
                />


                {/* MAIN CONTENT AREA */}
                <main role="main" id="main-content" className="lg:max-w-[1400px] w-full mx-auto md:max-lg:max-w-172 font-teko text-pr-800 dark:text-white xl:px-20 sm:px-6.5 px-4 -mt-0.5">


                    {/* PRODUCT INFO SECTION */}
                    <section id="coffee-info" aria-labelledby="product-title" role="region" className="flex flex-col lg:flex-wrap lg:flex-row w-full xl:gap-16 gap-12 mt-1.5">

                        {/* CENTRE TOP COLUMN: Product Name*/}
                        <div className="flex flex-col w-full items-center justify-center gap-4">
                            <BrandLogo
                                src={product.roaster.logo_img_url}
                                alt={product.roaster.alt_text}
                                layout={product.roaster.logo_layout}
                                baseHeight={48}
                            />
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none w-full lg:w-1/3 mx-auto h-0.5 mt-3.75 mb-2.25"></hr>
                            {product?.roasts[0] && <div
                                id="roasts"
                                className="flex flex-row gap-1 pb-1 mt-1.5">
                                {product?.roasts.slice(0, 1).map((roast, index) => (
                                    <RoastLabel
                                        roast={roast.toLowerCase()}
                                        key={roast}
                                    />
                                ))}</div>}
                            <h1 className="text-center w-full text-6xl lg:w-2/3 mx-auto leading-12 -mb-3 mt-2">{product.product_name.toUpperCase()}</h1>
                            <div id="roast-flavours" className="flex flex-row flex-wrap mt-0.75 items-center justify-center gap-2 mx-auto w-full lg:w-2/3">

                                <span className="font-sofia-sans text-lg pb-0.75">{product.roasts[0] ? `${flavors}` : flavors}</span>
                            </div>
                            <div className="flex items-end mt-3 mb-4">
                                <FollowButton
                                    isFollowing={false}
                                    onToggle={() => console.log("follow toggled")}
                                    labelType="coffee"
                                    showLabel={true}
                                />
                            </div>
                        </div>

                        {/* LEFT COLUMN: Product image */}
                        <div className="flex flex-col lg:top-8 lg:sticky lg:self-start lg:flex-1 bg-pr-100 sm:p-6 p-4 border-2 shadow-b-neumorphic border-pr-300">

                            <div className="w-full relative aspect-square order-2">
                                <Image
                                    loader={cloudinaryLoader}
                                    src={product.images[0]?.image_url ?? "/placeholders/coffee-placeholder.svg"}
                                    alt={`${product.images[0]?.alt_text || product.product_name} specialty coffee product`}
                                    fill
                                    className="object-cover bg-pr-100"
                                />
                            </div>
                            {/* <div className="order-1">
                                <AttributeSection
                                    attributeData={product?.attribute || {}}
                                />
                            </div> */}
                        </div>


                        {/* RIGHT COLUMN: Product details and attributes */}
                        <div id="product-details" aria-label="Product details section" role="region" className="@container lg:flex-1 sm:min-w-[350px] px-0 xs:px-2 sm:px-6 lg:px-0">

                            <AttributeSection
                                attributeData={product?.attribute || {}}
                            />
                            <p className="text-left font-base pt-14">{product.description}</p>
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none h-0.5 w-full mb-12 mt-12"></hr>
                            {/* Provenance details such as origin, producer, altitude */}
                            <ProvenanceSection provenanceData={product?.provenance} />
                            <hr className="text-pr-300 shadow-b-neumorphic bg-pr-300 color-pr-300 border-none h-0.5 w-full mt-6"></hr>
                            {/* Purchase options – links to the brand's product page */}
                            <div id="product-options" className="dark:text-pr-800 lg:sticky lg:top-8 relative lg:self-start lg:mt-16.75 mt-12.75">

                                <h2 className="pb-1.25">Available from</h2>
                                <a
                                    href={product.product_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full xs:w-[calc(50%-8px)] "
                                    aria-label={"Get this coffee"}
                                    role="listitem"
                                >
                                    <div className="group flex flex-col bg-pr-50 xs:flex-row w-auto pt-6 pb-2 gap-6 xs:p-4 border-2 shadow-b-neumorphic border-pr-300 hover:border-sc-100 hover:bg-pr-100 hover:shadow-none mb-4 items-center justify-between transition-colors duration-150 ease-in-out">
                                        <BrandLogo
                                            src={product.roaster.logo_img_url}
                                            alt={product.roaster.alt_text}
                                            className="pl-3 mt-0.25"
                                            layout={product.roaster.logo_layout}
                                            baseHeight={32}
                                        />
                                        <div
                                            className="flex-1 text-sc-100 py-4 xs:pt-0 xs:pb-0.5 text-right font-sofia-sans-condensed font-black text-3xl border-t-2 border-pr-300 xs:border-none"
                                            aria-hidden="true"
                                        >
                                            <span className="text-xl font-bold tracking-wide">
                                                IN-STOCK: VISIT STORE →
                                            </span>
                                            <span className="hidden">→</span>
                                        </div>
                                    </div>
                                </a>
                                <ProductOptionsList
                                    lowestPricePerKg={product.lowest_price_per_kg}
                                    productOptions={product.product_variants}
                                    url={product.product_url}
                                />
                            </div>
                        </div>


                    </section>

                    {/* Specialty Coffee Guide Insight – high-value content section */}
                    <section
                        id="specialty-coffee-guide"
                        role="region"
                        aria-labelledby="scg-insight-heading"
                        className="flex flex-col-reverse lg:flex-row w-full lg:w-2/3 mx-auto xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16 pb-8 mt-20"
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

                    </section>
                    {/* <section className="bg-white h-200">
                    </section> */}
                </main>
            </div >
        </>
    );
}
