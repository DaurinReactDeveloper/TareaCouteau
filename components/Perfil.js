import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Perfil() {
  const nombre = 'Daurin Gonzalez';
  const email = 'dauringonzales@gmail.com';
  const teléfono = '809-918-7905';

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Image source={require('../assets/Daurin.jpg')} style={styles.imagen} />
      <Text style={styles.texto}>Email: {email}</Text>
      <Text style={styles.texto}>Teléfono: {teléfono}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagen: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    marginBottom: 20,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
});
