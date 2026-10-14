import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// 1. Importación de la imagen local desde la carpeta assets
import imagenPortada from '../assets/pokeapinative.png';

export default function Informativa() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 2. Renderizado de la imagen local */}
      <View style={styles.contenedorImagen}>
        <Image
          source={imagenPortada}
          style={styles.imagenPortada}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.title}>Acerca de la Aplicación</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Proyecto React Native</Text>
        <Text style={styles.description}>
          Realizar búsquedas en tiempo real, consultar detalles e interactuar con juegos dinámicos.
        </Text>
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
  contenedorImagen: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  imagenPortada: {
    width: '100%',
    height: '100%',
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