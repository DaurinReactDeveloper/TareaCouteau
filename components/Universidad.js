import axios from 'axios';
import React, { useState } from 'react';
import { Button, FlatList, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Universidades() {
  const [country, setCountry] = useState("");
  const [universidades, setUniversidades] = useState([]);

  async function Petición() {
    try {
      if (country) {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
        setUniversidades(response.data);
      }
    } catch (error) {
      console.error('Ha ocurrido un error obteniendo las universidades', error);
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder='Inserte el nombre del país en inglés'
        value={country}
        onChangeText={text => setCountry(text)}
        style={estilos.input}
      />
      <Button title="VER UNIVERSIDADES" onPress={Petición} />

      <FlatList
        data={universidades}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={estilos.universityContainer}>
            <Text style={estilos.universityName}>{item.name}</Text>
            <Text style={estilos.universityDomain}>{item.domains[0]}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.web_pages[0])}>
              <Text style={estilos.universityLink}>Visitar Página Web</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  universityContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#9DC5DF',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  universityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  universityDomain: {
    fontSize: 16,
    color: 'grey',
  },
  universityLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
