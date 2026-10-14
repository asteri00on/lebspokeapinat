import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

export default function Original() {
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);

  const obtenerAleatorio = () => {
    setCargando(true);
    const idRandom = Math.floor(Math.random() * 151) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Generador Aleatorio</Text>
      <Text style={styles.subtitle}>Descubre tu compañero del día</Text>

      <TouchableOpacity style={styles.button} onPress={obtenerAleatorio}>
        <Text style={styles.buttonText}>¡Obtener Pokémon!</Text>
      </TouchableOpacity>

      {cargando && <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 20 }} />}

      {pokemon && !cargando && (
        <View style={styles.card}>
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.id}>N.º {pokemon.id}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 25,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: 140,
    height: 140,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  id: {
    fontSize: 14,
    color: '#888',
  },
});