import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { ProductFilterInterface } from "./Filters";

export interface HeroSectionInterface {
  heroSection: {
    preTitle: string;
    title: string;
    desc: string;
  };
  departmentInfo: string;
}

interface Props {
  heroSectionData: HeroSectionInterface;
  productCategories: ProductFilterInterface[];
}

const HeroSection: React.FC<Props> = ({ heroSectionData, productCategories }) => {
  const router = useRouter();
  const { preTitle, title, desc } = heroSectionData.heroSection;

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars"></i>
                <span>All departments</span>
              </div>
              <div className="py-3">
                {productCategories.map((prodCat, i) => (
                  <div className="sidebar__item__size" key={`product-category-${i}`}>
                    {/* example 1 */}
                    <button
                      onClick={() => {
                        router.push({
                          // on click on these categories -> redirect to the /shop page
                          pathname: "/shop",
                          // set the query.category based on the current slug we are iterating in the map
                          query: {
                            ...router.query,
                            category: prodCat.slug,
                          },
                        });
                      }}
                    >
                      {prodCat.name}
                    </button>

                    {/* example 2 */}
                    {/* <Link
                      href={{
                        pathname: "/shop",
                        query: {
                          ...router.query,
                          category: prodCat.slug,
                        },
                      }}
                    >
                      <a>{prodCat.name}</a>
                    </Link> */}
                  </div>
                ))}
              </div>
              {/* fill out this one */}
              <p className="mt-3">{heroSectionData.departmentInfo}</p>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__item set-bg">
              <div className="hero__text w-50">
                {/* fill out these */}
                <span>{preTitle}</span>
                <h2>{title}</h2>
                <p>{desc}</p>
                {/* !! */}
                <Link href="/shop">
                  <a className="primary-btn">SHOP NOW</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
