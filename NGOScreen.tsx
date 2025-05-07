import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../types/Navigation';

export default function NGODashboardScreen() {
  const [requests, setRequests] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'requests'), snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EditRequest', { requestId: item.id })}
    >
      {/* Profile/NGO Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
          style={styles.image}
        />
      </View>

      {/* NGO Name / Title */}
      <Text style={styles.cardTitle}>{item.title}</Text>

      {/* Info Fields */}
      <Text style={styles.cardField}>Quantity: {item.quantity || 'N/A'}</Text>
      <Text style={styles.cardField}>Location: {item.location || 'N/A'}</Text>
      <Text style={styles.cardField}>Need before - {item.timeNeeded || 'N/A'}</Text>

      {/* Status */}
      <Text
        style={[
          styles.cardField,
          item.status === 'active' && { color: 'green', fontWeight: 'bold' },
        ]}
      >
        Status: {item.status?.toUpperCase() || 'N/A'}
      </Text>

      {/* Description Box */}
      <View style={styles.descBox}>
        <Text style={styles.descLabel}>Description</Text>
        <Text style={styles.descText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NGO Dashboard</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: '#FFD166' }]}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.addButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddRequest')}>
        <Text style={styles.addButtonText}>+ New Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  cardField: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  descBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  descLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  descText: {
    textAlign: 'center',
    fontSize: 14,
  },
  addButton: {
    height: 50,
    backgroundColor: '#8FE1D7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
