/*추가작업 필요 */

import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import codes from 'country-calling-code'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './FindEmailForm.module.css'
import Dropdown from '../common/Dropdown'
import PropTypes from 'prop-types'

// 국제전화 코드 리스트
const countries = codes.map(c => ({
  label: `+${c.countryCodes} (${c.country})`,
  value: c.countryCodes[0],
}))

function FindEmailPage({ handleNext2 }) {
  const [callingCode, setCallingCode] = useState(countries[0].value)

  // useEffect(() => {
  //   handleNext({ callingCode })
  // }, [callingCode, handleNext2])

  return (
    <div>
      <form>
        <h1>
          로그인이 안되나요?
          <br />
          이메일을 검색해보세요!
        </h1>
        <></>
        <h3 className={classes.find_email_text_padding_top}>
          계정에 연결된 HelloWorld 사용자 이름, 전화번호를 사용하여
          <br />
          이메일을 찾으실 수 있도록 도와드리겠습니다.
        </h3>
        <table>
          <tr>
            <td>
              <Input
                id="이름"
                type="text"
                placeholder="본명을 입력해주세요"
                //   onValid={nameValidObj}
                onData={data =>
                  handleNext2({ name: data.valid ? data.value : undefined })
                }
                required
              />
            </td>
            <td>
              <div className={classes.phoneContainer}>
                <Dropdown
                  id="휴대폰 번호"
                  value={callingCode}
                  items={countries}
                  handleChange={e => setCallingCode(e.target.value)}
                  placeholder="국제전화 코드"
                  required
                />
                <div className={classes.phoneNumber}>
                  <Input
                    id="휴대폰 번호 (실제 입력)"
                    type="text"
                    placeholder="전화번호 (하이픈 제외)"
                    //   onValid={phoneValidObj}
                    onData={data =>
                      handleNext2({
                        phone: data.valid ? data.value : undefined,
                      })
                    }
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {
                //여기는 버튼이 들어갈 곳입니다.
              }
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}

FindEmailPage.propTypes = {
  handleNext2: PropTypes.func,
}

export default FindEmailPage
