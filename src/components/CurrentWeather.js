import { StyleSheet, View, ImageBackground } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
import maxTempIc from "../../assets/images/max_temp.png"
import windIc from "../../assets/images/wind.png"
import humidityIc from "../../assets/images/humidity.png"



export default function CurrentWeather(props) {

    const { main, wind } = props;


    return (

        <>
            <Card style={styles.cardContainer}>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', margin: 20, marginLeft: 40, justifyContent: 'center' }}>
                        <Card.Content style={{ flex: 1 }}>

                            <ImageBackground source={maxTempIc} resizeMode="cover" style={styles.maxTmpIcon}>
                            </ImageBackground>

                            <Text variant="bodyMedium" style={styles.maxTempText}>Max Temp</Text>
                            <Text variant="bodyMedium" style={styles.maxTempTextValue}>
                                {
                                    roundTemp != 0 ? roundTemp + " °C" : "0 °C"
                                }

                            </Text>
                        </Card.Content>
                        <Card.Content style={{ flex: 1 }}>
                            <ImageBackground source={humidityIc} resizeMode="cover" style={styles.humidityIcon}>
                            </ImageBackground>
                            <Text variant="bodyMedium" style={styles.humidityText}>Humidity</Text>
                            <Text variant="bodyMedium" style={styles.humidityTextValue}>{main.humidity} %</Text>
                        </Card.Content>

                        <Card.Content style={{ flex: 1 }}>
                            <ImageBackground source={windIc} resizeMode="cover" style={styles.windIcon}>
                            </ImageBackground>
                            <Text variant="bodyMedium" style={styles.windText}>Wind</Text>
                            <Text variant="bodyMedium" style={styles.windTextValue}>{wind.speed} m/s</Text>
                        </Card.Content>
                    </View>
                </View>

            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    maxTmpIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    maxTempText: {
        fontSize: 11,
        color: "lightgray",
        fontWeight: 'bold'
    },
    maxTempTextValue: {
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    windIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    windText: {
        fontSize: 11,
        color: "lightgray",
        fontWeight: 'bold'
    },
    windTextValue: {
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    humidityIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    humidityText: {
        fontSize: 11,
        color: "lightgray",
        fontWeight: 'bold'
    },
    humidityTextValue: {
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    cardContainer: {
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'space-between',
    }
})