import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { ActivityIndicator, Colors } from 'react-native-paper';
import Card from '../components/Card';

const HomeScreen = ({navigation}) => {

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  setTimeout(() => {
    setLoading(false);
  }, 300);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  const annonces = useSelector(state => state.annonces);

  return (
  <ScrollView>
    <Text>{searchQuery}</Text>
    <View>
      { loading &&
      <ActivityIndicator animating={true} color={Colors.red800} size="large" />
      }

      { !loading &&
      annonces.filter(annonce => {
        return !searchQuery || searchQuery && annonce.name.includes(searchQuery)
      }).map(annonce => {
        return (
            <View style={[styles.item, styles.spaceBottom]}>
              <Card article={annonce} />

              <Button
                  title="Acheter"
                  onPress={() => navigation.navigate('DetailsScreen', annonce)}
              />
            </View>
        )
      })
      }
      <StatusBar style="auto" />
    </View>
  </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  spaceTop: {
    marginTop: 150
  },
  spaceBottom: {
    marginBottom: 35
  },
  item: {
    height: 'auto',
    width: '100%',
    padding: 50
  },
  itemPrix: {
    color: '#ccc'
  },
  img: {
    width: 150,
    height: 150,
  },
  wrapper: {
    margin: 'auto',
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
});
