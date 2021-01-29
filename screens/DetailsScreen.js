import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../components/Card';
import ArticlesSimilaire from './AriclesSImilaire';

const DetailsScreen = ({navigation, route}) => {
    return (
        <View style={styles.wrapper}>
            <Card article={route.params} />

            <ArticlesSimilaire navigation={navigation} nom={route.params.name} />
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 35
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
