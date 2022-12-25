import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Breadcrumbs from "../../components/Breadcrumbs";
import FeaturedProducts from "../../components/FeaturedProducts";
import { ProductInteface } from "../../components/Product";

// STEP 3
interface Props {
  productData: ProductInteface;
  featuredProducts: ProductInteface[];
}

// STEP 4
const ShopDetail: NextPage<Props> = ({ productData, featuredProducts }) => {
  const router = useRouter();

  // when you visit a page which is not in the paths array from getStaticPaths
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>{productData.title}</title>
      </Head>

      <Breadcrumbs title={productData.title} />

      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  {/* eslint-disable-next-line */}
                  <img
                    className="product__details__pic__item--large"
                    src={`/img/products/${productData.filename}`}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{productData.title}</h3>
                <div className="product__details__price">{productData.price}</div>
                <p>{productData.description}</p>
                <ul>
                  <li>
                    <b>Type</b> <span>{productData.type}</span>
                  </li>
                  <li>
                    <b>Size</b> <span>{productData.size}</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      {productData.description}
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>{productData.information}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
};

// STEP 1
export const getStaticPaths: GetStaticPaths = async () => {
  const resProducts = await fetch("https://shard-hungry-party.glitch.me/products?_limit=12");
  const products: ProductInteface[] = await resProducts.json();

  const paths = products.map(p => ({
    params: {
      id: p.id,
    },
  }));

  return {
    paths,
    fallback: true, // -> other routers will not result in 404 page immediatelly - getStaticProps will try to create them when you acces them in the browser
  };
};

// STEP 2
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && params.id) {
    const res = await fetch(`https://shard-hungry-party.glitch.me/products/${params.id}`);
    const productData = await res.json();

    // if the product above has no keys in the object -> that product likely doesn't exist
    // /shop/123 -> doesn't exist
    // return 404 page
    if (Object.keys(productData).length === 0) {
      return {
        notFound: true,
      };
    }

    const resProducts = await fetch("https://shard-hungry-party.glitch.me/products?_start=1&_limit=4");
    const featuredProducts = await resProducts.json();

    return {
      props: {
        productData,
        featuredProducts,
      },
    };
  }

  return {
    notFound: true,
  };
};

export default ShopDetail;
