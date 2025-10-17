import React, {useState, useMemo, useCallback} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import ContactListItem from '../../components/common/ContactListItem';
import CustomInput from '../../components/common/CustomInput';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';
import {searchContacts} from '../../data/contactsData';

const ContactListScreen = () => {
    const navigation = useNavigation();
    const {contacts, deleteContact, toggleFavorite} = useContacts();
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const filteredContacts = useMemo(() => {
        return searchContacts(contacts, searchTerm);
    }, [contacts, searchTerm]);

    const handleContactPress = useCallback((contact) => {
        navigation.navigate('ContactDetails', {contactId: contact.id});
    }, [navigation]);

    const handleEditContact = useCallback((contact) => {
        navigation.navigate('EditContact', {contactId: contact.id});
    }, [navigation]);

    const handleDeleteContact = useCallback((contact) => {
        Alert.alert(
            'Delete Contact',
            `Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteContact(contact.id),
                },
            ]
        );
    }, [deleteContact]);

    const handleCallContact = useCallback((contact) => {
        Alert.alert(
            'Call Contact',
            `Would you like to call ${contact.phone}?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Call', onPress: () => console.log('Calling:', contact.phone)},
            ]
        );
    }, []);

    const handleMessageContact = useCallback((contact) => {
        Alert.alert(
            'Message Contact',
            `Would you like to message ${contact.phone}?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Message', onPress: () => console.log('Messaging:', contact.phone)},
            ]
        );
    }, []);

    const handleAddContact = useCallback(() => {
        navigation.navigate('AddContact');
    }, [navigation]);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        // Simulate refresh
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const renderContactItem = useCallback(({item}) => (
        <ContactListItem
            contact={item}
            onPress={handleContactPress}
            onFavoritePress={toggleFavorite}
            onCallPress={handleCallContact}
            onMessagePress={handleMessageContact}
        />
    ), [handleContactPress, toggleFavorite, handleCallContact, handleMessageContact]);

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Icon name="contacts" size={64} color={Colors.text.secondary} />
            <Text style={styles.emptyTitle}>No Contacts</Text>
            <Text style={styles.emptySubtitle}>
                {searchTerm ? 'No contacts match your search' : 'Add your first contact to get started'}
            </Text>
            {!searchTerm && (
                <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                    <Text style={styles.addButtonText}>Add Contact</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={GlobalStyles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Contacts</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddContact}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Add new contact"
                >
                    <Icon name="add" size={24} color={Colors.text.light} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <CustomInput
                    leftIcon="search"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            <FlatList
                data={filteredContacts}
                renderItem={renderContactItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={renderEmptyList}
                accessibilityRole="list"
                accessibilityLabel="Contacts list"
            />

            {filteredContacts.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.surface,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: Fonts.xlarge,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
    addButton: {
        backgroundColor: Colors.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    searchContainer: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    listContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.sm,
    },
    emptyContainer: {
        ...GlobalStyles.centered,
        flex: 1,
        paddingHorizontal: Spacing.xl,
    },
    emptyTitle: {
        fontSize: Fonts.large,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginTop: Spacing.md,
        marginBottom: Spacing.sm,
    },
    emptySubtitle: {
        fontSize: Fonts.medium,
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        padding: Spacing.md,
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    footerText: {
        fontSize: Fonts.small,
        color: Colors.text.secondary,
        textAlign: 'center',
    },
});

export default ContactListScreen;