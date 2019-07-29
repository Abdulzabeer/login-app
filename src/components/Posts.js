import React, { Component } from "react";
import { database } from "../Firebase";
import _ from "lodash";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      posts: {}
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onUpdateHandler = this.onUpdateHandler.bind(this);
  }
  componentDidMount() {
    database.on("value", snapshot => {
      this.setState({
        posts: snapshot.val()
      });
    });
  }
  //render post from firebase
  onrenderpost() {
    return _.map(this.state.posts, (post, key) => {
      return (
        <div key={key}>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">{post.title}</h1>
                <p className="card-text">{renderHTML(post.body)}</p>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => this.onDeleteSingleHandler(key)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => this.onUpdateHandler(key)}
                >
                  Update
                </button>
              </div>
            </div>
            <br />
          </div>
        </div>
      );
    });
  }
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmitHandler(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    database.push(post);
    this.setState({
      title: "",
      body: ""
    });
  }

  onHandleChange(e) {
    this.setState({ body: e });
    console.log(this.state.body);
  }
  onDeleteHandler() {
    database
      .remove()
      .then(() => {
        return alert("Deleted all posts");
      })
      .catch(errors => {
        console.log("remove failed" + errors.message);
      });
  }
  onDeleteSingleHandler(key) {
    var items = key;
    database.child(items).remove();
  }

  onUpdateHandler(key) {
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    var updates = {};
    updates["/posts" + key] = post;
    database.child(key).update(updates);
    console.log(updates);
  }

  render() {
    return (
      <div className="post">
        <h1 className="text-center">Enter the Posts</h1>
        <div className="container">
          <button
            className="btn btn-danger float-right"
            onClick={this.onDeleteHandler}
          >
            Delete All Posts
          </button>
          <br />
          <br />
          <form onSubmit={this.onSubmitHandler}>
            <input
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Title"
              ref="title"
              onChange={this.onInputChange}
              className="form-control"
            />
            <br />
            <input
              //   formats={post.modules}
              //   modules={post.modules}
              type="text"
              name="body"
              value={this.state.body}
              placeholder="Body"
              className="form-control"
              ref="body"
              onChange={this.onInputChange}
            />
            <br />
            <button className="btn btn-primary float-right">Post</button>
            <br />
          </form>
        </div>
        <br />
        {this.onrenderpost()}
      </div>
    );
  }
}

export default Posts;
