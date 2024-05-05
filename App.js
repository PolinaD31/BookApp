import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import BookDetails from './pages/BookDetails';
import ReadingTracker from './pages/ReadingTracker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login';
import SingUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Loader from './components/Common/Loader';
import { bookDetailsHeaderStyles, favoritesDetailsHeaderStyles } from './styles/styles';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='HomeStack' component={Home} options={{ headerShown: false, title: 'Home' }} />
    <HomeStack.Screen name="BookDetails" component={BookDetails} options={bookDetailsHeaderStyles}/>
  </HomeStack.Navigator>
);

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
    <LoginStack.Screen name='SignUp' component={SingUp} options={{ headerShown: false }} />
  </LoginStack.Navigator>
)

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator>
    <FavoritesStack.Screen name='FavoritesStack' component={Favorites} options={favoritesDetailsHeaderStyles} />
    <FavoritesStack.Screen name="BookDetails" component={BookDetails} options={bookDetailsHeaderStyles}/>
  </FavoritesStack.Navigator>
);

  if (isLoading) {
    return (<Loader />);
  }

  return (
    <>
    <StatusBar style='dark' />
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'heart' : 'heart';
              } else if (route.name === 'Reading Tracker') {
                iconName = focused ? 'bar-chart-outline' : 'bar-chart-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'pink',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: 'pink',
              shadowColor: 'black',
              shadowRadius: 10
            },
            headerTitleStyle: {
              fontSize: 20,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name='Favorites' component={FavoritesStackScreen} options={{ headerShown: false }} /> 
          <Tab.Screen name="Reading Tracker" component={ReadingTracker} />
          <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
      ) : (
        <LoginStackScreen />
      )}
    </NavigationContainer>
    </>
  );
}
