import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    Vibration,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');


import {RNCamera} from 'react-native-camera';
import ViewFinder from './viewFinder';

import backIcon from '../img/backIcon.png';
import scanLine from '../img/scan_line.png';

export default class MyScan extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const {navigate} = navigation;
        return({
            header: null
        })
    };
    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            transCode: '',//条码
            openFlash: false,
            active: true,
            flag: true,
            fadeInOpacity: new Animated.Value(0), // 初始值
            isEndAnimation: false,//结束动画标记
        }

    }
    componentDidMount() {
        this._startAnimation(false);
    }
    //开始动画，循环播放
    _startAnimation = (isEnd) => {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
        }).start(
            () => {
                if (isEnd) {
                    this.setState({
                        isEndAnimation: true
                    })
                    return;
                }
                if (!this.state.isEndAnimation) {
                    this.state.fadeInOpacity.setValue(0);
                    this._startAnimation(false)
                }
            }
        );
        // console.log("开始动画");
    }
    barcodeReceived (e){
        const {navigation:{navigate}} = this.props;
        // console.log('进来了',e)
        if (e.data !== this.transCode) {
            Vibration.vibrate([0, 500, 200, 500]);
            this.transCode = e.data; // 放在this上，防止触发多次，setstate有延时
            if (this.state.flag) {
                this.changeState(false);
                //通过条码编号获取数据
            }
            this.setState({
                isEndAnimation: true,
            });
            navigate('Result',{result:this.transCode});
            console.log("transCode=" + this.transCode);
        }
    }
    //返回按钮点击事件
    _goBack = () => {
        this.setState({
            isEndAnimation: true,
        });
        this.props.navigation.goBack();
    }
    //开灯关灯
    _changeFlash = () => {
        this.setState({
            openFlash: !this.state.openFlash,
        });
    }
    //改变请求状态
    changeState = (status) => {
        this.setState({
            flag: status
        });
        console.log('status=' + status);
    }

    render() {
        const {
            openFlash,
            active,
        } = this.state;
        return (
            <View style={styles.allContainer}>

                <RNCamera
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    onCameraReady={() => {
                        console.log('ready')
                    }}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'需要获取照相机权限'}
                    style={styles.cameraStyle}
                >
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <View style={styles.leftContainer}>
                                <TouchableOpacity activeOpacity={1} onPress={this._goBack}>
                                    <View>
                                        <Image style={styles.backImg} source={backIcon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.rightText}>相册</Text>
                        </View>
                    </View>
                    <View style={styles.centerContainer} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.fillView} />
                        <View style={styles.scan}>
                            <ViewFinder />
                            <Animated.View style={[styles.scanLine, {
                                opacity: 1,
                                transform: [{
                                    translateY: this.state.fadeInOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 220]
                                    })
                                }]
                            }]}>
                                <Image source={scanLine} />
                            </Animated.View>
                        </View>
                        <View style={styles.fillView} />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    textAlign: 'center',
                                    width: 220,
                                    marginTop: active ? 25 : 245,
                                },
                            ]}
                            numberOfLines={2}
                        >
                            请将二维码放入扫码框内
                                </Text>
                        <TouchableOpacity onPress={this._changeFlash}>
                            <View style={styles.flash}>
                                <Text style={styles.icon}>(・◇・)</Text>
                                <Text style={styles.text}>
                                    开灯/关灯
                                        </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </RNCamera> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    allContainer: {
        flex: 1,
    },
    container: {
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 50
            }
        }),
        backgroundColor: '#000',
        opacity: 0.5
    },
    titleContainer: {
        flex: 1,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                paddingTop: 0,
            }
        }),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flex: 0,
        justifyContent: 'center',
    },
    rightText:{
        color: '#fff',
        marginRight: 15
    },
    backImg: {
        marginLeft: 10,
    },
    cameraStyle: {
        alignSelf: 'center',
        width: width,
        height: height,
    },
    flash: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 60,
    },
    flashIcon: {
        fontSize: 1,
        color: '#fff',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'iconfont'
    },
    scanLine: {
        alignSelf: 'center',
    },
    centerContainer: {
        ...Platform.select({
            ios: {
                height: 80,
            },
            android: {
                height: 60,
            }
        }),
        width: width,
        backgroundColor: '#000',
        opacity: 0.5
    },
    bottomContainer: {
        alignItems: 'center',
        backgroundColor: '#000',
        alignSelf: 'center',
        opacity: 0.5,
        flex: 1,
        width: width
    },
    fillView: {
        width: (width - 220) / 2,
        height: 220,
        backgroundColor: '#000',
        opacity: 0.5
    },
    scan: {
        width: 220,
        height: 220,
        alignSelf: 'center'
    },
    info:{
        color: '#fff'
    }

})


