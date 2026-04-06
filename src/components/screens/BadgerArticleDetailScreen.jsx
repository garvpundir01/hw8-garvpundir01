import { useEffect, useState, useRef } from "react";
import { ScrollView, Text, Image, StyleSheet, Animated, View, Pressable, Linking } from "react-native";

function BadgerArticleDetailScreen({ route }) {
    const { fullArticleId, img, title } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setLoading(true);
        // Reset animation value so it re-occurs if the user re-visits
        fadeAnim.setValue(0);

        fetch(`https://cs571api.cs.wisc.edu/rest/s26/hw8/article?id=${fullArticleId}`, {
            headers: { 
                "X-CS571-ID": "bid_976288979de48a696dddc79c99655c8b217013457581e21dc8ffa145c22acea8" 
            }
        })
        .then(res => res.json())
        .then(data => {
            setDetails(data);
            setLoading(false);
            
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        })
        .catch(err => console.error("Error:", err));
    }, [fullArticleId]);

    const handlePressURL = () => {
        if (details && details.url) {
            Linking.openURL(details.url);
        }
    };

    const imgBase = "https://raw.githubusercontent.com/CS571-S26/hw8-api-static-content/main/";

    if (loading) {
        return (
            <View style={styles.center}>
                <Text style={styles.loadingText}>The content is loading!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: `${imgBase}${img}` }} style={styles.image} />
            
            <Animated.View style={{ opacity: fadeAnim, padding: 15 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.meta}>By {details?.author} on {details?.posted}</Text>
                
                {/* Step 5: Pressable URL Linking */}
                <Pressable onPress={handlePressURL}>
                    <Text style={styles.linkText}>Read full article here.</Text>
                </Pressable>
                
                <View style={styles.bodyContainer}>
                    {/* The guard 'details?.body?' prevents the 'map of undefined' error */}
                    {details?.body?.map((para, idx) => (
                        <Text key={idx} style={styles.bodyPara}>{para}</Text>
                    ))}
                </View>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { fontSize: 18 },
    image: { width: '100%', height: 250 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    meta: { fontSize: 16, color: '#666', marginBottom: 5 },
    linkText: { color: '#007AFF', fontSize: 16, marginBottom: 15, textDecorationLine: 'underline' },
    bodyContainer: { marginTop: 10 },
    bodyPara: { fontSize: 16, marginBottom: 15, lineHeight: 22 }
});

export default BadgerArticleDetailScreen;