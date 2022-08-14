import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomQuestion } from '../../store/question-thunkActions'
import Sheet from '../common/Sheet'
import classes from './QuestionSection.module.css'

export default function QuestionSection() {
  const { token } = useSelector(state => state.auth)
  const [question, setQuestion] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const getQuestion = async () => {
      const { payload } = await dispatch(getRandomQuestion(token))
      setQuestion(payload.data.content)
    }
    getQuestion()
  }, [])

  return (
    <div className={classes.questionSection}>
      <Sheet>
        <div className={classes.questionWrapper}>
          <h1 className={classes.title}>
            무슨 말을 해야 할지 잘 모르겠나요? 아래 질문은 어떠세요?
          </h1>
          <p className={classes.question}>{question}</p>
        </div>
      </Sheet>
    </div>
  )
}
