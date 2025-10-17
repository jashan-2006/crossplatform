// src/screens/ContactList/ContactListScreen.js
import React, { useState } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

const ContactListScreen = ({navigation}) => {
    const [contacts] = useState([
        { id: '1', name: 'John Doe', phone: '+1-555-123-4567' },
        { id: '2', name: 'Jane Smith', phone: '+1-555-987-6543' },
        { id: '3', name: 'Mike Johnson', phone: '+1-555-456-7890' },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Contacts</Text>
                <Text style={styles.subtitle}>{contacts.length} contacts</Text>
            </View>

            <FlatList
                data={contacts}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Text style={styles.contactPhone}>{item.phone}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddContact')}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Hardcoded color
    },
    header: {
        padding: 20, // Hardcoded spacing
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    contactItem: {
        backgroundColor: 'white',
        padding: 16, // Hardcoded spacing
        margin: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    contactPhone: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3498db', // Hardcoded color
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ContactListScreen;