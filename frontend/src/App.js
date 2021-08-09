import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Help from './components/Help';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<body class="homepage is-preload">
				<div id="page-wrapper">
					<section id="header">
						<div class="container">
							<nav id="nav">
								<Router>
									<Nav />
										<Switch>
											<Route exact path="/resources" component={Help} />
											<Route path="/" exact component={Home} />
										</Switch>
								</Router>
							</nav>
						</div>
					</section>
				</div>
			</body>
		</div>
	);
}

export default App;
