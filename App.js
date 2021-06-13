import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'klatchevents.us.auth0.com',
  clientId: 'BkbzakXDcbYnltwoM4tyKHGrm1z6YM9M',
});

const App = () => {
  const [auth, setAuth] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  console.log(auth, userInfo);

  const logIn = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(credentials => {
        setAuth(credentials);
        auth0.auth
          .userInfo({token: credentials.accessToken})
          .then(user => setUserInfo(user));
      })
      .catch(error => console.log(error));
  };

  const logOut = () => {
    auth0.webAuth
      .clearSession({})
      .then(() => {
        setAuth(null);
        setUserInfo(null);
      })
      .catch(error => console.log('Error: ', error));
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {!auth ? (
            <Button onPress={logIn} title="Log In" />
          ) : (
            <Button onPress={logOut} title="Log Out" />
          )}

          {userInfo && (
            <View>
              <Text>Email: {userInfo.email}</Text>
              <Text>Name: {userInfo.name}</Text>
              <Text>Nickname: {userInfo.nickname}</Text>
              <Text>Sub: {userInfo.sub}</Text>
              <Text>Updated At: {userInfo.updatedAt}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
