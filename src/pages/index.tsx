import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import FeaturedProducts from "../components/FeaturedProducts";
import { ProductFilterInterface } from "../components/Filters";
import HeroSection, { HeroSectionInterface } from "../components/HeroSection";
import LatestBlogs, { BlogInterface } from "../components/LatestBlogs";
import { ProductInteface } from "../components/Product";

// STEP 2
interface Props {
  homepage: HeroSectionInterface;
  productCategories: ProductFilterInterface[];
  featuredProducts: ProductInteface[];
  latestBlogs: BlogInterface[];
}

// STEP 3
const Home: NextPage<Props> = ({ homepage, productCategories, featuredProducts, latestBlogs }) => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>

      <HeroSection heroSectionData={homepage} productCategories={productCategories} />

      <FeaturedProducts featuredProducts={featuredProducts} />

      <LatestBlogs latestBlogs={latestBlogs} />
    </div>
  );
};

// STEP 1
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://shard-hungry-party.glitch.me/homepage");
  const homepage = await res.json();

  const resCategories = await fetch("https://shard-hungry-party.glitch.me/productCategories");
  const productCategories = await resCategories.json();

  const resProducts = await fetch(
    "https://shard-hungry-party.glitch.me/products?_start=1&_limit=4"
  );
  const featuredProducts = await resProducts.json();

  const resBlogs = await fetch("https://shard-hungry-party.glitch.me/blogs");
  const latestBlogs = await resBlogs.json();

  return {
    props: {
      homepage,
      productCategories,
      featuredProducts,
      latestBlogs,
    },
  };
};

export default Home;
