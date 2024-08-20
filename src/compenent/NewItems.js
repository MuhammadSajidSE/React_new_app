import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description, imgUrl, newurl, author, date, source } = this.props;
    return (
      <div className="container my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={imgUrl ? imgUrl : "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/xpeng-g6-2024-front-quarter-static_0.jpg"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" style={{ maxHeight: "200px", overflow: "hidden" }}>
            <h5 className="card-title" style={{ marginBottom: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {title}...
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
            </h5>
            <p className="card-text" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "4", lineHeight: "1.5em" }}>
              {!description ? "Warburg Pincus affiliate Cloverdell Investment may offload 15.9 crore shares. The floor..." : description}
            </p>
            <a href={newurl} target="_blank" className="btn btn-sm btn-warning">
              Read more
            </a>
            <p className="card-text">
              <small className="text-body-secondary" style={{ fontSize: "14px" }}>
                By <strong>{!author ? "Unknown" : author}</strong> on <strong>{new Date(date).toGMTString()}</strong>
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
