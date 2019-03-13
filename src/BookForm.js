import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: ""
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.author, this.props.closeModal);
  };

  textChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const errors = this.props.errors;
    let colors = ["red", "blue", "green"].map(color => (
      <option key={color} value={color}>
        {color}
      </option>
    ));
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              onChange={this.textChangeHandler}
              type="text"
              className="form-control"
              name="title"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              onChange={this.textChangeHandler}
              className="form-control"
              name="color"
            >
              {colors}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.rootErrors.errors,
    author: state.rootAuthor.author
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, author, closeModal) =>
      dispatch(actionCreators.postBook(newBook, author, closeModal)),
    resetErrors: () => dispatch(actionCreators.resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
