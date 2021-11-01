import React from 'react'
import AboutImg from "../assets/wowlogo.png";

const AboutUs = () => {

	return (
		<div className="container px-4 px-lg-5" >
		<div className="row mb-5" >
			<div className="col-md-6" >
					<img src={AboutImg} alt="Hacker" style={{width:'100%',height:'75vh',objectFit:'cover'}}/>
			</div>
			<div className="col-md-6 pt-5">
				<h1  style={{fontWeight:' 700',fontSize: '50px'}}>About Us</h1>
				<p>WowQuizzo is an interesting and entertaining website that gives you the liberty to ask your friends how much they know you with the help of amusing quizzes based on friendship.
					 These quizzes are specially designed for all our users, hence, are unique. Wow Quiz will make your friendship stronger, will bring you closer and that too while you have fun with 
					 your friends! We believe in being unique., thus, we stand apart from our competitors and provide you with quality quizzes, vibrant themes, and fun questions. What are you waiting for?
					  Create your first quiz, share it with your friends, and put your friendship to the test. We are sure you will find your friend closer than ever after this.</p>
			</div>
		</div>

	</div>
	)
}

export default AboutUs
