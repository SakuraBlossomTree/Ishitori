import React from 'react';
// Main App file which uses Drawer

// Module imports

import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SideBar from './screens/SideBar';
import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();

// Define the Drawer constant

const Drawer = createDrawerNavigator();

// Main App function

const App = () => {

    return(

        // It returns a SafeAreaProvider which I had to include because of errors when building it with expo

        // Then a NavigationContainer which has the Drawers

        // Then Two Drawer Screens which are the SideBar and the HomeScreen

        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen
                        name="SideBar"
                        component={SideBar}
                        options={{title: 'Welcome to SideBar'}}
                    />
                    <Drawer.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{title: 'Welcome'}}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
        );
};

// Exporting the App component

export default App;
