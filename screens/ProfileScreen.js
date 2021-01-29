import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import UserComponent from '../components/User';
import user from '../model/users';

const ProfileScreen = () => {

    const username = user.userName;
    const email = user.email;

    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>

          <Text>Profile Screen</Text>

          <Text>Profile Screen</Text>

          <UserComponent user={{username, email}} />

        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      marginTop: 400,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
