import Link from "next/link";
import React from "react";

import Product, { ProductInteface } from "./Product";

interface Props {
  featuredProducts: ProductInteface[];
}

const FeaturedProducts: React.FC<Props> = ({ featuredProducts }) => {
  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Products</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {featuredProducts.map(fp => (
            <Product key={fp.id} productData={fp} />
          ))}
        </div>

        <div className="row">
          <div className="col text-center">
            <Link href="/shop">
              <a className="primary-btn">See all</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
