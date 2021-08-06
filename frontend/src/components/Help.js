import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Image from '../images/pic04.jpg';

function Help() {
    return(
        <div className="app">
            <head>
                <title>Help</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="stylesheet" href="assets/css/main.css" />
	        </head>
	        <body class="homepage is-preload">
		    <div id="page-wrapper">

                <section id="header">
                    <div class="container">
                        <h1 id="logo"><a href="index.html">Mental Health Assistant</a></h1>
                        <p>A project by Angelyn, Tracy, and Vi.</p>
                        <nav id="nav">
                            <ul>
                                <li><a class="icon solid fa-home" href="index.html"><span>Home</span></a></li>	
                                <li>
                                    <a href="#" class="icon fa-chart-bar"><span>Home</span></a>
                                    <ul>
                                        <li><a href="#">What & Why Mental Health?</a></li>
                                        <li><a href="#">What does Mental Health Assistant do?</a></li>
                                        <li><a href="#">About Us</a></li>
                                    </ul>
                                </li>
                                <li><a class="icon solid fa-retweet" href="right-sidebar.html"><span>Journal</span></a></li>
                                <li><a class="icon solid fa-retweet" href="right-sidebar.html"><span>Help</span></a></li>
                                <li><a class="icon solid fa-sitemap" href="no-sidebar.html"><span>Login</span></a></li>
                            </ul>
                        </nav>
                    </div>
                </section>

				<section id="main">
					<div class="container">
						<div class="row">
							<div id="content" class="col-8 col-12-medium">
								<article class="box post">
									<header>
										<h2><strong>Need more help?</strong> Checkout these resources that the team collected! (We think maybe one of them can make you smile. :) )</h2>
									</header>
									<span class="image featured"><img src={Image} alt="" /></span>
			
									<h3>More facts about Mental Health from health organizations</h3>
										<p>
											<a href="https://www.mentalhealth.gov/">https://www.mentalhealth.gov/</a><br/>
											<a href="https://adaa.org/">https://adaa.org/</a><br/>
											<a href="https://adaa.org/understanding-anxiety/generalized-anxiety-disorder-gad/myths-realities/">https://adaa.org/understanding-anxiety/generalized-anxiety-disorder-gad/myths-realities/</a><br/>
										</p>
										
										<h3>People to talk to</h3>
										<p>
											<a href="https://www.betterhelp.com/" >https://www.betterhelp.com/</a><br/>
											<a href="https://www.militaryonesource.mil/confidential-help/non-medical-counseling/military-onesource/military-counseling-for-stress/">
												https://www.militaryonesource.mil/confidential-help/non-medical-counseling/military-onesource/military-counseling-for-stress/</a><br/>
											<a href="https://www.reddit.com/r/depression/">https://www.reddit.com/r/depression/</a><br/>
											<a href="https://www.reddit.com/r/DecidingToBeBetter/">https://www.reddit.com/r/DecidingToBeBetter/</a><br/>
											<a href="https://www.reddit.com/r/selfimprovement/">https://www.reddit.com/r/selfimprovement/</a><br/>
										</p>
										
										<h3>Funny stuff</h3>
										<p>
											<a href="https://youtube.com/playlist?list=PLcCMVUeUKe-En0MKMPndFxA3CCuBbrW4V">
												https://youtube.com/playlist?list=PLcCMVUeUKe-En0MKMPndFxA3CCuBbrW4V</a><br/>
											<a href="https://www.reddit.com/r/wholesomegifs/">https://www.reddit.com/r/wholesomegifs/</a><br/>
											<a href="https://www.reddit.com/r/aww/">https://www.reddit.com/r/aww/</a><br/>
										</p>
								</article>
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
    );
}

export default Help;