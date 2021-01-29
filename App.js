import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { createStore } from 'redux';
import { Provider } from 'react-redux'

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SettingsScreen from './screens/SettingsScreen';
import DetailsScreen from './screens/DetailsScreen';
import EventScreen from './screens/EventScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const initialState = [
    {
      name: 'Vêtement',
      prix: 10,
      image: 'https://cdn.laredoute.com/products/680by680/5/2/9/5294b1566c7fa8d4f7be02dfc0cd926c.jpg'
    },
    {
      name: 'Voiture',
      prix: 3000,
      image: 'https://www.automobile-magazine.fr/asset/cms/800x449/167149/config/115964/peugeot-208.jpg'
    },
    {
      name: 'Vélo',
      prix: 100,
      image: 'https://cdn.tomas-travel.com/fit/repository/FIT00020070121840693/TBX00020050000221441/FIT00020070124494904_sized_800_0.jpg'

    },
    {
      name: 'Chaussure',
      prix: 10,
      image: 'https://www.automobile-magazine.fr/asset/cms/800x449/167149/config/115964/peugeot-208.jpg'
    },
    {
      name: 'Moto',
      prix: 1500,
      image: 'https://moto-station.com/wp-content/uploads/2021/01/27/START_PH_8883.jpg'
    },
    {
      name: 'Vélo',
      prix: 100,
      image: 'https://cdn.tomas-travel.com/fit/repository/FIT00020070121840693/TBX00020050000221441/FIT00020070124494904_sized_800_0.jpg'
    }
  ]

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  function annoncesReducer(state = { annonces: initialState }, action) {
    switch (action.type) {
      default:
        return state
    }
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  let store = createStore(annoncesReducer);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          { loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="EventScreen" component={EventScreen} />
              <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
            </Drawer.Navigator>
          )
        :
          <RootStackScreen/>
        }
        </NavigationContainer>
        </AuthContext.Provider>
        </PaperProvider>
      </Provider>
  );
}

export default App;
