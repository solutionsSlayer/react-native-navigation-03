import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

import { StyleSheet } from 'react-native';

const CarComponent = (props) => (
    <Card>
        <Card.Content style={styles.flex}>
            <Title>{props.article.name}</Title>
            <Paragraph style={{marginBottom: 15}}>{props.article.prix} €</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: props.article.image }} />
    </Card>
);

const styles = StyleSheet.create({
    flex: {
        flex: 2,
        justifyContent: 'center'
    }
})

export default CarComponent;
