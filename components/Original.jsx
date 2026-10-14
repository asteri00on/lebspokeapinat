import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function Original() {
  const [jugador, setJugador] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [resultado, setResultado] = useState(null); // 'ganaste', 'perdiste', 'empate'
  const [statElegido, setStatElegido] = useState(null);
  const [victorias, setVictorias] = useState(0);
  const [derrotas, setDerrotas] = useState(0);

  // Mapear stats de la PokeAPI
  const obtenerStatsSimplificados = (data) => {
    return {
      id: data.id,
      nombre: data.name.toUpperCase(),
      imagen:
        data.sprites?.other?.['official-artwork']?.front_default ||
        data.sprites?.front_default,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      velocidad: data.stats[5].base_stat,
    };
  };

  const generarNuevoCombate = async () => {
    setCargando(true);
    setResultado(null);
    setStatElegido(null);

    try {
      const idJugador = Math.floor(Math.random() * 151) + 1;
      let idCpu = Math.floor(Math.random() * 151) + 1;
      while (idCpu === idJugador) {
        idCpu = Math.floor(Math.random() * 151) + 1;
      }

      const [resJ, resC] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${idJugador}`).then((r) => r.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${idCpu}`).then((r) => r.json()),
      ]);

      setJugador(obtenerStatsSimplificados(resJ));
      setCpu(obtenerStatsSimplificados(resC));
      setCargando(false);
    } catch (error) {
      console.error('Error al cargar la batalla:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    generarNuevoCombate();
  }, []);

  const pelearConStat = (statKey, nombreStat) => {
    if (resultado || !jugador || !cpu) return;

    setStatElegido(nombreStat);
    const valJugador = jugador[statKey];
    const valCpu = cpu[statKey];

    if (valJugador > valCpu) {
      setResultado('ganaste');
      setVictorias((prev) => prev + 1);
    } else if (valJugador < valCpu) {
      setResultado('perdiste');
      setDerrotas((prev) => prev + 1);
    } else {
      setResultado('empate');
    }
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={styles.cargandoTexto}>Buscando contrincante en la Arena...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Marcador de Puntuación */}
      <View style={styles.marcador}>
        <View style={styles.marcadorBox}>
          <Text style={styles.marcadorEtiqueta}>VICTORIAS</Text>
          <Text style={[styles.marcadorValor, { color: '#22c55e' }]}>🏆 {victorias}</Text>
        </View>
        <Text style={styles.vsHeader}>VS</Text>
        <View style={styles.marcadorBox}>
          <Text style={styles.marcadorEtiqueta}>DERROTAS</Text>
          <Text style={[styles.marcadorValor, { color: '#ef4444' }]}>💀 {derrotas}</Text>
        </View>
      </View>

      <Text style={styles.titulo}>⚔️ Arena de Combate por Atributos</Text>
      <Text style={styles.subtitulo}>Elige el mejor atributo de tu Pokémon para atacar</Text>

      {/* Zona de Tarjetas */}
      <View style={styles.arenaRow}>
        {/* Tu Pokémon */}
        <View style={[styles.card, styles.cardJugador]}>
          <Text style={styles.cardHeader}>TU GUERRERO</Text>
          <Image source={{ uri: jugador.imagen }} style={styles.pokemonImg} />
          <Text style={styles.pokemonNombre}>{jugador.nombre}</Text>
        </View>

        {/* Pokémon RivaL */}
        <View style={[styles.card, styles.cardCpu]}>
          <Text style={styles.cardHeader}>OPONENTE</Text>
          <Image
            source={{ uri: cpu.imagen }}
            style={[styles.pokemonImg, !resultado && styles.ocultoCpu]}
          />
          <Text style={styles.pokemonNombre}>
            {resultado ? cpu.nombre : '❓ ???'}
          </Text>
        </View>
      </View>

      {/* Banner de Resultado */}
      {resultado && (
        <View style={styles.resultBanner}>
          <Text style={styles.resultTitle}>
            {resultado === 'ganaste' && '¡VICTORIA ÉPICA! 🎉'}
            {resultado === 'perdiste' && '¡DERROTA EN COMBATE! ❌'}
            {resultado === 'empate' && '¡EMPATE TÁCTICO! 🤝'}
          </Text>
          <Text style={styles.resultSub}>
            Atacaste con {statElegido}
          </Text>
        </View>
      )}

      {/* Selector de Atributos para Pelear */}
      <Text style={styles.sectionTitle}>
        {resultado ? 'Estadísticas Finales:' : 'Selecciona Tu Atributo de Ataque:'}
      </Text>

      <View style={styles.statsGrid}>
        {[
          { key: 'hp', label: '❤️ Vida (HP)' },
          { key: 'ataque', label: '⚔️ Ataque' },
          { key: 'defensa', label: '🛡️ Defensa' },
          { key: 'velocidad', label: '⚡ Velocidad' },
        ].map((item) => {
          const valJ = jugador[item.key];
          const valC = cpu[item.key];

          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.statButton,
                resultado && styles.statButtonDisabled,
              ]}
              onPress={() => pelearConStat(item.key, item.label)}
              disabled={!!resultado}
            >
              <Text style={styles.statLabel}>{item.label}</Text>
              <View style={styles.valuesRow}>
                <Text style={styles.valJugador}>Tú: {valJ}</Text>
                {resultado && <Text style={styles.valCpu}>Rival: {valC}</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón Siguiente Batalla */}
      {resultado && (
        <TouchableOpacity style={styles.btnSiguiente} onPress={generarNuevoCombate}>
          <Text style={styles.btnSiguienteTexto}>Siguiente Combate ➔</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#0f172a',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 16,
    color: '#94a3b8',
  },
  marcador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  marcadorBox: {
    alignItems: 'center',
    width: '40%',
  },
  marcadorEtiqueta: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  marcadorValor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  vsHeader: {
    fontSize: 20,
    fontWeight: '900',
    color: '#f59e0b',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 15,
    textAlign: 'center',
  },
  arenaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
  },
  cardJugador: {
    borderColor: '#3b82f6',
  },
  cardCpu: {
    borderColor: '#ef4444',
  },
  cardHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#cbd5e1',
    marginBottom: 5,
  },
  pokemonImg: {
    width: 90,
    height: 90,
  },
  ocultoCpu: {
    tintColor: '#000000',
  },
  pokemonNombre: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  resultBanner: {
    width: '100%',
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  resultSub: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f1f5f9',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statsGrid: {
    width: '100%',
  },
  statButton: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#3b82f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statButtonDisabled: {
    borderColor: '#475569',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  valuesRow: {
    alignItems: 'flex-end',
  },
  valJugador: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#60a5fa',
  },
  valCpu: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f87171',
  },
  btnSiguiente: {
    backgroundColor: '#f59e0b',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  btnSiguienteTexto: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});