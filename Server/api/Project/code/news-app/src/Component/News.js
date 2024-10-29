import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propType from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [Result, setResult] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const updatenews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&from=2024-07-14&to=2024-07-14&sortBy=popularityy&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.page}`;
    setloading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedata = await data.json();
    props.setProgress(70);
    setarticles(parsedata.articles);
    setloading(false);
    setResult(parsedata.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - New App`;
    updatenews();
  }, []);
  // const handleprevclick = async () => {
  // setpage(page-1)
  //   this.updatenews();
  // }

  //const handlenextclick = async () => {
  //  setpage(page+1)
  //     this.updatenews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&from=2024-07-14&to=2024-07-14&sortBy=popularityy&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.page}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    setResult(parsedData.totalResults);
  };
  return (
    <>
      <h1 className="text-center my-3">
        News - Top {capitalize(props.category)} Headline
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== Result}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <Newsitem
                    title={element.title ? element.title : ""}
                    newsurl={element.url}
                    discription={element.description ? element.description : ""}
                    imgurl={element.urlToImage}
                    auther={element.author}
                    sourse={element.source.name}
                    publish={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 3,
  category: "gernal",
};
News.propTypes = {
  category: propType.string,
  pageSize: propType.number,
  country: propType.string,
};

export default News;