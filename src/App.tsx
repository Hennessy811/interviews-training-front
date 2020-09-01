import React, { FC } from 'react';
import { Provider } from 'react-redux';

import styles from './App.module.scss';
import Consumer from './pages/Consumer';
import Trigger from './pages/Trigger';
import Transformer from './pages/Transformer';
import { store } from './store';
import './style/styles.scss';

const App: FC = () => {
    return (
        <Provider store={store}>
            <div className={styles.App}>
                <div className={styles.Components}>
                    <Trigger />
                    <Consumer />
                    <Transformer />
                </div>
            </div>
        </Provider>
    );
};

export default App;
