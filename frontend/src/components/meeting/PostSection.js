import PropTypes from 'prop-types'
import Sheet from '../common/Sheet'
import Modal from '../common/Modal'
import { useState } from 'react'
import classes from './PostSection.module.css'

function PostItem({ post }) {
  const [modalState, setModalState] = useState(false)
  const handleModal = () => setModalState(!modalState)

  const contents = {
    title: post.title,
    content: post.content,
    subInfo: [
      {
        key: 'author',
        name: '작성자',
        content: post.author,
      },
      {
        key: 'createdAt',
        name: '작성일',
        content:
          post.createdAt + (post.updatedAt ? ` (수정: ${post.updatedAt})` : ''),
      },
    ],
  }

  return (
    <>
      <article className={classes.postItem} onClick={handleModal}>
        <h2 className={classes.title}>{post.title}</h2>
        <p className={classes.summary}>{post.content}</p>
      </article>
      <Modal
        opened={modalState}
        handleModal={handleModal}
        contents={contents}
      />
    </>
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
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default PostSection
