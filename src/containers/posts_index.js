import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class PostsIndex extends Component {
  // react lifecycle function
  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPosts() {
    if (!this.props) {
      return <div>Loading...</div>
    }
    if (!this.props.posts) {
      return <div>No posts found</div>
    }
    return _.map(this.props.posts, post => {
      return (
        <Link to={`/posts/${post.id}`} key={post.id}>
        <li className="list-group-item">
          {post.title}
        </li>
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            New Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

// instead of using mapDispatchToProps, you can just use an object
// for that argument as a shortcut
export default connect(mapStateToProps, { fetchPosts })(PostsIndex)