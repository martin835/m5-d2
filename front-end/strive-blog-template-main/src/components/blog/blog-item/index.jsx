import React, { Component } from "react";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
import { useState, useEffect } from "react";

const BlogItem = (props, { profiles }) => {
  const { title, cover, author, _id } = props;
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Card className="blog-card">
        <Link to={`/blog/${_id}`} className="blog-link">
          <Card.Img variant="top" src={cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
        </Link>
        <Card.Footer>
          <BlogAuthor {...author} />
          <Button variant="link" onClick={() => setLgShow(true)}>
            Edit
          </Button>
        </Card.Footer>
      </Card>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="cover-image">
            <Form.Label>Upload Cover</Form.Label>
            <Form.Control type="file" placeholder="Select an image" />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary">Submit</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlogItem;

//OLD CODE:

/* export default class BlogItem extends Component {
  render() {
    const { title, cover, author, _id } = this.props;
    return (
      <Link to={`/blog/${_id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...author} />
            <Button variant="link">Edit</Button>
          </Card.Footer>
        </Card>
      </Link>
    );
  }
} */
