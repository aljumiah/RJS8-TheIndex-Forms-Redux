import React, { Component } from "react";
import AddBookModal from "./AddBookModal";
// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class AuthorDetail extends Component {
  state = {
    open: false
  };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  componentDidMount() {
    this.props.getAuthor(this.props.match.params.authorID);
  }

  render() {
    const { open } = this.state;
    if (this.props.loading) {
      return <Loading />;
    } else {
      const author = this.props.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={author.books} />

          <AddBookModal closeModal={this.onCloseModal} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    author: state.rootAuthor.author,
    loading: state.rootAuthor.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthor: authorID => dispatch(actionCreators.fetchAuthorDetail(authorID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetail);
