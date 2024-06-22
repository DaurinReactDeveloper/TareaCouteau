import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';

export default function Clima() {
    const [clima, setClima] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Petición();
    }, []);

    const Petición = async () => {
        try {
            const respuesta = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude: 18.7357,  // Latitud para República Dominicana
                    longitude: -70.1627,  // Longitud para República Dominicana
                    hourly: 'temperature_2m',
                    current_weather: true
                }
            });
            setClima(respuesta.data.current_weather);
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error obteniendo datos del clima: {error}</Text>
            </View>
        );
    }

    if (!clima) {
        return (
            <View style={styles.container}>
                <Text>Cargando datos del clima...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clima Actual en República Dominicana</Text>
            <Text style={styles.weatherText}>Temperatura: {clima.temperature}°C</Text>
            <Text style={styles.weatherText}>Velocidad del Viento: {clima.windspeed} m/s</Text>
            <Button title="Actualizar" onPress={Petición} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    weatherText: {
        fontSize: 16,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});
