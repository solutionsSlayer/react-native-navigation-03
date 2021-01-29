import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import { useSelector } from "react-redux";

export default function Detail({ navigation, nom }) {

    const annonces = useSelector(state => state.annonces);

    return (
        <View style={styles.space }>
            <Text style={styles.marginBottom}>Articles similaires à {nom}</Text>
            {
                annonces.filter(annonce => {
                    return annonce.name.includes(nom)
                }).map(annonce => {
                    return (
                        <View style={[styles.item, styles.spaceBottom]}>
                            <Text style={styles.itemName}>{annonce.name}</Text>
                            <Text style={styles.itemPrix}>{annonce.prix} €</Text>
                            <Button
                                title="Acheter"
                                onPress={() => {navigation.navigate('HomeScreen')}}
                            />
                        </View>
                    )
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    space: {
        marginTop: 15
    },
    spaceBottom: {
        marginBottom: 5
    },
    flex: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: '100%'
    },
    itemName: {

    },
    itemPrix: {
        color: '#ccc'
    },
    img: {
        width: 150,
        height: 150,
    }
});

