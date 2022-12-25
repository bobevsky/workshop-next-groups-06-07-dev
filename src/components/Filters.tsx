import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface ProductFilterInterface {
  name: string;
  slug: string;
}

interface Props {
  productCategories: ProductFilterInterface[];
  productSizes: ProductFilterInterface[];
}

const Filters: React.FC<Props> = ({ productCategories, productSizes }) => {
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const router = useRouter();

  // every time we change the category in state -> update the URL as well
  useEffect(() => {
    category &&
      category !== router.query.category &&
      router.push({
        query: {
          ...router.query,
          category,
        },
      });
  }, [category, router]);

  // if we refresh the page and there is a category in the router query -> set that category in the local state
  useEffect(() => {
    router.query.category && setCategory(router.query.category as string);
  }, [router]);

  // every time we change the size in state -> update the URL as well
  useEffect(() => {
    size &&
      size !== router.query.size &&
      router.push({
        query: {
          ...router.query,
          size,
        },
      });
  }, [size, router]);

  // if we refresh the page and there is a size in the router query -> set that size in the local state
  useEffect(() => {
    router.query.size && setSize(router.query.size as string);
  }, [router]);

  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <h4>Department</h4>
        {/* show this button if there is a category filter selected to remove it */}
        {category && (
          <div className="mb-3">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                // clear the category filter from state
                setCategory("");

                // clear the category filter from router query
                // we can't change the router query directly so, we make a locale clone out of it in JS
                const localQuery = router.query;

                // change the clone { category: "meat", size: "large" } => { size: "large" }
                delete localQuery.category;

                // update the router query with that clone
                router.push({
                  query: localQuery,
                });
              }}
            >
              Clear filter <span className="ml-1">&#10005;</span>
            </button>
          </div>
        )}

        <div className="sidebar__item__size">
          {/* toggle the active class here */}
          {productCategories.map((pc, i) => (
            <label
              className={category === pc.slug ? "active" : undefined}
              key={`product-category-${i}`}
            >
              {pc.name}
              <input
                type="radio"
                name="product-categories"
                value={pc.slug}
                checked={category === pc.slug}
                onChange={() => setCategory(pc.slug)}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="sidebar__item">
        <h4>Popular Size</h4>
        {/* show this button if there is a size filter selected to remove it */}
        {size && (
          <div className="mb-3">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                // clear the size filter from state
                setSize("");

                // clear the size filter from router query
                // we can't change the router query directly so, we make a locale clone out of it in JS
                const localQuery = router.query;

                // change the clone { category: "meat", size: "large" } => { category: "meat" }
                delete localQuery.size;

                // update the router query with that clone
                router.push({
                  query: localQuery,
                });
              }}
            >
              Clear filter <span className="ml-1">&#10005;</span>
            </button>
          </div>
        )}

        <div className="sidebar__item__size">
          {/* toggle the active class here */}
          {productSizes.map((ps, i) => (
            <label className={size === ps.slug ? "active" : undefined} key={`product-size-${i}`}>
              {ps.name}
              <input
                type="radio"
                name="product-sizes"
                value={ps.slug}
                checked={size === ps.slug}
                onChange={() => setSize(ps.slug)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
