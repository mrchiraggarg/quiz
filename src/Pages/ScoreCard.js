import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './assets/css/main.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {useParams} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import pic01 from './images/pic01.jpg'
import pic02 from './images/pic02.jpg'
import pic03 from './images/pic03.jpg'
import pic04 from './images/pic04.jpg'
import bannerpic from './images/banner.jpg'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';

const Index = () => {

	const [blogData, setBlogData] = useState()
	const [quizData, setQuizData] = useState()
	const [loading, setLoading] = useState(true);
	const { urlid } = useParams()

	useEffect(() => {
		async function loadData(){
			const blogdata = await axios.get(process.env.REACT_APP_SERVER_URL+"blog/cover")
			const quizdata = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/cover")
			console.log(blogdata)
			console.log(quizdata)
			setBlogData(blogdata.data);
			setQuizData(quizdata.data);
			setLoading(false);
		}
		//loadData()
	}, [])
	
	return (
		<div>
		<div id="page-wrapper">
				<header id="header" class="alt">
					<h1 id="logo"><a href="index.html">Twenty <span>by HTML5 UP</span></a></h1>
					<nav id="nav">
						<ul>
							<li class="current"><a href="/">Home</a></li>
							<li><a href="/quiz">Quiz</a></li>
							<li><a href="/blog" class="">Blog</a></li>
						</ul>
					</nav>
				</header>

				<section id="banner">

					
					<div class="inner">
						<footer>
							<ul class="buttons stacked">
							</ul>
						</footer>

					</div>

				</section>

				<article id="main" className="d-flex justify-content-center align-items-center flex-column"> 
					<table class="table table-striped table-hover">
					  <thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">First</th>
					      <th scope="col">Last</th>
					      <th scope="col">Handle</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr>
					      <th scope="row">1</th>
					      <td>Mark</td>
					      <td>Otto</td>
					      <td>@mdo</td>
					    </tr>
					    <tr>
					      <th scope="row">2</th>
					      <td>Jacob</td>
					      <td>Thornton</td>
					      <td>@fat</td>
					    </tr>
					    <tr>
					      <th scope="row">3</th>
					      <td colspan="2">Larry the Bird</td>
					      <td>@twitter</td>
					    </tr>
					  </tbody>
					</table>
					<button className="btn btn-primary" onClick={() => {window.location.href=`/quiz`}}>Home</button>					
				</article>

				<footer id="footer">

					<ul class="icons">
						<li><a href="#" class="icon brands circle fa-twitter"><span class="label">Twitter</span></a></li>
						<li><a href="#" class="icon brands circle fa-facebook-f"><span class="label">Facebook</span></a></li>
						<li><a href="#" class="icon brands circle fa-google-plus-g"><span class="label">Google+</span></a></li>
						<li><a href="#" class="icon brands circle fa-github"><span class="label">Github</span></a></li>
						<li><a href="#" class="icon brands circle fa-dribbble"><span class="label">Dribbble</span></a></li>
					</ul>

					<ul class="copyright">
						<li>&copy; Untitled</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>

				</footer>

		</div>

			<script src="../../template/html5up-twenty/assets/js/jquery.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/jquery.dropotron.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/jquery.scrolly.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/jquery.scrollex.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/browser.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/breakpoints.min.js"></script>
			<script src="../../template/html5up-twenty/assets/js/util.js"></script>
			<script src="../../template/html5up-twenty/assets/js/main.js"></script>
		</div>
	)
}

export default Index