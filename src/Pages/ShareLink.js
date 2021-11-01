import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams,useLocation,Link} from 'react-router-dom'
import './css/Sharelink.css'
import {
  WhatsappShareButton,
  FacebookShareButton,
	FacebookMessengerShareButton,
  TwitterShareButton,
  LineShareButton,
  TelegramShareButton,
  ViberShareButton,
  VKShareButton,
} from "react-share";

const ShareLink = () => {

  const location = useLocation();
	const [quizData, setQuizData] = useState()
	const [loading, setLoading] = useState(true);
	const [suggest, setSuggest] = useState()
	const [copied, setCopied] = useState(false)
	const { urlid } = useParams()
	
	const shareURL = window.location.protocol+"//"+window.location.hostname+"/quiz/p/"+urlid;

	const copyClickHandle = () => {
		 navigator.clipboard.writeText(window.location.protocol+"//"+window.location.hostname+"/quiz/p/"+urlid); 
		 setCopied(true);
	}

	useEffect(() => {
		async function loadData(){
			const quizdata = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/creatorquiz/score/"+urlid)
			const suggestion = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/random");
			setSuggest(suggestion.data);
			console.log(quizdata)
			//console.log(location.state.response)
			setQuizData(quizdata.data);
			setLoading(false);
		}
		loadData()
	}, [])
	
	return (
		<div id="page-wrapper" className="container custom-font">					
							
				<article id="main" className="d-flex justify-content-center align-items-center flex-column my-5 container sharelink-bg"> 
					<div className="w-100">
						<h3>Share your quiz-link with your friends!</h3>
						<br/>
						<div className="border border-primary rounded w-100">
							<h5 className="mb-1 p-3 text-center"><b>{window.location.protocol+"//"+window.location.hostname+"/quiz/p/"+urlid}</b></h5>
							<button className="btn btn-primary rounded-0 w-100" onClick={copyClickHandle}>{copied?"Link copied!!":"Copy Link"}</button>
						</div>
					</div>
					<br/>
					Share the link
					<div className="d-flex flex-column w-100">
								
								<div className="ProductDetailShareButton">
 									<WhatsappShareButton url={shareURL} className="w-100">
                  		<div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 whatsapp-btn fa-whatsapp"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>
                  </WhatsappShareButton>
                </div>

                <div className="ProductDetailShareButton">
                  <FacebookShareButton url={shareURL} className="col-6 pr-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 fb-btn fa-facebook"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>
                  </FacebookShareButton>                
                  <FacebookMessengerShareButton url={shareURL} className="col-6 pl-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 fb-msg-btn fa-facebook-messenger"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>
                  </FacebookMessengerShareButton>
                </div>
                
                <div className="ProductDetailShareButton">
                  <TwitterShareButton url={shareURL} className="col-6 pr-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 twitter-btn fa-twitter"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>
                  </TwitterShareButton>                
                  <LineShareButton url={shareURL} className="col-6 pl-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 line-btn fa-line"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>
                  </LineShareButton>
                </div>
                
                <div className="ProductDetailShareButton">
                  <TelegramShareButton url={shareURL} className="col-6 pr-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 telegram-btn fa-telegram"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>                    
                  </TelegramShareButton>
                  <ViberShareButton	 url={shareURL} className="col-6 pl-1">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 viber-btn fa-viber"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>                    
                  </ViberShareButton>
                </div>
                
                <div className="ProductDetailShareButton">
                  <VKShareButton url={shareURL} className="w-100">
                    <div className="btn w-100 btn-outline-danger d-flex align-items-center"><i className="fab m-0 h3 vk-btn fa-vk"></i> <strong className="flex-grow-1 text-dark">Share</strong> </div>                    
                  </VKShareButton>
                </div>
					</div>
					<br/>
																						{suggest?<div className="suggestion d-flex justify-content-center quiz px-md-5 py-3">
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
        								                    					</div>:""}
					<br/>
					<div className="border border-primary w-100 rounded bg-white">
						<div className="bg-primary text-white w-100 py-2 px-4 h5 mb-0">Scoreboard</div>
						<table className="table table-striped table-hover bg-white mb-0">
						  <thead>
						    <tr className="">
						      <th scope="col" className="col-9">Name</th>
						      <th scope="col" className="col-3">{quizData&&quizData.q_type==="usrop"?"View":"Score"}</th>
						    </tr>
						  </thead>
						  <tbody>
						  		{quizData?quizData.length===0?(<div className="px-5 py-2">No one has answered your quiz yet</div>):quizData.map((data,index) => {
						  			return(
						  				<tr key={index}>
						    			  <td>{data.playername}</td>
						    				{data.q_type==="usrop"
						    					?
						    			  		<td>
						    			  			<Link to={{
    													  pathname: `/quiz/a/${data._id}`,
    													  state: { data:data }
    													}}> 
    														<i className="far fa-eye h4 text-primary"></i>
    													</Link>
    												</td> 
						    			  	:
						    						<td><h5>{data.score}/10</h5></td>
						    				}
						    			</tr>
						  			);
						  		}):<div className="spinner-border text-primary" role="status">
  												<span className="visually-hidden">Loading...</span>
											</div>
										}					    
							</tbody>
						</table>
					</div>
					<br/>
				</article>
		</div>
	)
}

export default ShareLink