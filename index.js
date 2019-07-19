/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Scan from './app/scan';
import {name as appName} from './app.json';

console.disableYellowBox = true // 关闭全部黄色警告
console.ignoredYellowBox = [
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: isMounted(...) is deprecated',
]
AppRegistry.registerComponent(appName, () => Scan);

