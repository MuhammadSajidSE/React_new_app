import React, { Component } from "react";
import NewsItems from "./NewItems";
import Loading from "./Loading";
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize:12,
    category:'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string // corrected prop name
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1, // Initialize page to 1
    };
  }

  async componentDidMount() {
    await this.fetchArticles();
  }

  async fetchArticles() {
    const { page } = this.state;
    const { pagesize } = this.props;
    this.setState({loading:true})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1e2de7f49d54f6ca95501855ba43a97&page=${page}&pagesize=${pagesize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false });
  }

  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)) {
      return;
    } else {
      const { page } = this.state;
      const { pagesize } = this.props;
      this.setState({loading:true})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1e2de7f49d54f6ca95501855ba43a97&page=${page + 1}&pagesize=${pagesize}`;
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState(
        { page: page + 1, articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false }
      );
    }
  };
  

  handlePrevious = async () => {
    const { page } = this.state;
    const { pagesize } = this.props;
    this.setState({loading:true})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1e2de7f49d54f6ca95501855ba43a97&page=${page - 1}&pagesize=${pagesize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState(
      { page: page - 1, articles: parsedData.articles ,loading:false}
    );
  };

  render() {
    const { articles } = this.state; // Destructure articles from state
  
    // Check if articles is undefined
    return (
      <div className="container my-3">
        <h3 className="text-center my-3">TellNews Top Headlines</h3>
        {this.state.loading && <Loading></Loading>}
        <div className="row">
          {articles.length > 0 ? (
            !this.state.loading &&
            articles.map((element) => (
              <div className="col md-4" key={element.urlToImage}>
                <NewsItems
                  title={element.title }
                  description={
                    element.description 
                  }
                  imgUrl={element.urlToImage}
                  newurl={element.url}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            ))
          ) : (
            <p>No articles to display</p>
          )}
        </div>
        <div className="container mt-5 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-success mx-5"
            onClick={this.handlePrevious}
            disabled={this.state.page <= 1}
          >    
            &laquo; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)}
            type="button"
            className="btn btn-success mx-5"
            onClick={this.handleNext}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
