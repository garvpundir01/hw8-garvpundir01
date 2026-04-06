import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BadgerNewsStack from './BadgerNewsStack'; // This is the one we want!
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';

const BadgerTab = createBottomTabNavigator();

function BadgerTabs() {
    return (
        <BadgerTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'News') {
                        iconName = 'newspaper';
                    } else if (route.name === 'Preferences') {
                        iconName = 'settings';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {/* CHANGE THIS LINE: Use BadgerNewsStack instead of BadgerNewsScreen */}
            <BadgerTab.Screen 
                name="News" 
                component={BadgerNewsStack} 
                options={{ headerShown: false }} // We hide this so we only see the Stack's header
            />
            
            <BadgerTab.Screen 
                name="Preferences" 
                component={BadgerPreferencesScreen} 
            />
        </BadgerTab.Navigator>
    );
}

export default BadgerTabs;