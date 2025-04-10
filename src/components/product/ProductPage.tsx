"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import SCGLogo from "@public/logos/scg-logo-stacked.svg";
import SCGIcon from "@/assets/scg-logomark-red.svg";
import type { Product } from "@/types/product";
import ProvenanceSection from "@/components/product/ProvenanceSection";
import AttributeSection from "@/components/product/AttributeSection";
import SafeHtml from "@/components/shared/SafeHtml";
import BrandLogo from "@/components/product/BrandLogo";
import ProductOptionsList from "@/components/product/ProductOptionsList";
import FollowButton from "../shared/FollowButton";
import CupScoreBadge from "../shared/product/CupScoreBadge";
import { cloudinaryLoader } from "@/utils/image/cloudinary";
import { fetchProductBySlug } from "@/lib/fetchers/products";
import RoastLabel from "../shared/product/RoastLabel";
import type { JSX } from "react";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, subtleSpring } from "@/utils/animation";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ slug }: { slug: string }): JSX.Element {
  console.log("Product Page Component...", slug);
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });

  if (isLoading) return <p>Loading…</p>;

  if (isError) {
    console.error("Error fetching product:", error);
    return <p>Error loading product: {error.message}</p>;
  }

  // If hydration worked and no error, product should be available
  if (!product) return <p>Product not found</p>;
  const flavors = product.flavours.join(" • ");

  console.log("LPPKG", product.lowest_price_per_kg);

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

      {/* <div className="w-full"> */}
      {/* SITE HEADER: Contains logo/branding */}
      {/* <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Coffee Beans", href: "/coffee-beans" },
                    { label: "Passion Fruit Filter" }
                ]}
                className={"lg:max-w-[1400px] mx-auto md:max-lg:max-w-172 pt-3.25 xl:px-20 sm:px-6.5 px-4"}
            /> */}

      {/* MAIN CONTENT AREA */}
      <motion.main
        role="main"
        id="main-content"
        className="layout-container text-pr-800 dark:text-white pt-1 mt-17.5"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* PRODUCT INFO SECTION */}
        <section
          id="coffee-info"
          aria-labelledby="product-title"
          role="region"
          className="flex flex-col lg:flex-wrap lg:flex-row w-full xl:gap-16 gap-12 mt-1.5"
        >
          {/* Background + Content Layer */}

          {/* FOREGROUND CONTENT */}
          <motion.div
            className="flex flex-col relative z-10 w-full items-center justify-center gap-4"
            variants={fadeUpItem}
          >
            <BrandLogo
              src={product.roaster.logo_img_url}
              alt={product.roaster.alt_text}
              layout={product.roaster.logo_layout}
              baseHeight={48}
            />
            <hr className="hr-neu-shadow w-1/2 lg:w-1/3 mx-auto mt-3.75 mb-2.25" />

            <h1 className="text-center w-full text-6xl lg:text-7xl lg:w-3/4 mx-auto leading-12 lg:leading-14 -mb-3 mt-2 ">
              {product.product_name.toUpperCase()}
            </h1>

            <div
              id="roast-flavours"
              className="flex flex-row flex-wrap -mt-0.25 -mb-1.5 items-center font-sofia-sans text-lg justify-center gap-2 mx-auto w-full lg:w-2/3"
            >
              {flavors}
            </div>
            <RoastLabel roasts={product?.roasts} />
            <div className="flex items-end mt-4.75 mb-6">
              <FollowButton
                isFollowing={false}
                onToggle={() => console.log("follow toggled")}
                labelType="coffee"
                showLabel={true}
              />
            </div>
          </motion.div>

          {/* LEFT COLUMN: Product image */}
          <motion.div
            className="flex flex-col lg:top-8 lg:sticky lg:self-start lg:flex-1 bg-pr-100 sm:p-6 p-4 border-2 shadow-b-neumorphic border-pr-300"
            variants={fadeUpItem}
          >
            <motion.div
              layoutId={`product-image-${product.slug}`}
              transition={subtleSpring}
              className="w-full relative aspect-square order-2"
            >
              <CupScoreBadge
                score={product.sca_cup_score}
                className="absolute bottom-0 -mb-8 lg:top-0 lg:-mt-8.5 left-1/2 -translate-x-1/2 lg:left-8/10 z-10 px-4 rounded-full"
              />
              <Image
                loader={cloudinaryLoader}
                src={
                  product.images[0]?.image_url ??
                  "/placeholders/coffee-placeholder.svg"
                }
                alt={`${product.images[0]?.alt_text || product.product_name} specialty coffee product`}
                fill
                className="object-cover bg-pr-100"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Product details and attributes */}
          <motion.div
            id="product-details"
            aria-label="Product details section"
            role="region"
            className="@container lg:flex-1 sm:min-w-[350px] px-0 xs:px-2 sm:px-6 lg:px-0"
            variants={fadeUpItem}
          >
            <AttributeSection attributeData={product?.attribute || {}} />
            <p className="text-left font-base pt-14">{product.description}</p>
            <hr className="hr-neu-shadow w-full mb-12 mt-16"></hr>
            {/* Provenance details such as origin, producer, altitude */}
            <ProvenanceSection provenanceData={product?.provenance} />
            <hr className="hr-neu-shadow w-full mt-6"></hr>
            {/* Purchase options – links to the brand's product page */}
            <div
              id="product-options"
              className="dark:text-pr-800 lg:sticky lg:top-8 relative lg:self-start lg:mt-16.75 mt-12.75"
            >
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
          </motion.div>
        </section>

        {/* Specialty Coffee Guide Insight – high-value content section */}
        <section
          id="specialty-coffee-guide"
          role="region"
          aria-labelledby="scg-insight-heading"
          className="flex flex-col-reverse lg:flex-row w-full lg:w-2/3 mx-auto xl:gap-20 lg:gap-10 md:gap-12 sm:gap-13.5 gap-16 pb-8 mt-20"
        >
          {product.insight ? (
            <div id="scg-insight" className="flex-1 lg:mt-20">
              <div className="flex flex-col items-center lg:flex-row lg:gap-4 lg:justify-items-center">
                <SCGIcon className="mb-4 lg:mb-2" />
                <h2
                  id="scg-insight-heading"
                  className="text-center lg:text-left"
                >
                  Specialty Coffee Guide Insight
                </h2>
              </div>
              <div className="pb-1 pt-4">
                <SafeHtml html={product.insight} />
              </div>
            </div>
          ) : (
            <div id="scg-insight" className="flex-1 lg:mt-20" />
          )}
        </section>
        {/* <section className="bg-white h-200">
                    </section> */}
      </motion.main>
    </>
  );
}
