import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BadgerTabs from './src/components/navigation/BadgerTabs';
import BadgerPreferencesContext from './src/contexts/BadgerPreferencesContext';

export default function App() {
  const [prefs, setPrefs] = useState({});

  // Fetch unique tags initially to set all to 'true' by default
  useEffect(() => {
    fetch('https://cs571api.cs.wisc.edu/rest/s26/hw8/articles', {
      headers: { "X-CS571-ID": "bid_976288979de48a696dddc79c99655c8b217013457581e21dc8ffa145c22acea8" }
    })
    .then(res => res.json())
    .then(articles => {
      const allTags = [...new Set(articles.flatMap(a => a.tags))];
      const initialPrefs = {};
      allTags.forEach(tag => initialPrefs[tag] = true);
      setPrefs(initialPrefs);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
    </SafeAreaProvider>
  );
}