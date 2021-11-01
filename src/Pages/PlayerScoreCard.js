import React,{useEffect,useState} from 'react'
import axios from 'axios'
import GaugeChart from 'react-gauge-chart'
import {useParams} from 'react-router-dom'

const PlayerScoreCard = () => {

	const [quizData, setQuizData] = useState()
	const [loading, setLoading] = useState(true);
	const [suggest, setSuggest] = useState()
	const { _id } = useParams()		

	useEffect(() => {
		async function loadData(){
			const quizdata = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/p/score/"+_id)
			const suggestion = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/random");
			setSuggest(suggestion.data);
			console.log(quizdata)
			setQuizData(quizdata.data);
			setLoading(false);
		}
		loadData()
	}, [])
	
	return (
		<div id="page-wrapper" className="d-flex justify-content-center">					
			<div className="col-12 col-md-8 col-lg-5">
				{loading?"Loading":quizData.q_type==="usrop"?
					<article id="main" className="d-flex justify-content-center align-items-center flex-column my-5 container"> 
						<h4 className="mb-5">Thank you for answering</h4> 
						<h2 className="text-muted">Now, it’s your turn. Create your own quiz and send to your friends!</h2>
						<button className="btn btn-danger rounded-pill mt-4" onClick={() => {window.location.href="/quiz"}}>Create Your Quiz</button>
						<div className="suggestion d-flex justify-content-center quiz px-md-5 pt-5">
																								<div className="card bg-dark text-white col-10 col-md-8 col-lg-6">
																									<img
																										src={
																											suggest.cover_img_url
																										}
																										className="card-img"
																										style={{
																											objectFit:
																												"cover",
																										}}
																										alt="test"
																									/>
																									<div
																										className="card-img-overlay p-1"
																										style={{
																											background:
																												"#00000000",
																										}}
																									>
																										<div className="d-flex flex-column justify-content-between align-items-center h-100">
																											<div className="p-md-3 p-2 pt-1 pt-md-1">
																												<h3 className="card-title">
																													{
																														suggest.name
																													}
																												</h3>
																											</div>
																											<a
																												className="btn btn-warning rounded-pill border border-primary my-3 px-5 py-2 fs-3 text-dark"
																												style={{
																													textShadow:
																														"2px 2px #fff",
																													boxShadow:
																														"1px 3px 0px #0b5f77",
																												}}
																												href={`/quiz/${suggest._id}`}
																											>
																												START!
																											</a>
																										</div>
																									</div>
																								</div>
																							</div>
					</article>				
				:
					<article id="main" className="d-flex justify-content-center align-items-center flex-column my-5 container"> 
							<h4>Your score is</h4>
							<GaugeChart id="gauge-chart3" 
							  nrOfLevels={20} 
							  colors={["#FF5F6D", "#FFC371"]} 
							  arcWidth={0.3} 
							  percent={quizData.score/10} 
							/>
							<h2>{quizData?quizData.score:0}/10</h2>
							<h2 className="text-muted">Now, it’s your turn. Create your own quiz and send to your friends!</h2>
							<button className="btn btn-danger rounded-pill mt-4" onClick={() => {window.location.href="/quiz"}}>Create Your Quiz</button>
															<div className="suggestion d-flex justify-content-center quiz px-md-5 px-lg-0 py-5">
        								                   		<div className="card bg-dark text-white col-10 col-md-8 col-lg-6">
														    						  	<img src={suggest.cover_img_url} className="card-img" style={{objectFit:"cover"}} alt="test" />
														    						    <div className="card-img-overlay" style={{background: "#00000000"}}>
														    						      	<div className="d-flex flex-column justify-content-between align-items-center h-100">
														    						      		<div className="p-md-3 p-2">
														    						      		  <h3 className="card-title">{suggest.name}</h3>
														    						      		</div>
																					        	<a className="btn btn-warning rounded-pill border border-primary my-3 px-5 py-2 fs-3 text-dark" style={{  textShadow: "2px 2px #fff", boxShadow:"1px 3px 0px #0b5f77"}} href={`/quiz/${suggest._id}`}>
																					        	  START!
																					        	</a>
																					        </div>
														    						    </div>
														    						</div>
        								                    					</div>
					</article>
				}
			</div>
		</div>
	)
}

export default PlayerScoreCard