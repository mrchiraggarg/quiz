import React from 'react'
import {useParams,useLocation} from 'react-router-dom'

const ResAnswerCard = () => {

	const { state } = useLocation(); 
	console.log(state)	
	
	return (
		<div id="page-wrapper" className="d-flex justify-content-center py-5">
			<div className="col-12 col-md-8 col-lg-5">
					<h2 className="text-muted mb-5">Lets see <span className="text-danger fw-bold">{state.data.playername}'s</span> answer</h2>
					{state.data.questions.map((quest,index)=>(
						<ul className="list-group mb-4" key={index}>
						  <li className="list-group-item active">{quest}</li>
						  <li className="list-group-item fw-bold">{state.data.answers[index]?state.data.answers[index]:"No answer"}</li>						  
						</ul>						
					))}
					<div className="d-flex justify-content-between">					 
						<button className="btn btn-warning rounded-pill mt-4" onClick={() => {window.location.href=`/quiz/share-link/${state.data.url}`}}> {`< back`} </button>
						<button className="btn btn-danger rounded-pill mt-4" onClick={() => {window.location.href="/quiz"}}>Create Your Quiz</button>
					</div>
			</div>
		</div>
	)
}

export default ResAnswerCard