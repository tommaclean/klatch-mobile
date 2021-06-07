import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'klatchevents.us.auth0.com', clientId: 'BkbzakXDcbYnltwoM4tyKHGrm1z6YM9M' });

export default function App() {
  const [accessToken, setAccessToken] = useState(null)
  const logIn = () => {
    auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .then(credentials =>
      // Successfully authenticated
      // Store the accessToken
      setAccessToken(credentials)
    )
    .catch(error => console.log(error));
  }

  
  return (
    <View style={styles.container}>
      <Text>Klatch</Text>
      <Button onPress={logIn} title={"Log In"}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
