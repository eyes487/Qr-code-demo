import React, { PureComponent } from 'react'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { createSwitchNavigator ,NavigationActions} from 'react-navigation'; 
import {BackHandler,View} from 'react-native';
import { connect } from 'react-redux';




/**引入页面 */
import MyScan from './pages/scan';
import AppStackNavigator from './navigator'


const RootStack = createSwitchNavigator({
  Auth: AppStackNavigator,

},
{
  initialRouteName: 'Auth',
})

export const routerReducer = createNavigationReducer(RootStack)
export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(RootStack, 'root')



function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
  }


@connect(({  router }) => ({  router }))

class Router extends PureComponent {

  render() {
    
    const { dispatch, router } = this.props

    return (
            <App dispatch={dispatch} state={router} />
    )
  }
}

export default Router
