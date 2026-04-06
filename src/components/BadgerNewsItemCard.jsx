import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const BadgerNewsItemCard = (props) => {
    const imgBase = "https://raw.githubusercontent.com/CS571-S26/hw8-api-static-content/main/";

    return (
        <Card style={styles.card} onPress={props.onPress}>
            <Card.Cover source={{ uri: `${imgBase}${props.img}` }} />
            <Card.Content>
                <Text variant="titleLarge" style={styles.title}>{props.title}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: 'white',
        elevation: 4
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold'
    }
});

export default BadgerNewsItemCard;