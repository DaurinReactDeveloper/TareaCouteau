import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Inicio() {
  return (
    <>
    <View style={estilos.ViewCentral}>
    <Text style={estilos.Texto}>COUTEAU</Text>
    <Image source={require("../assets/cajaherramientas.jpg")} style={estilos.Image}   />
    </View>
    </>
  )
}

const estilos = StyleSheet.create({
ViewCentral:{
    flex:1,
    padding:20,
},

Image:{
    width:350,
    height:350,
    borderRadius:10,
},

Texto:{
fontSize:20,
textAlign:"center",
marginBottom:20,

}
})