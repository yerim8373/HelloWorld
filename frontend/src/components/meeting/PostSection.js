import PropTypes from 'prop-types'
import Sheet from '../common/Sheet'
import classes from './PostSection.module.css'

function PostItem({ post }) {
  return (
    <article className={classes.postItem}>
      <h2 className={classes.title}>{post.title}</h2>
      <p className={classes.summary}>{post.content}</p>
    </article>
  )
}

function PostSection({ posts }) {
  return (
    <div className={classes.postSection}>
      <Sheet size="large">
        <div className={classes.postListContainer}>
          <h1>포스트</h1>
          <div className={classes.postList}>
            {posts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Sheet>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
}

PostSection.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
    }).isRequired,
  ).isRequired,
}

export default PostSection
