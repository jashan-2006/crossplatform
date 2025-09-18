import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to CPAN 213</Text>
          <Text style={styles.subtitle}>Cross-Platform Mobile Development</Text>
        </View>

        <View style={styles.content}>
          <Image 
            source={{uri: 'https://d1krbhyfejrtpz.cloudfront.net/blog/wp-content/uploads/2018/09/07170744/Cross-Development-App-Development.jpg'}}
            style={styles.profileImage}
          />
          <Text style={styles.greeting}>Hello, I'm Jashandeep Singh !</Text>
          <Text style={styles.info}>Student ID: N01736561</Text>
          <Text style={styles.info}>Program: computer programming </Text>
        </View>

        <View style={styles.goals}>
          <Text style={styles.sectionTitle}>My Course Goals:</Text>
          <Text style={styles.goal}>- Learn React Native fundamentals</Text>
          <Text style={styles.goal}>- Build cross-platform mobile apps</Text>
          <Text style={styles.goal}>- Master state management with Redux</Text>
          <Text style={styles.goal}>- Deploy apps to app stores</Text>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "The best way to predict the future is to create it."
          </Text>
          <Text style={styles.quoteAuthor}>- Peter Drucker</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9fc',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  goals: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  goal: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
    lineHeight: 22,
    paddingLeft: 10,
  },
  quoteContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#e8f4fc',
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default App;