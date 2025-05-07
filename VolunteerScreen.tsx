// VolunteerScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

interface Request {
  id: string;
  title: string;
  description: string;
  quantity: string;
  active?: boolean;
  volunteerId?: string | null;
}

export default function VolunteerScreen() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const q = query(collection(db, 'requests'), where('volunteerId', '==', null));
      const snapshot = await getDocs(q);
      const data: Request[] = snapshot.docs.map(doc => {
        const d = doc.data() as Request;
        return { ...d, id: doc.id };
      });
      setRequests(data);
    } catch (error) {
      console.error('Fetch error:', (error as Error).message);
    }
  };

  const handleTend = async (requestId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not logged in');

      const requestRef = doc(db, 'requests', requestId);
      await updateDoc(requestRef, {
        volunteerId: user.uid,
      });

      Alert.alert('Success', 'You are now tending to this request');
      fetchRequests(); // Refresh list
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }: { item: Request }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>Description: {item.description}</Text>
      <Text style={styles.cardText}>Quantity: {item.quantity}</Text>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: item.active ? 'green' : 'red' }]}>
          {item.active ? 'Active' : 'Inactive'}
        </Text>
      </View>

      {/* Add other buttons here like Edit, Tend, etc. */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTend(item.id)}
      >
        <Text style={styles.buttonText}>Tend to Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
  statusContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#eef',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8FE1D7',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
