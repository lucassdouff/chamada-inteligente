import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/app/navigation/StackNavigation";
import { NavigationProvider } from "./src/core/controllers/NavigationController";

const App = () => {
    return (
        <NavigationProvider>
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </NavigationProvider>
    );
}

export default App;