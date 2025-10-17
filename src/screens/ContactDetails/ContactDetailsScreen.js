import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';
import {formatContactName} from '../../data/contactsData';

const ContactDetailsScreen = ({route, navigation}) => {
  const {contactId} = route.params;
  const {contacts, deleteContact, toggleFavorite} = useContacts();
  
  const contact = contacts.find(c => c.id === contactId);

  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Contact not found</Text>
      </SafeAreaView>
    );
  }

  const fullName = formatContactName(contact);

  const handleCall = () => {
    const url = `tel:${contact.phone}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    });
  };

  const handleMessage = () => {
    const url = `sms:${contact.phone}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'SMS is not supported on this device');
      }
    });
  };

  const handleEdit = () => {
    navigation.navigate('AddContact', {contact});
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${fullName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteContact(contact.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleToggleFavorite = () => {
    toggleFavorite(contact.id);
  };

  const initials = `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {contact.avatar ? (
              <Image
                source={{uri: contact.avatar}}
                style={styles.avatar}
                accessible={true}
                accessibilityRole="image"
                accessibilityLabel={`${fullName} profile picture`}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.company}>{contact.company || 'No company'}</Text>
          
          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleCall}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Call ${fullName}`}
            >
              <Icon name="call" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleMessage}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Message ${fullName}`}
            >
              <Icon name="message" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleToggleFavorite}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon 
                name={contact.favorite ? 'star' : 'star-border'} 
                size={24} 
                color={Colors.secondary} 
              />
              <Text style={styles.actionText}>
                {contact.favorite ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Icon name="email" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>{contact.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Icon name="business" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>{contact.company || 'No company'}</Text>
          </View>
          
          {contact.notes ? (
            <View style={styles.infoItem}>
              <Icon name="notes" size={20} color={Colors.text.secondary} />
              <Text style={styles.infoText}>{contact.notes}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEdit}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Edit contact"
        >
          <Icon name="edit" size={20} color={Colors.text.light} />
          <Text style={styles.editButtonText}>Edit Contact</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Delete contact"
        >
          <Icon name="delete" size={20} color={Colors.accent} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    ...GlobalStyles.centered,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    ...GlobalStyles.centered,
  },
  avatarText: {
    color: Colors.text.light,
    fontSize: Fonts.xLarge,
    fontWeight: 'bold',
  },
  name: {
    fontSize: Fonts.xLarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  company: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: Spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  infoSection: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoText: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  editButtonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  deleteButtonText: {
    color: Colors.accent,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  errorText: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
});

export default ContactDetailsScreen;