import React, { useState } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import {Colors, GlobalStyles} from '../../styles/globalStyles';

const ContactListScreen = ({navigation}) => {
    const [contacts] = useState([
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-123-4567',
            company: 'Tech Corp',
        },
        {
            id: '2', 
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+1-555-987-6543',
            company: 'Design Studio',
        },
    ]);

    const renderContactItem = ({item}) => (
        <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>
                    {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.contactCompany}>{item.company}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Contacts</Text>
                <Text style={styles.subtitle}>{contacts.length} contacts</Text>
            </View>

            <FlatList
                data={contacts}
                renderItem={renderContactItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
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
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 5,
    },
    list: {
        flex: 1,
    },
    contactItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    contactCompany: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 2,
    },
    contactPhone: {
        fontSize: 14,
        color: '#3498db',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ContactListScreen;