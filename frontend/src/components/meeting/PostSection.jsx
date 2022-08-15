import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Sheet from '../common/Sheet'
import Modal from '../common/Modal'
import classes from './PostSection.module.css'
import Button from '../common/Button'
import { getAllPosts } from '../../store/post-thunkActions'

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
        content: `${post.user.name} (${post.user.nickname})`,
      },
      {
        key: 'lastModifiedAt',
        name: '마지막 작성일',
        content: post.lastModifiedAt,
      },
    ],
  }

  return (
    <>
      <article className={classes.postItem} onClick={handleModal}>
        <h2 className={classes.title}>{post.title}</h2>
        <p className={classes.author}>by {post.user.email}</p>
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

function PostSection() {
  const { token } = useSelector(state => state.auth)

  const [itemCount, setItemCount] = useState(5)
  const [posts, setPosts] = useState([])
  const [currPosts, setCurrPosts] = useState([])

  const dispatch = useDispatch()

  const handleClick = () => setItemCount(itemCount + 5)

  useEffect(() => {
    const getPosts = async () => {
      const { payload } = await dispatch(getAllPosts(token))
      setPosts(payload.data)
    }
    getPosts()
  }, [])

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
              <PostItem key={post.postId} post={post} />
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
    postId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    lastModifiedAt: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostSection
