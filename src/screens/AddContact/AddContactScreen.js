import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import CustomInput from '../../components/common/CustomInput';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';
import {validateContact} from '../../data/contactsData';

const AddContactScreen = () => {
    const navigation = useNavigation();
    const {addContact} = useContacts();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        avatar: '',
        notes: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const companyRef = useRef();
    const avatarRef = useRef();
    const notesRef = useRef();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const handleSubmit = async () => {
        const validation = validateContact(formData);
        setErrors(validation.errors);

        if (!validation.isValid) {
            Alert.alert('Validation Error', 'Please fix the errors before saving.');
            return;
        }

        setIsSubmitting(true);
        try {
            await addContact(formData);
            Alert.alert(
                'Success',
                'Contact added successfully!',
                [{text: 'OK', onPress: () => navigation.goBack()}]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to add contact. Please try again.');
            console.error('Add contact error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (Object.values(formData).some(value => value.trim() !== '')) {
            Alert.alert(
                'Discard Changes?',
                'You have unsaved changes. Are you sure you want to discard them?',
                [
                    {text: 'Keep Editing', style: 'cancel'},
                    {text: 'Discard', style: 'destructive', onPress: () => navigation.goBack()},
                ]
            );
        } else {
            navigation.goBack();
        }
    };

    const focusNextField = (nextRef) => {
        nextRef.current?.focus();
    };

    return (
        <KeyboardAvoidingView
            style={GlobalStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleCancel}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <Icon name="arrow-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add New Contact</Text>
                    <TouchableOpacity
                        style={[styles.saveButton, isSubmitting && styles.saveButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel={isSubmitting ? 'Saving contact' : 'Save contact'}
                    >
                        <Text style={styles.saveButtonText}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>

                    <CustomInput
                        label="First Name"
                        value={formData.firstName}
                        onChangeText={(value) => handleInputChange('firstName', value)}
                        error={errors.firstName}
                        leftIcon="person"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(lastNameRef)}
                        blurOnSubmit={false}
                    />

                    <CustomInput
                        ref={lastNameRef}
                        label="Last Name"
                        value={formData.lastName}
                        onChangeText={(value) => handleInputChange('lastName', value)}
                        error={errors.lastName}
                        leftIcon="person-outline"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(emailRef)}
                        blurOnSubmit={false}
                    />

                    <CustomInput
                        ref={emailRef}
                        label="Email"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        error={errors.email}
                        leftIcon="email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(phoneRef)}
                        blurOnSubmit={false}
                    />

                    <CustomInput
                        ref={phoneRef}
                        label="Phone"
                        value={formData.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        error={errors.phone}
                        leftIcon="phone"
                        keyboardType="phone-pad"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(companyRef)}
                        blurOnSubmit={false}
                    />

                    <Text style={styles.sectionTitle}>Additional Information</Text>

                    <CustomInput
                        ref={companyRef}
                        label="Company"
                        value={formData.company}
                        onChangeText={(value) => handleInputChange('company', value)}
                        error={errors.company}
                        leftIcon="business"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(avatarRef)}
                        blurOnSubmit={false}
                    />

                    <CustomInput
                        ref={avatarRef}
                        label="Avatar URL (Optional)"
                        value={formData.avatar}
                        onChangeText={(value) => handleInputChange('avatar', value)}
                        error={errors.avatar}
                        leftIcon="image"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => focusNextField(notesRef)}
                        blurOnSubmit={false}
                    />

                    <CustomInput
                        ref={notesRef}
                        label="Notes (Optional)"
                        value={formData.notes}
                        onChangeText={(value) => handleInputChange('notes', value)}
                        error={errors.notes}
                        leftIcon="notes"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        returnKeyType="done"
                    />
                </View>

                <View style={styles.helpText}>
                    <Text style={styles.helpTextContent}>
                        Fill in the required fields (marked with *) to create a new contact.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: Spacing.xl,
    },
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
    backButton: {
        padding: Spacing.sm,
    },
    title: {
        fontSize: Fonts.large,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
    },
    saveButtonDisabled: {
        backgroundColor: Colors.text.secondary,
        opacity: 0.6,
    },
    saveButtonText: {
        color: Colors.text.light,
        fontSize: Fonts.medium,
        fontWeight: 'bold',
    },
    form: {
        padding: Spacing.md,
    },
    sectionTitle: {
        fontSize: Fonts.medium,
        fontWeight: 'bold',
        color: Colors.text.primary,
        marginBottom: Spacing.md,
        marginTop: Spacing.lg,
    },
    helpText: {
        paddingHorizontal: Spacing.md,
        marginTop: Spacing.lg,
    },
    helpTextContent: {
        fontSize: Fonts.small,
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default AddContactScreen;