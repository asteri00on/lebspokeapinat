import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Informativa() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Proyecto React Native + Expo</Text>
        <Text style={styles.description}>
          Aplicación desarrollada para la materia de Tecnologías Web. Permite explorar la colección de Pokémon, realizar búsquedas en tiempo real y consultar detalles individuales.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Tecnologías Integradas</Text>
        <Text style={styles.item}>• React Native & Expo</Text>
        <Text style={styles.item}>• React Navigation (Bottom Tabs)</Text>
        <Text style={styles.item}>• PokeAPI (REST API)</Text>
        <Text style={styles.item}>• GitHub Codespaces</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  item: {
    fontSize: 14,
    color: '#444',
    marginVertical: 2,
  },
});