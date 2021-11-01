import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Quiz = () => {
	const [quizData, setQuizData] = useState()
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function loadData(){
			const data = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz")
			console.log(data)
			setQuizData(data.data);
			setLoading(false);
		}
		loadData()
	}, [])

	return (
		<div>
		<div id="page-wrapper">
				<article id="main" className="py-5">
						<section className="container-md col-lg-8 py-5 px-md-5 d-flex flex-column align-items-center">

							<h2><strong>Create My Quiz</strong></h2>

							<div className="row">
								{loading?
									<div>loading</div>
									:
										quizData.map(
											quiz => (
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
										)
									)
								}
							</div>												
						</section>

				</article>
			</div>			
		</div>
	)
}

export default Quiz