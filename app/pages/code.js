import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ScanIcon from '../img/scan.png';
import Smile from '../img/smile.png';

export default class Code extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const {navigate} = navigation;
        return({
            headerTitle: '二维码',
            headerRight: <TouchableNativeFeedback onPress={()=>navigate('Scan')}>
                <Image style={styles.ScanImg} source={ScanIcon}/>
            </TouchableNativeFeedback>,
            headerStyle:{
                backgroundColor: '#1DBAF1'
            },
            headerTitleStyle:{
                color: '#fff',
                fontWeight: 'normal',
            }
        })
    };
    constructor(props) {
        super(props);

    }


    render() {
        return ( 
            <View style = {styles.container}>
                <StatusBar
                    backgroundColor='#ff0000'
                    translucent={true}
                    hidden={true}
                />
                <QRCode 
                    value = "https://blog.csdn.net/qq_28484355/article/details/81320019" 
                    size ={200}
                    logo={require('../img/smile.png')}
                    logoSize={40}
                />
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