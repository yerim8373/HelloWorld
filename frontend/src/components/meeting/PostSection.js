import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Sheet from '../common/Sheet'
import Modal from '../common/Modal'
import classes from './PostSection.module.css'
import Button from '../common/Button'

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
        <p className={classes.author}>by {post.author}</p>
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
  const [itemCount, setItemCount] = useState(5)
  const [currPosts, setCurrPosts] = useState(posts.slice(0, itemCount))

  const handleClick = () => {
    setItemCount(itemCount + 5)
  }

  useEffect(() => {
    setCurrPosts(posts.slice(0, itemCount))
  }, [posts, itemCount])

  return (
    <div className={classes.postSection}>
      <Sheet size="large">
        <div className={classes.postListContainer}>
          <h1>포스트</h1>
          <div className={classes.postList}>
            {currPosts.map(post => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
          {itemCount < posts.length && (
            <div className={classes.moreBtn}>
              <Button
                text="더 보기"
                size="small"
                onEvent={handleClick}
              ></Button>
            </div>
          )}
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
