import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    TouchableNativeFeedback
} from 'react-native';


export default class Code extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const {navigate} = navigation;
        return({
            headerTitle: '扫描结果',
            headerStyle:{
                backgroundColor: '#1DBAF1',
                
            },
            headerTitleStyle:{
                color: '#fff',
                fontWeight: 'normal',
            },
            headerTintColor: '#fff',
            
        })
        
    };
    constructor(props) {
        super(props);

    }


    render() {
        const {navigation} = this.props;
        return ( 
            <View style = {styles.container}>
               <Text>{navigation.getParam('result')}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    ScanImg:{
        width: 20,
        height: 20,
        marginRight: 15
    }

});