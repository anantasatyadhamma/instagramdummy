/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './redux/store';

function Apps() {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Apps);
