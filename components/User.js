import * as React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

import { StyleSheet } from 'react-native';

const UserComponent = (props) => (
    <Card>
        <Card.Content style={styles.flex}>
            <Title>{props.user.userName}</Title>
            <Paragraph style={{marginBottom: 15}}>{props.user.email}</Paragraph>
        </Card.Content>
    </Card>
);

const styles = StyleSheet.create({
    flex: {
        flex: 2,
        justifyContent: 'center'
    }
})

export default UserComponent;
