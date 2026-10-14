import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar los 6 componentes
import Inicio from './components/Inicio';
import Personaje from './components/Personaje';
import Coleccion from './components/Coleccion';
import Favoritos from './components/Favoritos';
import Informativa from './components/Informativa';
import Original from './components/Original';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#f4511e',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Inicio" component={Inicio} />
        <Tab.Screen name="Personaje" component={Personaje} />
        <Tab.Screen name="Colección" component={Coleccion} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Informativa" component={Informativa} />
        <Tab.Screen name="Original" component={Original} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
