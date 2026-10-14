import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Personaje() {
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consulta a un personaje/pokémon en específico
    fetch('https://pokeapi.co/api/v2/pokemon/25') // Pikachu por defecto
      .then((res) => res.json())
      .then((data) => {
        setPersonaje(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: personaje.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.title}>{personaje.name.toUpperCase()}</Text>
      <Text style={styles.detail}>
        Altura: {personaje.height / 10} m | Peso: {personaje.weight / 10} kg
      </Text>
      <Text style={styles.detail}>
        Tipo: {personaje.types.map((t) => t.type.name).join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});



git add .
git commit -m "Filtro en tiempo real"
git push