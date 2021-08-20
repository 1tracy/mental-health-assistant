import React from 'react';
import '../App.css';

import community from "../images/community.png";


function Help() {
    return(
        <div className="app">
            <head>
                <title>Help</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="stylesheet" href="assets/css/main.css" />
	        </head>
	        <body className="homepage is-preload">
		    <div id="page-wrapper">

                <section id="header">
                    <div className="container">
                        <h1 id="logo"><a href="index.html">Mental Health Assistant</a></h1>
                        <p>A project by Angelyn, Tracy, and Vi.</p>
                    </div>
                </section>

				<section id="main">
					<div className="container">
						<div className="row">
							<div id="content" className="col-8 col-12-medium">
								<article className="box post">
									<header>
										<h2><strong>Need more help?</strong> Checkout these resources that the team collected! (We think maybe one of them can make you smile. :) )</h2>
									</header>
									<span class="image featured"><img src={community} alt="" /></span>
									<h3>More facts about Mental Health from health organizations</h3>
										<p><a href="https://www.mentalhealth.gov/">MentalHealth.gov</a><br/>
												<ul>
													<li>Look here to find facts and guides to help you or others identify different kinds of disorders and how to act on them. 
													There is also official advice from the US Department of Health and Human Services (UHH) on how to get help for all kinds of people, 
													including those who immediate help or have no insurance coverage.</li>
												</ul>
											<a href="https://adaa.org/">Anxiety and Depression Association of America (ADAA)</a><br/>
											<a href="https://adaa.org/understanding-anxiety/generalized-anxiety-disorder-gad/myths-realities/">Generalized Anxiety: Myths and Realities</a><br/></p>
												<ul>
													<li>Sometimes it's really hard to let other people know when you're going through anxiety or depression. Especially when people tend to not know all the facts about it.
													ADAA has an awesome infographic on how to really deal with the symptoms of Generalized Anxiety Disorder (GAD) and other tips and resources about anxiety and stress.</li>
												</ul>
									<br/><br/>
									<h3>People to talk to</h3>
										<p><a href="https://www.betterhelp.com/" >BetterHelp</a><br/>
											<a href="https://www.militaryonesource.mil/confidential-help/non-medical-counseling/military-onesource/military-counseling-for-stress/">
												Military Counseling for Stress</a><br/>
												<ul>
													<li>These are some free online resources if you need therapy!</li>
												</ul>
											<a href="https://www.reddit.com/r/depression/">https://www.reddit.com/r/depression/</a><br/>
											<a href="https://www.reddit.com/r/DecidingToBeBetter/">https://www.reddit.com/r/DecidingToBeBetter/</a><br/>
											<a href="https://www.reddit.com/r/selfimprovement/">https://www.reddit.com/r/selfimprovement/</a><br/></p>
												<ul>
												<li>These subreddits actually inspired Angelyn a lot in a time where she felt alone. Even though Reddit can sometimes be a toxic place with a wild jungle of opinions (much like Twitter), 
													she's found communities of struggling people that actually uplift each other and help give life advice! Anonymously reaching out for help doesn't hurt if you're not quite ready to confront real people yet. And that's ok. :) 
													You might also find yourself some very wholesome memes as well!</li>
												</ul>
									<br/><br/>
									<h3>Funny stuff</h3>
										<p><a href="https://youtube.com/playlist?list=PLcCMVUeUKe-En0MKMPndFxA3CCuBbrW4V">
												DEPRESS BEGONE!</a><br/>
												<ul>
													<li>This is a Youtube playlist Angelyn made a while ago when she was a wee lad struggling in high school. This playlist aims to contain short snippets of joy to remind her
													that there's good in this world... even if they're mostly cute cats and dogs... It's open for everyone to contribute to, so feel free to put something in there that makes YOU happy!
													There's never enough happiness to go around, and we can only hope a YouTube playlist doesn't have a limit on videos...</li>
												</ul>
											<a href="https://www.reddit.com/r/wholesomegifs/">https://www.reddit.com/r/wholesomegifs/</a><br/>
											<a href="https://www.reddit.com/r/aww/">https://www.reddit.com/r/aww/</a><br/></p>
												<ul>
													<li>Here are some subreddits with funny pics, gifs, and videos to help you remember the world isn't so bad after all! :) 
													Sometimes you just need some wholesome-ness in your life to get through.</li>
												</ul>
									<br/><br/>
								</article>
							</div>
						</div>
					</div>
				</section>

				{/*<section id="footer">
					<div class="container">
						<header>
							<h2>Questions or comments? <strong>Get in touch:</strong></h2>
						</header>
						<div className="row">
							<div className="col-6 col-12-medium">
								<section>
									<form method="post" action="#">
										<div className="row gtr-50">
											<div className="col-6 col-12-small">
												<input name="name" placeholder="Name" type="text" />
											</div>
											<div className="col-6 col-12-small">
												<input name="email" placeholder="Email" type="text" />
											</div>
											<div className="col-12">
												<textarea name="message" placeholder="Message"></textarea>
											</div>
											<div className="col-12">
												<a href="#" className="form-button-submit button icon solid fa-envelope">Send Message</a>
											</div>
										</div>
									</form>
								</section>
							</div>
							<div className="col-6 col-12-medium">
								<section>
									<p>Erat lorem ipsum veroeros consequat magna tempus lorem ipsum consequat Phaselamet
									mollis tortor congue. Sed quis mauris sit amet magna accumsan tristique. Curabitur
									leo nibh, rutrum eu malesuada.</p>
									<div className="row">
										<div className="col-6 col-12-small">
											<ul className="icons">
												<li className="icon solid fa-home">
													1234 Somewhere Road<br />
													Nashville, TN 00000<br />
													USA
												</li>
												<li className="icon solid fa-phone">
													(000) 000-0000
												</li>
												<li className="icon solid fa-envelope">
													<a href="#">info@untitled.tld</a>
												</li>
											</ul>
										</div>
										<div className="col-6 col-12-small">
											<ul className="icons">
												<li className="icon brands fa-twitter">
													<a href="#">@untitled</a>
												</li>
												<li className="icon brands fa-instagram">
													<a href="#">instagram.com/untitled</a>
												</li>
												<li className="icon brands fa-dribbble">
													<a href="#">dribbble.com/untitled</a>
												</li>
												<li className="icon brands fa-facebook-f">
													<a href="#">facebook.com/untitled</a>
												</li>
											</ul>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
					<div id="copyright" className="container">
						<ul className="links">
							<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</div>
	</section> */}
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