import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEventInfo } from '../../../common/redux/actions';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearProgress } from "react-native-elements";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker"; 
import auth from '../../../../api/firebase/services/AuthService';
import axios from "axios";
import styles from './PaymentCalcStyles';

function validate (data) {
    let errors = {};
    if(!data.publishDate.textDate) {
        errors.date = 'Elige una fecha de publicación para tu evento.'
    }
    if(!data.publishDate.textTime) {
        errors.time = 'Elige una hora de inicio para la publicación para tu evento.'
    }
    if(!data.price) {
        errors.price = 'Valor incorrecto.'
    }
    return errors;
}

export default function PaymentCalc({ navigation }) {
    const eventInfo = useSelector(state => state.eventForm);
    const dispatch = useDispatch();

    const [showCalendar, setShowCalendar] = useState(false);
    const [showClock, setShowClock] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());
    const [timeValue, setTimeValue] = useState(new Date());
    const [textDate, setTextDate] = useState("");
    const [textTime, setTextTime] = useState("")
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date())
    const [days, setDays] = useState(0);
    const [price, setPrice] = useState(100);

    const daysArray = ['1 día', '3 días', '5 días', '7 días', '14 días', '30 días', '60 días', '90 días'];

    const showMode = (currentMode) => {
        if (currentMode === "date") {
          setShowCalendar(true);
        }
        if (currentMode === "time") {
          setShowClock(true);
        }
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
    
        setShowCalendar(Platform.OS === "ios"); // why this?
        setDate(currentDate);
    
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setTextDate(fDate);
        setDateValue(tempDate);
        setShowCalendar(false);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
    
        setShowClock(Platform.OS === "ios"); // why this?
        setTime(currentTime);
    
        let tempTime = new Date(currentTime);
        let minutes = tempTime.getMinutes();
        let hours = tempTime.getHours();
        if (minutes.toString().length === 1) minutes = '0' + minutes.toString();
        if (hours < 10 ) hours = '0' +  hours.toString();
        let fTime = hours + ":" + minutes;
        setTextTime(fTime);
        setTimeValue(tempTime);
        setShowClock(false);
      };

    const handlePickerChange = (value) => {
        setDays(value);
        if (value === '1 día') {
            setPrice(100);
        }
        if (value === '3 días') {
            setPrice(200);
        }
        if (value === '5 días') {
            setPrice(300);
        }
        if (value === '7 días') {
            setPrice(400);
        }
        if (value === '14 días') {
            setPrice(700);
        }
        if (value === '30 días') {
            setPrice(1200);
        }
        if (value === '60 días') {
            setPrice(2000);
        }
        if (value === '90 días') {
            setPrice(3000);
        }
    }

    const handleAccept = async () => {

        const validation = validate({
            publishDate: {
                textDate, 
                textTime
            },
            price: price
        });

        if (Object.keys(validation).length === 0) {
            const partialEvent = {
                publishDate: {
                    date: date,
                    time: time
                },
                payment_price: price,
                createdBy: auth.currentUser.uid
            };
            
            dispatch(addEventInfo(partialEvent));

            const post = await axios.post('https://eventin-app.herokuapp.com/checkout', { 
                title: eventInfo.title,
                price: price,
                description: eventInfo.description,
                email: eventInfo.isLogged.email
            });
            // await console.log(post.data);
            const redirectUrl = post.data;
            navigation.navigate('MercadoPagoCard', redirectUrl);
        } else {
            return Alert.alert(`${Object.values(validation)[0]}`);
        }
    };

    const handleCancel = () => {
        Alert.alert("¿Estás seguro de que deseas salir?", "Se perderán todos los cambios.", [
            { text: "Si", onPress: () => navigation.popToTop() },
            { text: "No" }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearProgress color="#00BD9D" variant="determinate" value={0.8} style={{height:10}} />
            <View style={styles.header}>
                <Text style={styles.textHeader}>Paso 5 de 5</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={42} color="#00BD9D" />
            </TouchableOpacity>

                <Text h4 style={styles.titleText}>Detalles de Facturación</Text>

            <View style={styles.dateCont}>
                <Input
                    label="Fecha de publicación de tu evento"
                    placeholder="Fecha"
                    onFocus={() => showMode('date')}
                    showSoftInputOnFocus={false}
                    inputStyle={styles.input}
                    labelStyle={styles.label}
                    inputContainerStyle={styles.dateInput}
                    value={textDate}
                />
                <TouchableOpacity onPress={() => showMode('date')}>
                    <MaterialIcons name="date-range" size={40} color="black" style={styles.calendar} />
                </TouchableOpacity>
            </View>

            <View style={styles.timeCont}>
            <Input
                label="Hora inicio de la publicación"
                placeholder="Hora"
                onFocus={() => showMode("time")}
                showSoftInputOnFocus={false}
                inputStyle={styles.input}
                labelStyle={styles.label}
                inputContainerStyle={styles.timeInput}
                value={textTime}
            />
            <TouchableOpacity onPress={() => showMode("time")}>
                <Feather name="clock" size={40} color="black" style={styles.clock} />
            </TouchableOpacity>
            </View>

            { showCalendar &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={onChangeDate}
                />
            }

            { showClock && 
                <DateTimePicker 
                    testID="dateTimePicker" 
                    value={time} 
                    mode="time" 
                    is24Hour={true} 
                    display="default" 
                    onChange={onChangeTime} 
                />
            }

            <View style={styles.daysCont}>   
                <Text style={styles.txts}>Cantidad de días</Text>

                <View style={styles.pickerContainer}>
                    <Picker
                    style={styles.picker}
                    selectedValue={days}
                    onValueChange={(value, index) => {
                        handlePickerChange(value)
                    }}
                    mode="dropdown" // Android only
                    >
                    {daysArray.map((item, i) => {
                        return <Picker.Item style={{ color: "black" }} key={i} value={item} label={item} />;
                    })}
                    </Picker>
                </View>
            </View>

            <Text style={styles.txtValue}>${price}</Text>

            <View style={styles.btnsContainer}>
                <TouchableOpacity
                    style={styles.btn} 
                    onPress={handleAccept}   
                >
                    <Text style={styles.textBtn}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, {backgroundColor: 'gray'}]}
                    onPress={handleCancel}
                >
                    <Text style={styles.textBtn}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}