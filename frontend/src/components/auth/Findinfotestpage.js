import React, { Component } from 'react'

import './FindInformationPage.module.css'

import Dropdown from '../common/Dropdown'

export default class Findinfotestpage extends Component {
  state = {
    text: '',
    number: '',
    email: '',
    country: '',
    message: '',
    acceptance: false,
  }

  handleChange = key => value => {
    this.setState({ [key]: value })
  }

  handleDropdown = country => {
    this.setState({ country })
  }

  render() {
    const { country } = this.state

    return (
      <div className="container">
        <h2>Dropdown compo still........</h2>
        <h2>
          현재 테스트 중인 페이지 : Findinfotestpage.js로, pages/find-info.js
          에서 테스트중
        </h2>
        <h2>관련 js 파일들 : Findinfotestpage.js / Dropdown.js.</h2>
        <h2>문제점 : 드롭다운 생성은 되는데 내부 요소들이 안보임</h2>

        <hr />

        <Dropdown
          data={[
            { value: 'Korea', label: 'Korea' },
            { value: 'USA', label: 'USA' },
            { value: 'UK', label: 'UK' },
            { value: 'Germany', label: 'Germany' },
            { value: 'Russia', label: 'Russia' },
            { value: 'Italy', label: 'Italy' },
          ]}
          value={country}
          placeholder="Country"
          onChange={this.handleDropdown}
        />
      </div>
    )
  }
}
