
import React, { Component, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import loadable from '@loadable/component';
import './App.css'
const Day = loadable(() => import('./Day'));
const Settings = loadable(() => import('./Settings'));
const ManageArchive = loadable(() => import('./ManageArchive'));

class App extends Component {

    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route
                                key="1"
                                exact path="/"
                                render={(props) => (<Day {...props} day={'ראשון'} dayNum={1} />)}
                            />
                            <Route
                                key="2"
                                exact path="/2"
                                render={(props) => (<Day {...props} day={'שני'} dayNum={2} />)}
                            />
                            <Route
                                key="3"
                                exact path="/3"
                                render={(props) => (<Day {...props} day={'שלישי'} dayNum={3} />)}
                            />
                            <Route
                                key="4"
                                exact path="/4"
                                render={(props) => (<Day {...props} day={'רביעי'} dayNum={4} />)}
                            />
                            <Route
                                key="5"
                                exact path="/5"
                                render={(props) => (<Day {...props} day={'חמישי'} dayNum={5} />)}
                            />
                            <Route
                                key="6"
                                exact path="/6"
                                render={(props) => (<Day {...props} day={'שישי'} dayNum={6} />)}
                            />
                            <Route
                                key="7"
                                exact path="/7"
                                render={(props) => (<Day {...props} day={'שבת'} dayNum={7} />)}
                            />
                            <Route
                                key="settings"
                                exact path="/settings"
                                render={(props) => (<Settings {...props} />)}
                            />
                            <Route
                                key="archive"
                                exact path="/archive"
                                render={(props) => (<ManageArchive {...props} />)}
                            />
                        </Switch>
                    </div>
                </Router>
            </Suspense>

        );
    }
}

export default App;