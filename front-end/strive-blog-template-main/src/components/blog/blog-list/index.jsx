import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  state = {
    articles: [],

    /*   isLoading: true,
    isError: false, */
  };

  componentDidMount = async () => {
    
    try {
      let response = await fetch("http://localhost:3001/articles");
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        this.setState({
          articles: data,
          /* isLoading: false, */
        });
      } else {
        // alert('something went wrong :(')
        this.setState({
         /*  isLoading: false, */
          isError: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Row>
        {this.state.articles.map((article) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={article.title} {...article} />
          </Col>
        ))}
      </Row>
    );
  }
}
