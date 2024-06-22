import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './components/Inicio';
import Persona from './components/Persona';
import Edad from './components/Edad';
import Universidades from './components/Universidad';
import Clima from './components/Clima';
import NoticiasWordPress from './components/WordPress';
import Perfil from './components/Perfil';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="INICIO" component={Inicio} />
      <Drawer.Screen name="PERSONA" component={Persona} />
      <Drawer.Screen name="EDAD" component={Edad} />
      <Drawer.Screen name="UNIVERSIDAD" component={Universidades} />
      <Drawer.Screen name="CLIMA" component={Clima} />
      <Drawer.Screen name="NOTICIASWORDPRESS" component={NoticiasWordPress} />
      <Drawer.Screen name="PERFIL" component={Perfil} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}
