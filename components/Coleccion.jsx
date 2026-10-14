import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  TextInput 
} from 'react-native';

export default function Coleccion() {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
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

  // Filtrar los personajes según el texto ingresado en tiempo real
  const personajesFiltrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda.toLowerCase())
  );

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
      {/* Campo de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar personaje o pokémon..."
        value={busqueda}
        onChangeText={(texto) => setBusqueda(texto)}
      />

      <FlatList
        data={personajesFiltrados}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          // Obtención de ID basándose en la URL de la API
          const urlParts = item.url.split('/');
          const id = urlParts[urlParts.length - 2];
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
  searchInput: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
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