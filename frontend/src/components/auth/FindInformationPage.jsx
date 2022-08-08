/*추가작업 필요 */

import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Button from '../common/Button'
import classes from './FindInformationPage.module.css'

function FindInformationPage() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/find-email')
  }
  function routerPushHandler2() {
    navigate('/auth/find-password')
  }

  /*
  const contents = [
    {
      title: '찾고자 하는 정보를 선택해주세요',
      center : true,
    },
  ]
*/

  return (
    <div className="flex_row_center">
      <form>
        <h1 className={classes.info_text_align}>
          찾고자 하는 정보를 선택해주세요
        </h1>

        <table>
          <tr>
            <div className={classes.width_35vw}>
              <td className={classes.info_box_padding_right}>
                <Sheet>
                  <h2 className={classes.findinformationpage_title}>
                    {'   '}
                    이메일을 잊어버리신 경우{'   '}
                  </h2>
                  <Button
                    onEvent={routerPushHandler}
                    color=""
                    text="이메일 찾기로 이동"
                  />
                </Sheet>
              </td>
            </div>
            <td className={classes.info_box_padding_left}>
              <div className={classes.width_35vw}>
                <Sheet>
                  <h2 className={classes.findinformationpage_title}>
                    비밀번호를 잊어버리신 경우
                  </h2>
                  <Button
                    onEvent={routerPushHandler2}
                    text="비밀번호 찾기로 이동"
                  />
                </Sheet>
              </div>
            </td>
          </tr>
        </table>

        <>
          <p className={classes.info_tip}>
            데이터가 존재하지 않는 경우{' '}
            <NavLink to="/signup">
              <span className={classes.find_info}>회원가입</span>
            </NavLink>{' '}
            을 진행해주세요
          </p>
          <p className={classes.info_tip2}>
            로그인 페이지로 이동하시길 원하신다면{' '}
            <NavLink to="/login">
              <span className={classes.find_info}>여기</span>
            </NavLink>{' '}
            를 눌러주세요
          </p>
        </>
      </form>
    </div>
  )
}

export default FindInformationPage
