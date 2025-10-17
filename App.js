import React, {createContext, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';

// Contact Context
const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};

export const ContactProvider = ({children}) => {
  const [contacts, setContacts] = useState([
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

  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Date.now().toString(),
    };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (contactId, contactData) => {
    setContacts(prev => prev.map(contact =>
      contact.id === contactId ? {...contact, ...contactData} : contact
    ));
  };

  const deleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

// Contact List Screen
function ContactListScreen({navigation}) {
  const {contacts} = useContacts();

  const renderContactItem = ({item}) => (
    <TouchableOpacity 
      style={styles.contactItem}
      onPress={() => navigation.navigate('ContactDetails', {contactId: item.id})}
    >
      <Text style={styles.contactName}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.contactCompany}>{item.company}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
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
}

// Add Contact Screen
function AddContactScreen({navigation, route}) {
  const {addContact, updateContact} = useContacts();
  const existingContact = route?.params?.contact;
  const isEdit = !!existingContact;

  const [firstName, setFirstName] = useState(existingContact?.firstName || '');
  const [lastName, setLastName] = useState(existingContact?.lastName || '');
  const [email, setEmail] = useState(existingContact?.email || '');
  const [phone, setPhone] = useState(existingContact?.phone || '');
  const [company, setCompany] = useState(existingContact?.company || '');

  const handleSubmit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Please enter first and last name');
      return;
    }

    const contactData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
    };

    if (isEdit) {
      updateContact(existingContact.id, contactData);
      Alert.alert('Success', 'Contact updated successfully');
    } else {
      addContact(contactData);
      Alert.alert('Success', 'Contact added successfully');
    }
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="Enter company"
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isEdit ? 'Update Contact' : 'Add Contact'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Contact Details Screen
function ContactDetailsScreen({route, navigation}) {
  const {contactId} = route.params;
  const {contacts, deleteContact} = useContacts();
  
  const contact = contacts.find(c => c.id === contactId);
  
  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Contact not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteContact(contactId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {contact.firstName} {contact.lastName}
          </Text>
          <Text style={styles.company}>{contact.company}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{contact.phone}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{contact.email}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Company</Text>
            <Text style={styles.detailValue}>{contact.company}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('AddContact', {contact})}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles
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
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  company: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  details: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
});

// Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ContactList">
          <Stack.Screen 
            name="ContactList" 
            component={ContactListScreen}
            options={{title: 'Contacts'}}
          />
          <Stack.Screen 
            name="AddContact" 
            component={AddContactScreen}
            options={{title: 'Add Contact'}}
          />
          <Stack.Screen 
            name="ContactDetails" 
            component={ContactDetailsScreen}
            options={{title: 'Contact Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  );
}