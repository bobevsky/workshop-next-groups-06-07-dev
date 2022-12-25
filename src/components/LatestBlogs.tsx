import Image from "next/image";
import React from "react";

export interface BlogInterface {
  id: string;
  title: string;
  published: string;
  excerpt: string;
  image: string;
}

interface Props {
  latestBlogs: BlogInterface[];
}

const LatestBlogs: React.FC<Props> = ({ latestBlogs }) => {
  return (
    <section className="from-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title from-blog__title">
              <h2>From The Blog</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {latestBlogs.map(lb => (
            <div className="col-lg-4 col-md-4 col-sm-6" key={lb.id}>
              <a href="#" className="blog__item">
                <div className="blog__item__pic">
                  <Image src={lb.image} alt="" width={400} height={300} />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> {lb.published}
                    </li>
                  </ul>
                  <h5>{lb.title}</h5>
                  <p>{lb.excerpt}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
