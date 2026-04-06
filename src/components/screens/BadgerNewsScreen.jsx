import { useEffect, useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    
    // Consume the preferences from context
    const [prefs] = useContext(BadgerPreferencesContext);

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/s26/hw8/articles', {
            headers: {
                "X-CS571-ID": "bid_976288979de48a696dddc79c99655c8b217013457581e21dc8ffa145c22acea8"
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data);
        })
        .catch(err => {
            console.error("Error fetching articles:", err);
        });
    }, []);

    const handlePress = (article) => {
        props.navigation.navigate('ArticleDetail', {
            fullArticleId: article.fullArticleId,
            img: article.img,
            title: article.title
        });
    };

    // Filter logic: Keep article only if EVERY tag it has is 'true' in our preferences
    // Alternatively, if the requirement is "at least one tag must be true", 
    // use: art.tags.some(tag => prefs[tag])
    const displayableArticles = articles.filter(art => 
        art.tags.every(tag => prefs[tag] === true || prefs[tag] === undefined)
    );

    return (
        <ScrollView style={styles.container}>
            {
                displayableArticles.length > 0 ? (
                    displayableArticles.map(article => (
                        <BadgerNewsItemCard 
                            key={article.id} 
                            {...article} 
                            onPress={() => handlePress(article)}
                        />
                    ))
                ) : (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.noArticlesText}>
                            {articles.length === 0 ? "Loading news..." : "There are no articles to be displayed."}
                        </Text>
                    </View>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 100,
        paddingHorizontal: 20
    },
    noArticlesText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666'
    }
});

export default BadgerNewsScreen;