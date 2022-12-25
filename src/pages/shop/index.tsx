import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import Filters, { ProductFilterInterface } from "../../components/Filters";
import Product, { ProductInteface } from "../../components/Product";

interface Props {
  products: ProductInteface[];
  productCategories: ProductFilterInterface[];
  productSizes: ProductFilterInterface[];
}

const Shop: NextPage<Props> = ({ products, productCategories, productSizes }) => {
  // if there are filters -> scroll the results into view
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      window.scrollTo({
        top: resultsRef.current?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Shop</title>
      </Head>

      <Breadcrumbs title="Shop" />

      <section className="product spad" ref={resultsRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <Filters productCategories={productCategories} productSizes={productSizes} />
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="row">
                {products.length > 0 ? (
                  products.map(p => <Product key={p.id} productData={p} />)
                ) : (
                  // show this message if there are no results
                  <p>There are no products based on your filter.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// STEP 1
// BEFORE FILTERING
// export const getStaticProps: GetStaticProps = async () => {
//   const resProducts = await fetch("https://shard-hungry-party.glitch.me/products");
//   const products = await resProducts.json();

//   const resCategories = await fetch("https://shard-hungry-party.glitch.me/productCategories");
//   const productCategories = await resCategories.json();

//   const resSizes = await fetch("https://shard-hungry-party.glitch.me/productSizes");
//   const productSizes = await resSizes.json();

//   return {
//     props: {
//       products,
//       productCategories,
//       productSizes,
//     },
//   };
// };

// AFTER FILTERING
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const resCategories = await fetch("https://shard-hungry-party.glitch.me/productCategories");
  const productCategories = await resCategories.json();

  const resSizes = await fetch("https://shard-hungry-party.glitch.me/productSizes");
  const productSizes = await resSizes.json();

  const { category, size } = query;

  // https://shard-hungry-party.glitch.me/products?type_like=dairy
  // https://shard-hungry-party.glitch.me/products?size_like=large
  // https://shard-hungry-party.glitch.me/products?size_like=large&type_like=dairy
  const resProducts = await fetch(
    `https://shard-hungry-party.glitch.me/products?${size ? `size_like=${size}` : ""}${
      category ? `&type_like=${category}` : ""
    }`
  );
  const products = await resProducts.json();

  return {
    props: {
      products,
      productCategories,
      productSizes,
    },
  };
};

export default Shop;
