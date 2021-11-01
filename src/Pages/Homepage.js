import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Homepage = () => {

	const [blogData, setBlogData] = useState()
	const [quizData, setQuizData] = useState()
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function loadData(){
			const blogdata = await axios.get(process.env.REACT_APP_SERVER_URL+"blog/cover")
			const quizdata = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/cover")
			
			setBlogData(blogdata.data);
			setQuizData(quizdata.data);
			setLoading(false);
		}
		loadData()
	}, [])
	
	return (
		<div>
			<div id="page-wrapper">

				<article className="my-5">					

						<section className="d-flex flex-column align-items-center container">
							<div className="row">
								{	loading===true ? <div>loading</div> : 
											<div>
												{quizData.map(quiz => (
	
													<div className="col-md-10 my-3 mx-auto" key={quiz._id}>
														<section>
															<div className="card bg-dark text-white">
														      	<img src={quiz.cover_img_url} className="card-img" style={{objectFit:"cover"}} alt="test" />
														        <div className="card-img-overlay" style={{background: "#00000000"}}>
														          	<div className="d-flex flex-column justify-content-between align-items-center h-100">
														          		<div className="p-md-3 p-2">
														          		  <h1 className="card-title">{quiz.name}</h1>														          		  
														          		</div>
															        	<a className="btn btn-warning rounded-pill border border-primary my-3 px-5 py-2 fs-3 text-dark" style={{  textShadow: "2px 2px #fff", boxShadow:"1px 3px 0px #0b5f77"}} href={`/quiz/${quiz._id}`}>
															        	  START!
															        	</a>
															        </div>
														        </div>
														    </div>
														</section>			
													</div>

												))}
											</div>
								}																
							</div>
							<div>
								<a className="btn btn-primary" href="/quiz">Show more ></a>
							</div>
						</section>
					
						<section className="container d-flex flex-column align-items-center mt-5 pt-5">

							<header className="major">
								<h2><strong>Blog Posts</strong></h2>
							</header>

							<div className="row">
								{loading?<div>loading</div>:blogData?blogData.map(blog => (							
									<div className="col-md-6 col-lg-4 col-12 my-4" key={blog._id}>
											<section className="mx-2 h-100">
												<div className="card text-white h-100">
													<a href={`/blog/${blog._id}`} className="text-decoration-none text-dark">
														<img src={blog.img_url} className="card-img" height="350" style={{objectFit:"cover"}} alt="test" />
													<div className="card-body">
														<header>
															<h3>{blog.title}</h3>
														</header>
														<p>{
															blog.description
														}</p>
													</div>
													</a>
												</div>
											</section>	
									</div>
								  )):""
								}
							</div>
							<div>
								<a href="/blog" className="btn btn-primary">See More</a>
							</div>

						</section>

				</article>			
			</div>
		</div>
	)
}

export default Homepage