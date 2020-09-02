import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styles from './App.module.scss';
import { store } from './store';
import './style/styles.scss';
import IndexPage from './pages/IndexPage';
import { Layout, Menu } from 'antd';
import AppHeader from './shared/components/AppHeader';
import Auth from './pages/Auth';
import projectFile from '../package.json';
import CreateScenario from './pages/CreateScenario';
import ScenarioPage from './pages/ScenarioPage';
import SessionPage from './pages/SessionPage';

// import Header from './shared/components/Header';
const { Header, Footer, Content } = Layout;

const App: FC = () => {
    return (
        <Provider store={store}>
            <div className={styles.App}>
                <div className={styles.Components}>
                    <Router>
                        <Layout>
                            <Header>
                                <AppHeader />
                            </Header>
                            {/* 70px footer + 64px header */}
                            <Content className={styles.content}>
                                <Switch>
                                    <Route path="/" exact>
                                        <IndexPage />
                                    </Route>
                                    <Route path="/auth">
                                        <Auth />
                                    </Route>
                                    <Route path="/create-scenario">
                                        <CreateScenario />
                                    </Route>
                                    <Route path="/scenario/:id" exact>
                                        <ScenarioPage />
                                    </Route>
                                    <Route path="/scenario/:scenarioId/:sessionId">
                                        <SessionPage />
                                    </Route>
                                </Switch>
                            </Content>
                            <Footer>Shcheglodom inc. 2020. | v{projectFile.version}</Footer>
                        </Layout>
                    </Router>

                    {/* <Header /> */}
                </div>
            </div>
        </Provider>
    );
};

export default App;
