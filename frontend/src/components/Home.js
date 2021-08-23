import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import AngelynPFP from "../images/AngelynPFP.jpg";
import TracyPFP from "../images/TracyPFP.jpg";
import ViPFP from "../images/ViPFP.jfif";
import hearthug from "../images/heart-hug.png";
import empathy from "../images/empathy.png";
import help from "../images/help.png";
import mlhBanner from "../images/mlh.png";

function Home() {
    const [userVal, setUserVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [postId, setPostId] = useState(0);
    const [apiResponse, setapiResponse] = useState("");
    const userInput = useRef('');
    const passwordInput = useRef('');
    const [loggedIn, setLoggedIn] = useState(false);
    //const API_ADDRESS = "http://54.88.61.255:5000/";
    const API_ADDRESS = '/';

  
    useEffect(() => {
      setapiResponse("")
      const loggedInUser = localStorage.getItem('username');
      const loggedInPassword = localStorage.getItem('password');
      if (loggedInUser && loggedInPassword) {
        setUserVal(loggedInUser);
        setPasswordVal(loggedInPassword);
        console.log(loggedInUser);
        console.log("user is " + userVal);

        setLoggedIn(true);
      }
    }, [])

    // Authentication Functions
    useEffect(() => {
        const requestData = {
            method: 'POST',
            headers: {
                'Authorization': btoa(userVal + ':' + passwordVal),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: userVal, password: passwordVal })
        };
        fetch(API_ADDRESS + 'api/login', requestData)
            .then(response => response.json())
            .then(data => setapiResponse(data.response));
        console.log(apiResponse);
        if (apiResponse === "Login Successful") {
            setLoggedIn(true);
             localStorage.setItem('username', userVal);
             localStorage.setItem('password', passwordVal);
        }
    }, [postId])


    const logOut = () => {
        setLoggedIn(false);
        setUserVal("");
        setPasswordVal("");
        setapiResponse("");
        localStorage.clear();
    }

    const submitCredentials = () => {
        userInput.current.value = '';
        passwordInput.current.value = '';
        console.log(userVal, passwordVal);
        setPostId(postId + 1);
    }

    const registerNewUser = () => {
        if (userVal !== '' && passwordVal !== '') {
            const requestData = {
                method: 'POST',
                headers: {
                    'Authorization': btoa(userVal + ':' + passwordVal),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: userVal, password: passwordVal })
            };
            fetch(API_ADDRESS + 'api/register', requestData)
                .then(response => response.json())
                .then(data => setapiResponse(data.response));
            console.log(apiResponse);
        }
    }

    // Retrieving Data After Login
    const [journalLogs, setJournalLogs] = useState([]);
    const [journalContent, setJournalContent] = useState("");
    const [dateSelected, setDateSelected] = useState("Today");
    const [logsUpdateTracker, setUpdateTracker] = useState(true);
    const [todayJournal, setTodayJournal] = useState("");
    const [todayTitle, setTodayTitle] = useState("");
    const [journalTitle, setJournalTitle] = useState("")

    useEffect(() => {
        // retrieve list of all dates that the user has journals for
        fetch(API_ADDRESS + 'api/dates?user=' + userVal, {
            headers: {
                'Authorization': btoa(userVal + ':' + passwordVal),
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.response) {
                    setJournalLogs(data.response)
                }
            })
    }, [logsUpdateTracker])

    function retrieveJournalData(e) {
        // retrieve one day's journal data
        if (e.target.value !== 'Today') {
            let formatted_date = API_ADDRESS + 'api/logs?date=' + e.target.value.replace(' ', '-');
            fetch(formatted_date, {
                headers: {
                    'Authorization': btoa(userVal + ':' + passwordVal),
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => (setJournalContent(data.response) && setJournalTitle(data.title)));
            //console.log(journalContent);
            setDateSelected(e.target.value);
        } else {
            setJournalContent("");
            setDateSelected(e.target.value);
        }
    }

    function saveTodayJournal() {
        // save today's journal logs to db
        fetch(API_ADDRESS + 'api/savetoday', {
            method: 'POST', // or 'PUT'
            headers: {
                'Authorization': btoa(userVal + ':' + passwordVal),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: todayJournal,
                user: userVal,
                title: todayTitle
            }),
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
                <div>
                    {/*Login section*/}
                    <section id="login">
                        <br />
                        <div class="container">
                            <button type="button" onClick={logOut}>Log Out</button>
                        </div>
                    </section>

                    {/*Welcome section*/}
                    <section>
                        <h1>Welcome {userVal}!</h1>
                    </section>

                    <select onChange={retrieveJournalData}>
                        <option> Today </option>
                        {journalLogs && journalLogs.map((log) =>
                            <option key={log["day"]} value={log["day"]}>{log["day"]} Journal</option>
                        )}
                    </select>

                    {/*Journal section*/}
                    <section>
                        <h2>{dateSelected}'s Journal</h2>
                        <h3>{journalTitle}</h3>
                        <p>{journalContent}</p>
                        {dateSelected === 'Today' && (
                            <div>
                                <textarea
                                    type="text"
                                    value={todayTitle}
                                    onChange={e => setTodayTitle(e.target.value)}
                                    rows='1'
                                />
                                <textarea
                                    type="text"
                                    value={todayJournal}
                                    onChange={e => setTodayJournal(e.target.value)}
                                    rows="15"
                                />
                                <br />
                                <button onClick={saveTodayJournal}>Save</button>
                                <p> {apiResponse} </p>
                            </div>
                        )}
                    </section>
                </div>
            )}

            {!loggedIn && (
                <div>
                    <div id="page-wrapper">

                        {/*Header & Login*/}
                        <section id="header">
                            <div class="container">
                                <h1 id="logo"><a href="index.html">Mental Health Assistant</a></h1>
                                <p>A project by Angelyn, Tracy, and Vi.</p>

                                <section id="login">
                                    <br />
                                    <div class="container">
                                        <input type="text" ref={userInput} onChange={event => setUserVal(event.target.value)} />
                                        <input type="text" ref={passwordInput} onChange={event => setPasswordVal(event.target.value)} />
                                        <br />
                                        <button type="button" onClick={submitCredentials}>Login</button>
                                        <button type="button" onClick={registerNewUser}>Register New User</button>
                                        <p>{apiResponse}</p>
                                    </div>
                                </section>
                            </div>
                        </section>

                        {/*Features (Why Mental Health section) */}
                        <section id="features">
                            <div class="container">
                                <header>
                                    <h2>Understanding <strong>Mental Health</strong> and Why it Matters</h2>
                                </header>
                                <div class="row aln-center">
                                    <div class="col-4 col-6-medium col-12-small">
                                        <section>
                                            <span class="image featured"><img src={hearthug} alt="" /></span>
                                            <header>
                                                <h3>Your emotional well-being</h3>
                                            </header>
                                            <p>According to <a target="_blank" href="https://www.mentalhealth.gov/basics/what-is-mental-health"><u><strong>MentalHealth.gov</strong></u></a>,
                                                if you experience mental health problems, your thinking, mood, and behavior could be affected.
                                                But mental health problems are common, and <strong>there's always help available</strong>. :)</p>
                                        </section>
                                    </div>
                                    <div class="col-4 col-6-medium col-12-small">
                                        <section>
                                            <span class="image featured"><img src={empathy} alt="" /></span>
                                            <header>
                                                <h3>Awareness saves lives</h3>
                                            </header>
                                            <p>One of the best ways to spread love in the world is learning how to be empathetic of others,
                                                which means that it knowing what kinds of mental health problems people might be going through could make a big difference,
                                                and help people you care about take steps towards healing.</p>
                                        </section>
                                    </div>
                                    <div class="col-4 col-6-medium col-12-small">
                                        <section>
                                            <span class="image featured"><img src={help} alt="" /></span>
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
                                            <Link to='/resources'><button className="">Learn More</button></Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/*Inspiring Quote Section*/}
                        <section id="banner">
                            <div class="container">
                                <p><em><strong>"The greatest blessings of mankind are within us and within our reach.
                                    A wise man is content with his lot, whatever it may be,
                                    without wishing for what he has not" — Seneca</strong></em></p>
                            </div>
                        </section>

                        {/*Main Section*/}
                        <section id="main">
                            <div class="container">
                                <div class="row">

                                    {/*Why Mental Health*/}
                                    <div id="content" class="col-8 col-12-medium">
                                        <article class="box post">
                                            <header>
                                                <h2>What can <strong>Mental Health Assistant</strong> do for me?</h2>
                                            </header>
                                            {/*<span class="image featured"><img src={hearthug} alt="" /></span>*/}
                                            <p>Mental Health is here to provide you insightful tools to help you with your
                                                healing process! :) This web app includes a journal to log your emotions, which has
                                                (or, we intend to add) sentimental analysis and can detect your mood based on what
                                                you write. We also have an interactive assistant, that you might have seen, popping up
                                                through a chatbox on the screen! It can do many things, like helping you find what you need ,
                                                do mood checks, remind you to write logs in your journal, and give you daily
                                                positive affirmations!</p>
                                            {/*<ul class="actions">
                                        <li><a href="#" class="button icon solid fa-file">Continue Reading</a></li>
                                    </ul>*/}
                                        </article>
                                        <article class="box post">
                                            <header>
                                                <h2><a href="#">About the makers of <strong>Mental Health Assistant</strong></a></h2>
                                            </header>
                                            <span class="image featured"><img src={mlhBanner} alt="" /></span>
                                            <h3>This project was made possible by MLH Fellowship!</h3>
                                            <p>The Mental Health Assistant is a final project made by MLH Production Engineer Fellows! Through this project we
                                                implement skills we gained from the Production Engineering program from MLH and Facebook, which had the following requirements:</p>
                                            <ul>
                                                <li>hosted by a web server</li>
                                                <li>has a database</li>
                                                <li>at least 1 component in a Docker container</li>
                                                <li>uses CI/CD system</li>
                                                <li>has a monitoring system</li>
                                                <li>deployed to AWS using a reverse proxy</li>
                                            </ul>
                                            <p>Our final project description can be found on <a target="_blank" href="https://fellowship-pe-project-batch-3.devpost.com/"><u>Devpost</u></a>.</p>
                                            <spacer></spacer>
                                        </article>
                                    </div>

                                    {/*Updates*/}
                                    <div id="sidebar" class="col-4 col-12-medium">
                                        <ul class="divided">
                                            <li>
                                                <article class="box excerpt">
                                                    <h2>Updates</h2>
                                                    <header>
                                                        <span class="date">Aug 8, 2021</span>
                                                        <h3><a href="#">Sprint 1</a></h3>
                                                    </header>
                                                    <p>Created Login, Home, Help, and Journal pages!</p>
                                                </article>
                                            </li>
                                            <li>
                                                <article class="box excerpt">
                                                    <header>
                                                        <span class="date">Aug 13, 2021</span>
                                                        <h3><a href="#">Sprint 2</a></h3>
                                                    </header>
                                                    <p>... coming soon!</p>
                                                </article>
                                            </li>
                                            <li>
                                                <article class="box excerpt">
                                                    <header>
                                                        <span class="date">Aug 20, 2021</span>
                                                        <h3><a href="#">Sprint 3</a></h3>
                                                    </header>
                                                    <p>... coming soon!</p>
                                                </article>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/*About Us Section*/}
                        <section>
                            <h2><span>Meet the Team!</span></h2>
                            <div class="row aln-center">
                                <div class="col-4 col-6-medium col-12-small">
                                    {/*Angelyn*/}
                                    <section>
                                        <span class="image featured"><img src={AngelynPFP} alt="" /></span>
                                        <header>
                                            <h3>Angelyn Domingo</h3>
                                        </header>
                                        <p>Angelyn worked on the frontend of this project! She is currently a sophomore CS student as George Mason University and
                                            recently learned web dev to help contribute to this web app. Her personal experiences with mental health problems and
                                            struggles as a young, growing woman brought her to help create an assistant that helps others realize their potential.
                                            She deeply cares for struggling people, especially minorities and quiet ones, and hopes to inspire people by sharing her
                                            experiences and making people smile!</p>
                                    </section>
                                </div>
                                <div class="col-4 col-6-medium col-12-small">
                                    {/*Tracy*/}
                                    <section>
                                        <span class="image featured"><img src={TracyPFP} alt="" /></span>
                                        <header>
                                            <h3>Tracy Dong</h3>
                                        </header>
                                        <p>Tracy developed the front and back end for this project. 
                                            She is majoring in computer science at the University of Waterloo. 
                                            She was inspired to create this project due to the rising focus on mental health and loneliness during the pandemic, 
                                            and wanted to motivate people to put their best foot forwards and accomplish all of their goals.</p>
                                    </section>
                                </div>
                                <div class="col-4 col-6-medium col-12-small">
                                    {/*Vi*/}
                                    <section>
                                        <span class="image featured"><img src={ViPFP} alt="" /></span>
                                        <header>
                                            <h3>Vi Pham</h3>
                                        </header>
                                        <p>Vi worked on the back end of this project. She is a computer science major at the University of Richmond. 
                                            She came up with this project in hope of providing a platform where users can take a moment to express and process their thoughts daily. 
                                            She believes reflections play an important role in improving one's mental state and should be done more often.</p>
                                    </section>

                                </div>
                                <spacer></spacer>
                            </div>
                        </section>

                        {/*Footer
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
                </section> */}
            </div>
        </div> )}
    </>
    )
}

export default Home;