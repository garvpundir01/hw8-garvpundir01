import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerArticleDetailScreen from '../screens/BadgerArticleDetailScreen';

const NewsStack = createNativeStackNavigator();

function BadgerNewsStack() {
    return (
        <NewsStack.Navigator>
            <NewsStack.Screen 
                name="NewsList" 
                component={BadgerNewsScreen} 
                options={{ title: 'Articles' }} 
            />
            <NewsStack.Screen 
                name="ArticleDetail" 
                component={BadgerArticleDetailScreen} 
                options={{ title: 'Article' }} 
            />
        </NewsStack.Navigator>
    );
}

export default BadgerNewsStack;