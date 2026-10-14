import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Coleccion() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Ejemplo consumiendo PokeAPI (si usas DBZ API, cambia la URL a: https://dragonball-api.com/api/characters)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setPersonajes(datos.results);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>Cargando colección...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={personajes}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          // Obtener la imagen del Pokémon basándonos en su ID
          const id = index + 1;
          const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <View style={styles.card}>
              <Image source={{ uri: imagenUrl }} style={styles.image} />
              <Text style={styles.name}>{item.name.toUpperCase()}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});







git add .
git commit -m "Consumo de API"
git push