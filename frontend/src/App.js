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
					</div>
				</section>

				{/*Features (Why Mental Health section) */}
				<section id="features">
					<div class="container">

						<header>
						<h2>Understanding <strong>Mental Health?</strong> and Why it Matters</h2>
						</header>

						<div class="row aln-center">
							<div class="col-4 col-6-medium col-12-small">
									<section>
										<a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
										<header>
											<h3>Your emotional well-being</h3>
										</header>
										<p>According to <a target="_blank" href="https://www.mentalhealth.gov/basics/what-is-mental-health"><u><strong>MentalHealth.gov</strong></u></a>, 
										if you experience mental health problems, your thinking, mood, and behavior could be affected. 
										But mental health problems are common, and there's always help available. :)</p>
									</section>
							</div>

							<div class="col-4 col-6-medium col-12-small">
									<section>
										<a href="#" class="image featured"><img src="images/pic02.jpg" alt="" /></a>
										<header>
											<h3>Awareness makes the world a better place</h3>
										</header>
										<p>One of the best ways to spread love in the world is learning how to be empathetic of others,
											which means that it knowing what kinds of mental health problems people might be going through could make a big difference,
											and help people you care about take steps towards healing.
										</p>
									</section>
							</div>

							<div class="col-4 col-6-medium col-12-small">
									<section>
										<a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>
										<header>
											<h3>Everyone deserves help</h3>
										</header>
										<p>The goal of this Mental Health Assistant web app is to help individuals 
											better understand themselves and to provide a safe space to express themselves.</p>
									</section>
							</div>

							<div class="col-12">
								<ul class="actions">
									{/*redirect to Help page?*/}
									<li><a href="#" class="button icon solid fa-file">Learn More</a></li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/*Banner (Quote)*/}
				<section id="banner">
					<div class="container">
					<p><em><strong>"The greatest blessings of mankind are within us and within our reach. 
							A wise man is content with his lot, whatever it may be, 
							without wishing for what he has not" — Seneca</strong></em></p>
					</div>
				</section>

				{/*Main (Why Mental Health section) */}
				<section id="main">
					<div class="container">
						<div class="row">
								<div id="content" class="col-8 col-12-medium">
										<article class="box post">
											<header>
												<h2>What can <strong>Mental Health Assistant</strong> do for me?</h2>
											</header>
											<a href="#" class="image featured"><img src="images/pic04.jpg" alt="" /></a>
											<h3></h3>
											<p>Mental Health is here to provide you insightful tools to help you with your 
												healing process! :) This web app includes a journal to log your emotions, which has 
												(or, we intend to add) sentimental analysis and can detect your mood based on what 
												you write. We also have an interactive assistant, that you might have seen, popping up 
												through a chatbox on the screen! It can do many things, like helping you find what you need ,
												do mood checks, remind you to write logs in your journal, and give you daily
												positive affirmations!</p>
											<ul class="actions">
												<li><a href="#" class="button icon solid fa-file">Continue Reading</a></li>
											</ul>
										</article>

										<article class="box post">
										<header>
												<h2><a href="#">About the makers of <strong>Mental Health Assistant</strong></a></h2>
											</header>
											<a href="#" class="image featured"><img src="images/pic05.jpg" alt="" /></a>
											<h3>This project was made possible by MLH Fellowship!</h3>
											<p>This final project... blah blah blah</p>
											<spacer></spacer>
										</article>

								</div>

								<div id="sidebar" class="col-4 col-12-medium">

										<section>
											<ul class="divided">
												<li>

														<article class="box excerpt">
														<h2>Updates</h2>
															<header>
																<span class="date">Aug 8, 2021</span>
																<h3><a href="#">Sprint 1</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
												<li>

														<article class="box excerpt">
															<header>
																<span class="date">Aug 13, 2021</span>
																<h3><a href="#">Sprint 2</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
												<li>

														<article class="box excerpt">
															<header>
																<span class="date">Aug 20, 2021</span>
																<h3><a href="#">Sprint 3</a></h3>
															</header>
															<p>Lorem ipsum dolor odio facilisis convallis. Etiam non nunc vel est
															suscipit convallis non id orci lorem ipsum sed magna consequat feugiat lorem dolore.</p>
														</article>

												</li>
											</ul>
										</section>
								</div>
						</div>
					</div>

					<h2><span>Meet the Team!</span></h2>
					<div class="row aln-center">
						<div class="col-4 col-6-medium col-12-small">
							
								<section>
									
									<a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
									<header>
										<h3>Angelyn Domingo</h3>
									</header>
									<p>She did frontend stuff!</p>
								</section>

						</div>
						<div class="col-4 col-6-medium col-12-small">
								<section>
									<a href="#" class="image featured"><img src="images/pic02.jpg" alt="" /></a>
									<header>
										<h3>Tracy Dong</h3>
									</header>
									<p>She tied frontend and backend stuff together!
									</p>
								</section>

						</div>
						<div class="col-4 col-6-medium col-12-small">

								<section>
									<a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>
									<header>
										<h3>Vi Pham</h3>
									</header>
									<p>She originally inspired this project and did the backend stuff!</p>
								</section>

						</div>
					</div>

				</section>

				{/*Footer*/}
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
