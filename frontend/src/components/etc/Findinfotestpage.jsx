//사실상 쓰레기 페이지. - dropdown test용도 였습니다
//하지만 일단 놔둬주세요!@!@

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

  handleDropdown = country => {
    this.setState({ country })
  }

  render() {
    const { country } = this.state

    return (
      <div className="container">
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
