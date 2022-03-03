import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        content: "",
        title: "",
        category: "",
      },
    };
    /* this.handleChange = this.handleChange.bind(this); */
    this.createNewArticle = this.createNewArticle.bind(this);
  }

  /* handleChange(value) {
    this.setState({ content: value });
  } */

  createNewArticle = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:3001/articles", {
        method: "POST",
        body: JSON.stringify(this.state.article),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        alert("article posted!");
        this.setState({
          article: {
            content: "",
            title: "",
            category: null,
          },
        });
      } else {
        // what type of error will fall here?
        // here it means you connected to the server, but something went wrong!
        alert("something went wrong! please try again");
        // just some examples...
        if (response.status === 400) {
          alert("some data was wrong");
        }
        if (response.status === 400) {
          alert("not found");
        }
      }
    } catch (error) {
      // what type of error will fall here?
      // you probably have some internet problems :(
      console.log(error);
    }
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form onSubmit={(e) => this.createNewArticle(e)} className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.title}
              onChange={(e) =>
                this.setState({
                  article: {
                    ...this.state.article,
                    title: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.category}
              onChange={(e) =>
                this.setState({
                  article: {
                    ...this.state.article,
                    category: e.target.value,
                  },
                })
              }
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Write article here"
              style={{ height: "200px" }}
              value={this.state.content}
              onChange={(e) =>
                this.setState({
                  article: {
                    ...this.state.article,
                    content: e.target.value,
                  },
                })
              }
              className="new-blog-content"
            />
          </Form.Group>
          {/* <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.article.content}
              onChange={(e) =>
                this.setState({
                  article: {
                    ...this.state.article,
                    content: e.target.value,
                  },
                })
              }
              className="new-blog-content"
            />
          </Form.Group> */}
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
