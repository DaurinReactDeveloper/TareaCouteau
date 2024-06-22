import axios from 'axios';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Edad() {
  const [name, setName] = useState("");
  const [edad, setEdad] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [imagen, setImagen] = useState(null);

  async function Petición() {
    try {
      if (name) {
        const respuesta = await axios.get(`https://api.agify.io?name=${name}`);
        const age = respuesta.data.age;
        setEdad(age);

        if (age >= 18 && age <= 24) {
          setMensaje(`ES JOVEN Y SU EDAD ES: ${age}`);
          setImagen(require('../assets/joven.png')); 
        } else if (age >= 25 && age < 60) {
          setMensaje(`ES ADULTO Y SU EDAD ES: ${age}`);
          setImagen(require('../assets/adulto.png')); 
        } else if (age >= 60) {
          setMensaje(`ES ANCIANO Y SU EDAD ES: ${age}`);
          setImagen(require('../assets/viejo.png')); 
        } else {
          setMensaje(`La edad es: ${age}`);
          setImagen(null);
        }
      }
    } catch (error) {
      console.error('Ha ocurrido un error obteniendo la edad', error);
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder='Inserte su Nombre'
        value={name}
        onChangeText={text => setName(text)}
        style={estilos.input}
      />
      <Button title="VER EDAD" onPress={Petición} />
      {mensaje ? (
        <View style={estilos.viewResultado}>
          {imagen && <Image source={imagen} style={estilos.imagen} />}
          <Text style={estilos.resultText}>{mensaje}</Text>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  viewResultado: {
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#0775B0',
    alignItems: 'center',
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom:10,
  },
});
