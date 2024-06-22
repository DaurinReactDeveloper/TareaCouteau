import axios from 'axios';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


export default function Persona() {
const [name, setName] = useState("");
const [render,setRender] = useState("");
const [color,setColor] = useState("");

async function Petición(){

try {

    if(name != null){
        const respuesta = await axios.get(`https://api.genderize.io/?name=${name}`);
        setRender(respuesta.data.gender)

    if(respuesta.data.gender === 'male'){
        setColor("blue")
    }

    else{
        setColor("pink")
    }

    }

} catch (error) {
    console.error('Ha ocurrido un error obteniendo el color', error);
}

}

  return (
   <>
    <View style={estilos.container} >

    <TextInput 
    placeholder='Inserte su Nombre'
    value={name}
    onChangeText={text => setName(text)}
    style={estilos.input}
    />

    <Button title="VER GENERO" onPress={Petición} />

    {render ? (
    <View style={[estilos.viewResultado,{ backgroundColor: color }]}>
         
        <Text style={estilos.resultText}>
           El genero del Nombre {name} es {render}.
        </Text>

    </View>
     ) : null
    }       

    </View>
   </>
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
        padding: 1,
        borderRadius: 5,
      },
      resultText: {
        padding:10,
        color: 'white',
        fontSize: 18,
      },

})

