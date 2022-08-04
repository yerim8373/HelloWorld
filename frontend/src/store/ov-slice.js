import { createSlice, current } from '@reduxjs/toolkit'

import { OpenVidu } from 'openvidu-browser'

import { getToken } from './ov-server'
// import { axios } from 'axios'

// let OPENVIDU = new OpenVidu()
// let STATE_DATA
const ovSlice = createSlice({
  name: 'openvidu',
  initialState: {
    OV: null,
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  },
  reducers: {
    createOpenvidu: (state, action) => {
      if (state.OV === null) {
        state.OV = new OpenVidu()
        state.session = state.OV.initSession()
      } else {
        return
      }
    },

    createPublisher: (state, action) => {
      state.session.publish(action.payload[1])
      state.currentVideoDevice = action.payload[0]
      state.mainStreamManager = action.payload[1]
      state.publisher = action.payload[1]
    },

    enteredSubscriber: (state, action) => {
      state.subscribers.push(action.payload)
      console.log(current(state))
    },

    deleteSubscriber: (state, action) => {
      let index = state.subscribers.indexOf(action.payload.streamManager, 0)
      if (index > -1) {
        state.subscribers.splice(index, 1)
      }
    },
  },

  leaveSession(state, action) {
    const mySession = state.session
    if (mySession) {
      mySession.disconnect()
    }

    state.OV = null
    state.session = undefined
    state.subscribers = []
    state.mySessionId = 'SessionA'
    state.myUserName = 'Participant' + Math.floor(Math.random() * 100)
    state.mainStreamManager = undefined
    state.publisher = undefined
  },
})

export const ovActions = ovSlice.actions
export default ovSlice
