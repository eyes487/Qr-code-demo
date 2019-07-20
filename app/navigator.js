import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Code from './pages/code';
import Scan from './pages/scan';
import Result from './pages/result';



const AppStackNavigator = createStackNavigator({
    Code:{
        screen:Code,
    },
    Scan:{
        screen:Scan,
    },
    Result:{
        screen:Result,
    }
},{
    initialRouteName:'Code'
})

export default AppStackNavigator;