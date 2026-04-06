import { useContext } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerPreferencesScreen() {
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    const toggleSwitch = (tag) => {
        setPrefs(prev => ({
            ...prev,
            [tag]: !prev[tag]
        }));
    };

    return (
        <ScrollView style={styles.container}>
            {Object.keys(prefs).map(tag => (
                <Card key={tag} style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            Currently {prefs[tag] ? "" : "NOT"} showing <Text style={{fontWeight: 'bold'}}>{tag}</Text> articles.
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#fecaca" }}
                            thumbColor={prefs[tag] ? "#c5050c" : "#f4f3f4"}
                            onValueChange={() => toggleSwitch(tag)}
                            value={prefs[tag]}
                        />
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
    card: { marginVertical: 5, padding: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    text: { flex: 1, fontSize: 16 }
});

export default BadgerPreferencesScreen;