import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BadgerTabs from './navigation/BadgerTabs';
import CS571 from '@cs571/mobile-client';

export default function BadgerNews(props) {

  const [prefs, setPrefs] = useState({});

  return (
    <>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </>
  );
}