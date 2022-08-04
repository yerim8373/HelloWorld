import { createSlice } from '@reduxjs/toolkit'

import { OpenVidu } from 'openvidu-browser'

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
      if (!state.OV) {
        state.OV = new OpenVidu()
        state.session = state.OV.initSession()
      }
    },

    createPublisher: (state, action) => {
      state.session.publish(action.payload[1])
      state.currentVideoDevice = action.payload[0]
      state.mainStreamManager = action.payload[1]
      state.publisher = action.payload[1]
    },

    enteredSubscriber: (state, action) => {
      const subscriber = state.session.subscribe(action.payload, undefined)
      state.subscribers.push(subscriber)
    },

    deleteSubscriber: (state, action) => {
      let index = state.subscribers.indexOf(action.payload, 0)
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
