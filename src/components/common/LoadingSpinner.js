import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const LoadingSpinner = ({
  size = 'large',
  color = Colors.primary,
  text,
  overlay = false,
}) => {
  if (overlay) {
    return (
      <View style={styles.overlayContainer}>
        <View style={styles.overlayContent}>
          <ActivityIndicator size={size} color={color} />
          {text && <Text style={styles.overlayText}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...GlobalStyles.centered,
    padding: Spacing.xl,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...GlobalStyles.centered,
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.xl,
    ...GlobalStyles.centered,
    minWidth: 120,
    minHeight: 120,
  },
  text: {
    marginTop: Spacing.md,
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  overlayText: {
    marginTop: Spacing.md,
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    textAlign: 'center',
  },
});

export default LoadingSpinner;