import React, { useState, useEffect, useRef } from 'react';
//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Help from './components/Help';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Image1 from "./images/pic01.jpg";
import Image2 from "./images/pic02.jpg";
import Image3 from "./images/pic03.jpg";
import Image4 from "./images/pic04.jpg";
import Image5 from "./images/pic05.jpg";
import Image6 from "./images/pic06.jpg";
import Image7 from "./images/pic07.jpg";

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

function Home() {
  const [placeholder, setPlaceholder] = useState('Hi');
  const [userVal, setUserVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [postId, setPostId] = useState(0);
  const [apiResponse, setapiResponse] = useState("");
  const userInput = useRef('');
  const passwordInput = useRef('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
	setapiResponse("")
  }, [])
  // Authentication Functions
  useEffect(() => {
	  const requestData = {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({username: userVal, password: passwordVal})
	  };
	  fetch('http://localhost:5000/api/login', requestData)
	  	.then(response=>response.json())
		.then(data => setapiResponse(data.response));
	  console.log(apiResponse);
	  if (apiResponse === "Login Successful") {
		  setLoggedIn(true);
	  }
  }, [postId])


  const logOut = () => {
	  setLoggedIn(false);
	  setUserVal("");
	  setPasswordVal("");
	  setapiResponse("");
  }

  const submitCredentials = () => {
	  userInput.current.value='';
	  passwordInput.current.value='';
	  console.log(userVal, passwordVal);
	  setPostId(postId + 1);
  }

  // Retrieving Data After Login
  const [journalLogs, setJournalLogs] = useState([]);
  const [journalContent, setJournalContent] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [logsUpdateTracker, setUpdateTracker] = useState(true);
  const [todayJournal, setTodayJournal] = useState("");

  useEffect(() => {
	// retrieve list of all dates that the user has journals for
	fetch('http://localhost:5000/api/dates?user='+userVal)
		.then(response => response.json())
		.then(data => setJournalLogs(data.response))
  }, [logsUpdateTracker])

  function retrieveJournalData(e) {
	  // retrieve one day's journal data
	  if (e.target.value !== 'Today') {
		let formatted_date = 'http://localhost:5000/api/logs?date='+userVal+'-'+e.target.value.replace(' ', '-');
		fetch(formatted_date)
			.then(response => response.json())
			.then(data => setJournalContent(data.response));
		//console.log(journalContent);
		setDateSelected(e.target.value);
	  } else {
		  setJournalContent("");
		  setDateSelected(e.target.value);
	  }
  }

  function saveTodayJournal() {
	  // save today's journal logs to db
	fetch('http://localhost:5000/api/savetoday', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({logs: todayJournal, user: userVal}),
		})
		.then(response => response.json())
		.then(data => {
		console.log('Response:', data['response']);
		setUpdateTracker(!logsUpdateTracker); // update dropdown with todays stuff
		setapiResponse(data['response']);
		});
  }

  return (
	  <>
	  {loggedIn && (
		  <div className="app">
			  <head>
				  <title>Logged In</title>
			  </head>
			  <body>
			  		<section id="login">
						<br/>
						<div class="container">
							<button type="button" onClick={logOut}>Log Out</button>
						</div>
					</section>

					<section>
						<h1>Welcome {userVal}!</h1>
					</section>
				  <select onChange={retrieveJournalData}>
					  <option> Today </option>
					  {journalLogs.map((log) =>
					  	<option key={log["day"]} value={log["day"]}>{log["day"]} Journal</option>
					  )}
				  </select>
				  <section>
				  	<h2>{dateSelected}'s Journal</h2>
				  	<p>{journalContent}</p>
					{dateSelected === 'Today' && (
						<div>
							<textarea 
								type="text"
								value={todayJournal}
								onChange={e => setTodayJournal(e.target.value)}
								rows= "15"
							/>
							<br />
							<button onClick={saveTodayJournal}>Save</button>
							<p> {apiResponse} </p>
						</div>
					)}
				  </section>
			  </body>
		  </div>
	)}

	  {!loggedIn && (
		<div className="app">
	<head>
		<title>Strongly Typed by HTML5 UP</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="frontend/src/App.css" />
	</head>
	<body class="homepage is-preload">
		<div id="page-wrapper">
				<section id="header">
					
					<div class="container">

							<h1 id="logo"><a href="index.html">Mental Health Assistant</a></h1>
							<p>A project by Angelyn, Tracy, and Vi.</p>
							
							<section id="login">
								<br/>
								<div class="container">
									<input type="text" ref={userInput} onChange={event => setUserVal(event.target.value)}/>
									<input type="text" ref={passwordInput} onChange={event => setPasswordVal(event.target.value)}/>
									<br/>
									<button type="button" onClick={submitCredentials}>Login/Create Account</button>
									<p>{apiResponse}</p>
								</div>
							</section>
							
							
							<nav id="nav">
								<ul>
									<li><a class="icon solid fa-home" href="index.html"><span>Home</span></a></li>
									<li><a class="icon solid fa-cog" href="left-sidebar.html"><span>About</span></a></li>
									<li><a class="icon solid fa-retweet" href="right-sidebar.html"><span>Journal</span></a></li>
									<li><a class="icon solid fa-retweet" href="right-sidebar.html"><span>Resources</span></a></li>
									<li><a class="icon solid fa-sitemap" href="no-sidebar.html"><span>Login</span></a></li>
								</ul>
							</nav>
					</div>
				</section>
				<section id="features">
					<div class="container">
						<header>
							<h2>Gentlemen, behold! This is <strong>Strongly Typed</strong>!</h2>
						</header>
						<div class="row aln-center">
							<div class="col-4 col-6-medium col-12-small">

									<section>
										<a href="#" class="image featured"><img src={Image1} alt="" /></a>
										<header>
											<h3>Okay, so what is this?</h3>
										</header>
										<p>This is <strong>Strongly Typed</strong>, a free, fully responsive site template
										by <a href="http://html5up.net">HTML5 UP</a>. Free for personal and commercial use under the
										<a href="http://html5up.net/license">CCA 3.0 license</a>.</p>
									</section>

							</div>
							<div class="col-4 col-6-medium col-12-small">
									<section>
										<a href="#" class="image featured"><img src={Image2} alt="" /></a>
										<header>
											<h3>Nice! What is HTML5 UP?</h3>
										</header>
										<p><a href="http://html5up.net">HTML5 UP</a> is a side project of <a href="http://twitter.com/ajlkn">AJ’s</a> (= me).
										I started it as a way to both test my responsive tools and sharpen up my coding
										and design skills a bit.</p>
									</section>

							</div>
							<div class="col-4 col-6-medium col-12-small">

									<section>
										<a href="#" class="image featured"><img src={Image3} alt="" /></a>
										<header>
											<h3>What's this built with?</h3>
										</header>
										<p><strong>Responsive Tools</strong> is a simple set of tools for building responsive
										sites and apps. All of my templates at <a href="http://html5up.net">HTML5 UP</a> are built using these tools.</p>
									</section>

							</div>
							<div class="col-12">
								<ul class="actions">
									<li><a href="#" class="button icon solid fa-file">Tell Me More</a></li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section id="banner">
					<div class="container">
						<p>Use this space for <strong>profound thoughts</strong>.<br />
						Or an enormous ad. Whatever.</p>
					</div>
				</section>

				<section id="main">
					<div class="container">
						<div class="row">

								<div id="content" class="col-8 col-12-medium">

										<article class="box post">
											<header>
												<h2><a href="#">I don’t want to say <strong>it’s the aliens</strong> ...<br />
												but it’s the aliens.</a></h2>
											</header>
											<a href="#" class="image featured"><img src={Image4} alt="" /></a>
											<h3>I mean isn't it possible?</h3>
											<p>Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit
											ligula vel quam viverra sit amet mollis tortor congue. Sed quis mauris
											sit amet magna accumsan tristique. Curabitur leo nibh, rutrum eu malesuada
											in, tristique at erat lorem ipsum dolor sit amet lorem ipsum sed consequat
											magna tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
											consequat magna tempus lorem ipsum consequat Phasellus laoreet massa id
											justo mattis pharetra. Fusce suscipit ligula vel quam viverra sit amet
											mollis tortor congue. Sed quis mauris sit amet magna accumsan tristique.
											Curabitur leo nibh, rutrum eu malesuada in tristique.</p>
											<ul class="actions">
												<li><a href="#" class="button icon solid fa-file">Continue Reading</a></li>
											</ul>
										</article>

										<article class="box post">
											<header>
												<h2><a href="#">By the way, many thanks to <strong>regularjane</strong>
												for these awesome demo photos</a></h2>
											</header>
											<a href="#" class="image featured"><img src={Image5} alt="" /></a>
											<h3>You should probably check out her work</h3>
											<p>Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit
											ligula vel quam viverra sit amet mollis tortor congue. Sed quis mauris
											sit amet magna accumsan tristique. Curabitur leo nibh, rutrum eu malesuada
											in, tristique at erat lorem ipsum dolor sit amet lorem ipsum sed consequat
											consequat magna tempus lorem ipsum consequat Phasellus laoreet massa id
											in, tristique at erat lorem ipsum dolor sit amet lorem ipsum sed consequat
											magna tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
											consequat magna tempus lorem ipsum consequat Phasellus laoreet massa id
											justo mattis pharetra. Fusce suscipit ligula vel quam viverra sit amet
											mollis tortor congue. Sed quis mauris sit amet magna accumsan tristique.
											Curabitur leo nibh, rutrum malesuada.</p>
											<p>Erat lorem ipsum veroeros consequat magna tempus lorem ipsum consequat
											Phasellus laoreet massa id justo mattis pharetra. Fusce suscipit ligula
											vel quam viverra sit amet mollis tortor congue. Sed quis mauris sit amet
											magna accumsan tristique. Curabitur leo nibh, rutrum eu malesuada in,
											tristique at erat. Curabitur leo nibh, rutrum eu malesuada in, tristique
											at erat lorem ipsum dolor sit amet lorem ipsum sed consequat magna
											tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros consequat
											magna tempus.</p>
											<ul class="actions">
												<li><a href="#" class="button icon solid fa-file">Continue Reading</a></li>
											</ul>
										</article>

								</div>

								<div id="sidebar" class="col-4 col-12-medium">

										<section>
											<ul class="divided">
												<li>

														<article class="box excerpt">
															<header>
																<span class="date">July 30</span>
																<h3><a href="#">Just another post</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
												<li>

														<article class="box excerpt">
															<header>
																<span class="date">July 28</span>
																<h3><a href="#">And another post</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
												<li>

														<article class="box excerpt">
															<header>
																<span class="date">July 24</span>
																<h3><a href="#">One more post</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
											</ul>
										</section>

										<section>
											<ul class="divided">
												<li>

														<article class="box highlight">
															<header>
																<h3><a href="#">Something of note</a></h3>
															</header>
															<a href="#" class="image left"><img src={Image6} alt="" /></a>
															<p>Phasellus sed laoreet massa id justo mattis pharetra. Fusce suscipit ligula vel quam
															viverra sit amet mollis tortor congue magna lorem ipsum dolor et quisque ut odio facilisis
															convallis. Etiam non nunc vel est suscipit convallis non id orci. Ut interdum tempus
															facilisis convallis. Etiam non nunc vel est suscipit convallis non id orci.</p>
															<ul class="actions">
																<li><a href="#" class="button icon solid fa-file">Learn More</a></li>
															</ul>
														</article>

												</li>
												<li>

														<article class="box highlight">
															<header>
																<h3><a href="#">Something of less note</a></h3>
															</header>
															<a href="#" class="image left"><img src={Image7} alt="" /></a>
															<p>Phasellus sed laoreet massa id justo mattis pharetra. Fusce suscipit ligula vel quam
															viverra sit amet mollis tortor congue magna lorem ipsum dolor et quisque ut odio facilisis
															convallis. Etiam non nunc vel est suscipit convallis non id orci. Ut interdum tempus
															facilisis convallis. Etiam non nunc vel est suscipit convallis non id orci.</p>
															<ul class="actions">
																<li><a href="#" class="button icon solid fa-file">Learn More</a></li>
															</ul>
														</article>

												</li>
											</ul>
										</section>

								</div>

						</div>
					</div>
				</section>

				<section id="footer">
					<div class="container">
						<header>
							<h2>Questions or comments? <strong>Get in touch:</strong></h2>
						</header>
						<div class="row">
							<div class="col-6 col-12-medium">
								<section>
									<form method="post" action="#">
										<div class="row gtr-50">
											<div class="col-6 col-12-small">
												<input name="name" placeholder="Name" type="text" />
											</div>
											<div class="col-6 col-12-small">
												<input name="email" placeholder="Email" type="text" />
											</div>
											<div class="col-12">
												<textarea name="message" placeholder="Message"></textarea>
											</div>
											<div class="col-12">
												<a href="#" class="form-button-submit button icon solid fa-envelope">Send Message</a>
											</div>
										</div>
									</form>
								</section>
							</div>
							<div class="col-6 col-12-medium">
								<section>
									<p>Erat lorem ipsum veroeros consequat magna tempus lorem ipsum consequat Phaselamet
									mollis tortor congue. Sed quis mauris sit amet magna accumsan tristique. Curabitur
									leo nibh, rutrum eu malesuada.</p>
									<div class="row">
										<div class="col-6 col-12-small">
											<ul class="icons">
												<li class="icon solid fa-home">
													1234 Somewhere Road<br />
													Nashville, TN 00000<br />
													USA
												</li>
												<li class="icon solid fa-phone">
													(000) 000-0000
												</li>
												<li class="icon solid fa-envelope">
													<a href="#">info@untitled.tld</a>
												</li>
											</ul>
										</div>
										<div class="col-6 col-12-small">
											<ul class="icons">
												<li class="icon brands fa-twitter">
													<a href="#">@untitled</a>
												</li>
												<li class="icon brands fa-instagram">
													<a href="#">instagram.com/untitled</a>
												</li>
												<li class="icon brands fa-dribbble">
													<a href="#">dribbble.com/untitled</a>
												</li>
												<li class="icon brands fa-facebook-f">
													<a href="#">facebook.com/untitled</a>
												</li>
											</ul>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div id="copyright" class="container">
						<ul class="links">
							<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</div>
				</section>

		</div>

			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.dropotron.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</body>
  </div>
	)}
  	</>
  )
}
export default App;
