import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/Dva'
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models/index'


const rootModel = []
Object.values(appModel).forEach(value=>{
    rootModel.push(value)
})

const app = dva({
  initialState: {},
  models: rootModel,
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('CameraDemo', () => App)
