import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const randomComb = (length) => {
	return Math.random().toString(36).substr(2, length)
}

const PlayQuiz = () => {

	const [quizData, setquizData] = useState()
	const [quizInfo, setquizInfo] = useState()
	const [loading, setLoading] = useState(true);
	const [current, setCurrent] = useState(0);
	const [playerName, setplayerName] = useState("");  
    const [playerRegion, setplayerRegion] = useState("");  
    const { urlid } = useParams()
    const lengthCarItem = 11;
    const [suggest, setSuggest] = useState()
    const [questArray, setQuestArray] = useState([]);
    const [ansArray, setAnsArray] = useState([]);
	const [currentQuest, setCurrentQuest] = useState("");
	const [currentAns, setCurrentAns] = useState(0);
	const [error, seterror] = useState({status: false, err: ""})

    const prevSlide = () => {
	    setCurrent(current === 0 ? 1 : current - 1);
  	};

	const nextSlide = () => {
		// console.log("in next")
		if (current===0&&playerName===""&&playerRegion==="") {
	    	
		}else if(current===0&&playerName!==""&&playerRegion!==""){
			setCurrent(1);
			setCurrentQuest(quizData.questions[0]);
		}else if(current===lengthCarItem-1){
			setLoading(true)
			if(true){
				questArray.push(currentQuest);
				console.log("submitted")
	
				const postData = {
					answers: ansArray,
					questions: questArray,
					username: playerName,
					location: playerRegion,
					url: urlid,
					q_type: quizInfo.q_type,
					org_id: quizData.org_id
				};
				console.log(postData)
				axios.post(process.env.REACT_APP_SERVER_URL+"p/result",postData)
					.then(res => {console.log(res); window.location.href=`/quiz/p/score/${res.data.result._id}`})
					.catch(e => console.log(e))
			}else{
				    seterror({
      					status: true,
      					err: "Select any one option or skip the question"
    				});
			}
		}else{
			if(true){	
				questArray.push(currentQuest);
				setCurrentQuest(quizData.questions[current]);
				setCurrentAns(0)
				setCurrent(current + 1);
				seterror({
      					status: false,
      					err: "Select any one option or skip the question"
    				});
			}else{
				    seterror({
      					status: true,
      					err: "Select any one option or skip the question"
    				});
			}
		}
	};


	const handleSkipClick = () => {
		console.log("skip clicked")
	}

	const handleOptionSelect = (index) => {
		if(quizInfo.q_type!=="usrop"){
			setCurrentAns(parseInt(index))		
			ansArray.push(index)
			// console.log("next up")
			nextSlide()
		}else{
			if(currentAns===0)
				ansArray.push("Don't prefer to answer")
			else
				ansArray.push(currentAns)
			nextSlide()
		}
	}

	useEffect(() => {
		async function loadData(){
			const data = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/p/"+urlid);
			const data2 = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/min/"+data.data.org_id)
			data2.data.name = data2.data.name.replace("you are",`${data.data.username} is`).replace("your",`${data.data.username}'s`).replace("you",data.data.username).replace("You Are",`${data.data.username} is`).replace("Your",`${data.data.username}'s`).replace("You",data.data.username);
			const suggestion = await axios.get(process.env.REACT_APP_SERVER_URL+"quiz/random");
			setSuggest(suggestion.data);
			console.log(data)
			console.log(data2)
			setquizData(data.data);
			setquizInfo(data2.data)
			setLoading(false);
		}
		loadData()
	}, [])

	var countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

	return (
		<div id="page-wrapper">
				<article id="main">

						<section className=" py-5 px-md-0 d-flex flex-column">
							<div className="">
								{loading?
									<div className="row justify-content-center">
										<div className="card shadow-lg border border-primary h-100 col-md-8 col-lg-6 align-items-center justify-content-center py-5">
											<div class="spinner-border text-primary" role="status">
  												<span class="visually-hidden">Loading...</span>
											</div>		
										</div>
									</div>
									:	
										<div className="row me-0 justify-content-center">
        								    <div className="col-md-8 col-lg-6 grid-margin stretch-card d-flex flex-column instructions-font">
        								      	<div className="card shadow-lg border h-100">        								        	                
        								        	<div className="card-body d-flex align-items-center	justify-content-center mb-3">
        								          		<div id="carouselExampleControls" className="carousel slide col-12" datainterval="false" dataride="carousel" datapause="hover">
        								            		<div className="carousel-inner">	           								                		
        								        					<div className={current>0?"d-flex justify-content-center":"d-none"}>
																		<span className={current===1?"numberCircle mx-md-2 mx-1 activenC":current>1?"numberCircle bg-primary mx-md-2 mx-1": "numberCircle mx-md-2 mx-1" }>1</span>
																		<span className={current===2?"numberCircle mx-md-2 mx-1 activenC":current>2?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>2</span>
																		<span className={current===3?"numberCircle mx-md-2 mx-1 activenC":current>3?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>3</span>
																		<span className={current===4?"numberCircle mx-md-2 mx-1 activenC":current>4?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>4</span>
																		<span className={current===5?"numberCircle mx-md-2 mx-1 activenC":current>5?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>5</span>
																		<span className={current===6?"numberCircle mx-md-2 mx-1 activenC":current>6?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>6</span>
																		<span className={current===7?"numberCircle mx-md-2 mx-1 activenC":current>7?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>7</span>
																		<span className={current===8?"numberCircle mx-md-2 mx-1 activenC":current>8?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>8</span>
																		<span className={current===9?"numberCircle mx-md-2 mx-1 activenC":current>9?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>9</span>
																		<span className={current===10?"numberCircle mx-md-2 mx-1 activenC":current>10?"numberCircle bg-primary mx-md-2 mx-1":"numberCircle mx-md-2 mx-1"}>10</span>
																	</div>
																	{ quizInfo.q_type==="oponly"?quizData.questions.map((quest,index) => {
																		  if(index<10)     								              					
        								              					return(
        								              					<div>
        								              					<div
																					className={
																						current ===
																						0
																							? "carousel-item active"
																							: "carousel-item"
																					}
																				>
																					{" "}
																					<div>
																						<div className="w-100">
																							<div className="">
																								<div className="mb-3">
																									<div className="card-body flex-md-row flex-column justify-content-between">
																										<div className="fw-bold">
																											<h1 className="card-title">
																												{
																													quizData.name
																												}
																											</h1>
																											<h5 className="text-muted">
																												{
																													quizData.description
																												}
																											</h5>
																											<div className="d-block text-left mt-3">
																												<h4 className="my-3">
																													<span className="badge bg-primary rounded">
																														Instructions:
																													</span>
																												</h4>
																												<div className="card-text">
																													<ul>
																														<li>
																															1.
																															Select
																															your
																															Region
																															and
																															Enter
																															your
																															name.
																														</li>
																														<li>
																															2.
																															Create
																															your
																															own
																															What
																															If
																															quiz.
																														</li>
																														<li>
																															3.
																															Your
																															challenge
																															link
																															will
																															be
																															ready.
																														</li>
																														<li>
																															4.
																															Share
																															the
																															link
																															with
																															your
																															friends.
																														</li>
																														<li>
																															5.
																															Your
																															friends
																															will
																															answer
																															all
																															your
																															questions.
																														</li>
																														<li>
																															6.
																															Check
																															their
																															answers
																															on
																															your
																															Friendboard.
																														</li>
																													</ul>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Region
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<select
																											onChange={(
																												e
																											) => {
																												console.log(
																													e
																														.target
																														.value
																												);
																												setplayerRegion(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-select"
																										>
																											<option
																												value="other"
																												className="text-muted"
																											>
																												Select
																												your
																												region
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="India"
																											>
																												India
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="Other"
																											>
																												Other
																											</option>
																										</select>
																									</div>
																								</div>
																								<div className="mb-3">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Name
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<input
																											placeholder="Name"
																											onChange={(
																												e
																											) => {
																												setplayerName(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-control"
																											type="text"
																										/>
																									</div>
																								</div>
																								<div className="w-100 px-3">
																									<button
																										className={
																											playerName ===
																												"" ||
																											playerRegion ===
																												""
																												? "btn btn-primary disabled w-100"
																												: "btn btn-primary w-100"
																										}
																										style={{
																											minWidth:
																												"10px",
																										}}
																										onClick={
																											nextSlide
																										}
																									>
																										Confirm
																									</button>
																								</div>
																							</div>
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
																						</div>
																					</div>
																				</div>
	           								                			<div className={ index === current-1 ? 'carousel-item active' : 'carousel-item' } key={index}>
        								                				<div>
        								                					<div className="mt-3">
        								                    					<div className="card-body">
            										        		  				<h4 className="card-title mb-5 text-center"><div type="text" className="w-100 fw-normal">{quest}</div></h4>	        								                    					
        								                    		  				<h6 className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2" style={{margin: "0 15px"}}>        								                    		    				        								                    		    				
        								                    		    				{quizData.options[index].map((option,index) => (
        								                    		    					<div className="form-check px-2 w-100" key={index}>
        								                    		    						<button className="btn btn-outline-primary border-secondary w-100" onClick={() => handleOptionSelect(index+1)}>
    	    								                		            					{ option }	        								                		          				
	        								                		          					</button>
        											        		                		</div>	
        								                    		    				))}
																					</h6>        								                    		  				
        								                    					</div>
        								                					</div>
        								            					</div>
        								        						</div>
        								        						</div>
                      												)}):"" }
        								                    		{ quizInfo.q_type==="twoop"?quizData.questions.map((quest,index) => {
																		  if(index<10)     								              					
        								              					return(
        								              					<div>
        								              					<div
																					className={
																						current ===
																						0
																							? "carousel-item active"
																							: "carousel-item"
																					}
																				>
																					{" "}
																					<div>
																						<div className="w-100">
																							<div className="">
																								<div className="mb-3">
																									<div className="card-body d-flex flex-md-row flex-column justify-content-between align-items-center">
																										<div className="fw-bold">
																											<h1 className="card-title">
																												{
																													quizData.name
																												}
																											</h1>
																											<h5 className="text-muted">
																												{
																													quizData.description
																												}
																											</h5>
																											<div className="d-block text-left mt-3">
																												<h4 className="my-3">
																													<span className="badge bg-primary rounded">
																														Instructions:
																													</span>
																												</h4>
																												<div className="card-text">
																													<ul>
																														<li>
																															1.
																															Select
																															your
																															Region
																															and
																															Enter
																															your
																															name.
																														</li>
																														<li>
																															2.
																															Create
																															your
																															own
																															What
																															If
																															quiz.
																														</li>
																														<li>
																															3.
																															Your
																															challenge
																															link
																															will
																															be
																															ready.
																														</li>
																														<li>
																															4.
																															Share
																															the
																															link
																															with
																															your
																															friends.
																														</li>
																														<li>
																															5.
																															Your
																															friends
																															will
																															answer
																															all
																															your
																															questions.
																														</li>
																														<li>
																															6.
																															Check
																															their
																															answers
																															on
																															your
																															Friendboard.
																														</li>
																													</ul>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Region
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<select
																											onChange={(
																												e
																											) => {
																												console.log(
																													e
																														.target
																														.value
																												);
																												setplayerRegion(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-select"
																										>
																											<option
																												value="other"
																												className="text-muted"
																											>
																												Select
																												your
																												region
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="India"
																											>
																												India
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="Other"
																											>
																												Other
																											</option>
																										</select>
																									</div>
																								</div>
																								<div className="mb-3">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Name
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<input
																											placeholder="Name"
																											onChange={(
																												e
																											) => {
																												setplayerName(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-control"
																											type="text"
																										/>
																									</div>
																								</div>
																								<div className="w-100 px-3">
																									<button
																										className={
																											playerName ===
																												"" ||
																											playerRegion ===
																												""
																												? "btn btn-primary disabled w-100"
																												: "btn btn-primary w-100"
																										}
																										style={{
																											minWidth:
																												"10px",
																										}}
																										onClick={
																											nextSlide
																										}
																									>
																										Confirm
																									</button>
																								</div>
																							</div>
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
																						</div>
																					</div>
																				</div>
	           								                			<div className={ index === current-1 ? 'carousel-item active' : 'carousel-item' } key={index}>
        								                				<div>
        								                					<div className="mt-3">
        								                    					<div className="card-body">
            										        		  				<h4 className="card-title mb-5 text-center"><div type="text" className="w-100 fw-bold">{quest}</div></h4>
        								                    		  				<h6 className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2" style={{margin: "0 15px"}}>
        								                    		    				{quizData.options[index].map((option,index) => (
        								                    		    					<div className="form-check px-2 w-100" key={index}>
        								                    		      					<button className="btn btn-outline-primary border-secondary w-100" onClick={() => handleOptionSelect(index+1)}>
    	    								                		            				{ option }
	        								                		          				</button>
        											        		                	</div>	
        								                    		    				))}
																					</h6>        								                    		  				
        								                    					</div>        								                    					
        								                					</div>
        								            					</div>
        								        						</div>
        								        						</div>
                      												)}):"" }
                      												{ quizInfo.q_type==="opimg"?quizData.questions.map((quest,index) => {        								              					
        								              					if(index<10)
																		  return(
																		  	<div>
																		  	<div
																					className={
																						current ===
																						0
																							? "carousel-item active"
																							: "carousel-item"
																					}
																				>
																					{" "}
																					<div>
																						<div className="w-100">
																							<div className="">
																								<div className="mb-3">
																									<div className="card-body d-flex flex-column justify-content-between align-items-center">
																										<div className="text-center w-100">
																											<h1 className="card-title">
																												{
																													quizData.name
																												}
																											</h1>
																											<h5 className="text-muted">
																												{
																													quizData.description
																												}
																											</h5>
																											<div className="d-block text-start mt-3">
																												<h4 className="my-3">
																													<span className="badge bg-primary rounded">
																														Instructions:
																													</span>
																												</h4>
																												<div
																													className="card-text text-white py-3"
																													style={{
																														backgroundImage:
																															"linear-gradient(#a950fd, #d47fff)",
																														borderRadius:
																															"20px",
																													}}
																												>
																													<ul>
																														<li>
																															1.
																															Select
																															your
																															Region
																															and
																															Enter
																															your
																															name.
																														</li>
																														<li>
																															2.
																															Create
																															your
																															own
																															What
																															If
																															quiz.
																														</li>
																														<li>
																															3.
																															Your
																															challenge
																															link
																															will
																															be
																															ready.
																														</li>
																														<li>
																															4.
																															Share
																															the
																															link
																															with
																															your
																															friends.
																														</li>
																														<li>
																															5.
																															Your
																															friends
																															will
																															answer
																															all
																															your
																															questions.
																														</li>
																														<li>
																															6.
																															Check
																															their
																															answers
																															on
																															your
																															Friendboard.
																														</li>
																													</ul>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Region
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<select
																											onChange={(
																												e
																											) => {
																												console.log(
																													e
																														.target
																														.value
																												);
																												setplayerRegion(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-select  bg-warning"
																											style={{
																												borderRadius:
																													"10px",
																											}}
																										>
																											<option
																												value="other"
																												className="text-muted"
																											>
																												Select
																												your
																												region
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="India"
																											>
																												India
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="Other"
																											>
																												Other
																											</option>
																										</select>
																									</div>
																								</div>
																								<div
																									className="my-3 border-purple border py-3"
																									style={{
																										borderRadius:
																											"10px",
																									}}
																								>
																									<div className="">
																										<h5 className="card-title d-none">
																											Enter
																											your
																											Name
																											:
																										</h5>
																										<div
																											className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																											style={{
																												margin: "0 15px",
																											}}
																										>
																											<input
																												placeholder="Name"
																												onChange={(
																													e
																												) => {
																													setplayerName(
																														e
																															.target
																															.value
																													);
																												}}
																												className="form-control"
																												type="text"
																											/>
																										</div>
																									</div>
																									<div className="w-100 px-3">
																										<button
																											className={
																												playerName ===
																													"" ||
																												playerRegion ===
																													""
																													? "btn btn-primary disabled w-100"
																													: "btn btn-primary w-100"
																											}
																											style={{
																												minWidth:
																													"10px",
																											}}
																											onClick={
																												nextSlide
																											}
																										>
																											Confirm
																										</button>
																									</div>
																								</div>
																							</div>
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
																						</div>
																					</div>
																				</div>
	           								                			<div className={ index === current-1 ? 'carousel-item active' : 'carousel-item' } key={index}>
        								                				<div>
        								                					<div className="mt-5 text-white" style={{backgroundImage:"linear-gradient(#9f43fd, #d783ff)",borderRadius:"20px"}}>
        								                    					<div className="card-body">
            										        		  				<h4 className="card-title text-center"><div className="w-100 fw-bold" type="text">{quest}</div></h4>        								                    		  				
        								                    		  				<h6 className="card-text d-flex text-left justify-content-center flex-wrap my-2" style={{margin: "0 15px"}}>        								                    		    				
        								                    		    				 {quizData.options[index].map((option,index) => (
        								                    		    					<div className="form-check p-0 my-2 col-md-6 col-12" key={index}>
        								                    		      					<button className="btn d-flex justify-content-center align-items-center w-100" onClick={() => handleOptionSelect(index+1)}>
    	    								                		            				<div className="card asdasde border border-white w-100" style={{borderRadius:"20px"}}>
<div>
																								  			<img 
																								  				src={option.opurl} 
																								  				style={{
																															borderRadius: "20px",
																															width: "100%",
																															height: "auto",
																															maxHeight: "190px"
																														}}
																												className="card-img-top" alt="..."/>
																										</div>																								  <h6 className="card-title m-3">{ option.opvalue }</h6> 
																								</div>
	        								                		          				</button>
        											        		                	</div>	
        								                    		    				))}
																					</h6>        								                    		  				
        								                    					</div>        								                    					
        								                					</div>
        								            					</div>
        								        						</div>
        								        						</div>
                      												)}):"" }
																	{ quizInfo.q_type==="twoopimg"?quizData.questions.map((quest,index) => {        								              					
        								              					if(index<10){
																		  return(
        								              					<div>
        								              					<div
																					className={
																						current ===
																						0
																							? "carousel-item active"
																							: "carousel-item"
																					}
																				>
																					{" "}
																					<div>
																						<div className="w-100">
																							<div className="">
																								<div className="mb-3">
																									<div className="card-body d-flex flex-md-row flex-column justify-content-between align-items-center">
																										<div className="fw-bold">
																											<h1 className="card-title">
																												{
																													quizData.name
																												}
																											</h1>
																											<h5 className="text-muted">
																												{
																													quizData.description
																												}
																											</h5>
																											<div className="d-block text-left mt-3">
																												<h4 className="my-3">
																													<span className="badge bg-primary rounded">
																														Instructions:
																													</span>
																												</h4>
																												<div className="card-text">
																													<ul>
																														<li>
																															1.
																															Select
																															your
																															Region
																															and
																															Enter
																															your
																															name.
																														</li>
																														<li>
																															2.
																															Create
																															your
																															own
																															What
																															If
																															quiz.
																														</li>
																														<li>
																															3.
																															Your
																															challenge
																															link
																															will
																															be
																															ready.
																														</li>
																														<li>
																															4.
																															Share
																															the
																															link
																															with
																															your
																															friends.
																														</li>
																														<li>
																															5.
																															Your
																															friends
																															will
																															answer
																															all
																															your
																															questions.
																														</li>
																														<li>
																															6.
																															Check
																															their
																															answers
																															on
																															your
																															Friendboard.
																														</li>
																													</ul>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Region
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<select
																											onChange={(
																												e
																											) => {
																												console.log(
																													e
																														.target
																														.value
																												);
																												setplayerRegion(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-select"
																										>
																											<option
																												value="other"
																												className="text-muted"
																											>
																												Select
																												your
																												region
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="India"
																											>
																												India
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="Other"
																											>
																												Other
																											</option>
																										</select>
																									</div>
																								</div>
																								<div className="mb-3">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Name
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<input
																											placeholder="Name"
																											onChange={(
																												e
																											) => {
																												setplayerName(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-control"
																											type="text"
																										/>
																									</div>
																								</div>
																								<div className="w-100 px-3">
																									<button
																										className={
																											playerName ===
																												"" ||
																											playerRegion ===
																												""
																												? "btn btn-primary disabled w-100"
																												: "btn btn-primary w-100"
																										}
																										style={{
																											minWidth:
																												"10px",
																										}}
																										onClick={
																											nextSlide
																										}
																									>
																										Confirm
																									</button>
																								</div>
																							</div>
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
																						</div>
																					</div>
																				</div>
	           								                			<div className={ index === current-1 ? 'carousel-item active' : 'carousel-item' } key={index}>
        								                				<div>
        								                					<div className="mt-5">
        								                    					<div className="card-body">
            										        		  				<h4 className="card-title text-center mb-5"><div type="text" className="w-100 fw-bold">{quest}</div></h4>        								                    		  				
        								                    		  				<h6 className="card-text d-flex text-left flex-wrap justify-content-center align-items-start my-2" style={{margin: "0 15px"}}>
        								                    		    				{quizData.options[index].map((option,index) => (
        								                    		    					<div className="form-check p-0 my-2 col-md-6 col-12" key={index}>
        								                    		    					<button className="btn d-flex justify-content-center align-items-center w-100" onClick={() => handleOptionSelect(index+1)}>
    	    								                		            					<div className="card asdasde border border-white w-100"
																																style={{																																	
																																	borderRadius: 
																																		"20px"
																																}}>
																								  		<div>
																								  			<img 
																								  				src={option.opurl} 
																								  				style={{
																															borderRadius: "20px",
																															width: "100%",
																															height: "auto",
																															maxHeight: "190px"
																														}}
																												className="card-img-top" alt="..."/>
																										</div>
																								  		<h5 className="card-title m-3">{ option.opvalue }</h5>
																								</div>	        								                		          				
	        								                		          				</button>
        											        		                		</div>	
        								                    		    				))}
																					</h6>        								                    		  				
        								                    					</div>        								                    					
        								                					</div>
        								            					</div>
        								        						</div>
        								        						</div>
                      												)}}):"" }
                      												{ quizInfo.q_type==="usrop"?quizData.questions.map((quest,index) => {
        								              					if(index<10)
																		  return(
																		  	<div>
																		  	<div
																					className={
																						current ===
																						0
																							? "carousel-item active"
																							: "carousel-item"
																					}
																				>
																					{" "}
																					<div>
																						<div className="w-100">
																							<div className="">
																								<div className="mb-3">
																									<div className="card-body flex-column d-flex justify-content-between align-items-center">
																										<div className="text-center">
																											<h1 className="card-title">
																												{
																													quizData.name
																												}
																											</h1>
																											<h5 className="text-muted">
																												{
																													quizData.description
																												}
																											</h5>
																											<div className="d-block mt-5 border-2 border rounded-3 border-dark wooh-shadow">
																												<h4 style={{marginTop:"-19px"}}>
																													<span className="badge p-2 text-dark bg-purple2 rounded" style={{boxShadow: "5px 5px 1px #000"}}>
																														Instructions:
																													</span>
																												</h4>
																												<div className="card-text text-start p-3">
																													<ul className="p-0">
																														<li>
																															1.
																															Select
																															your
																															Region
																															and
																															Enter
																															your
																															name.
																														</li>
																														<li>
																															2.
																															Create
																															your
																															own
																															What
																															If
																															quiz.
																														</li>
																														<li>
																															3.
																															Your
																															challenge
																															link
																															will
																															be
																															ready.
																														</li>
																														<li>
																															4.
																															Share
																															the
																															link
																															with
																															your
																															friends.
																														</li>
																														<li>
																															5.
																															Your
																															friends
																															will
																															answer
																															all
																															your
																															questions.
																														</li>
																														<li>
																															6.
																															Check
																															their
																															answers
																															on
																															your
																															Friendboard.
																														</li>
																													</ul>
																												</div>
																											</div>
																										</div>
																									</div>
																								</div>
																								<div className="">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Region
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<select
																											onChange={(
																												e
																											) => {
																												console.log(
																													e
																														.target
																														.value
																												);
																												setplayerRegion(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-select border-info"
																										>
																											<option
																												value="other"
																												className="text-muted"
																											>
																												Select
																												your
																												region
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="India"
																											>
																												India
																											</option>
																											<option
																												className="border-3 border-bottom border-dark"
																												value="Other"
																											>
																												Other
																											</option>
																										</select>
																									</div>
																								</div>
																								<div className="mb-3">
																									<h5 className="card-title d-none">
																										Enter
																										your
																										Name
																										:
																									</h5>
																									<div
																										className="card-text d-flex text-left justify-content-center align-items-start flex-column my-2"
																										style={{
																											margin: "0 15px",
																										}}
																									>
																										<input
																											placeholder="Name"
																											onChange={(
																												e
																											) => {
																												setplayerName(
																													e
																														.target
																														.value
																												);
																											}}
																											className="form-control border-info"
																											type="text"
																										/>
																									</div>
																								</div>
																								<div className="w-100 px-3">
																									<button
																										className={
																											playerName ===
																												"" ||
																											playerRegion ===
																												""
																												? "btn wooh-shadow bg-purple2 border-2 border-dark disabled w-100"
																												: "btn wooh-shadow bg-purple2 border-2 border-dark w-100"
																										}
																										style={{
																											minWidth:
																												"10px",
																										}}
																										onClick={
																											nextSlide
																										}
																									>
																										Confirm
																									</button>
																								</div>
																							</div>
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
																						</div>
																					</div>
																				</div>
	           								                			<div className={ index === current-1 ? 'carousel-item active' : 'carousel-item' } key={index}>
        								                				<div className="mx-md-5">
        								                					<div className="card border border-primary m-5">
        								                    					<div className="card-body">
            										        		  				<div className="mt-2 text-center">
	            										        		  				<h4 className="card-title"><div className="w-100 fw-bold">{quest}</div></h4>        								                    		  				
	            										        		  			</div>
        								                    					</div>
        								                    						<div className="justify-content-between d-flex py-5 px-md-5 px-3"
																								style={{
																									backgroundImage:
																										"url(https://holaquiz.com/public/images/what_if/question_bg.png)",
																									backgroundRepeat:
																										"no-repeat",
																									backgroundSize:
																										"cover",
																								}}>		            										        		  			
	        								                    		  				<textarea className="form-control" placeholder="Enter your answer ..." onChange={(e) => {setCurrentAns(e.target.value)}} id="" rows="3"></textarea>
        								                    							<button className="btn wooh-shadow bg-purple2 border-2 border-dark" onClick={handleOptionSelect}>{current===lengthCarItem-1?"SUBMIT":"NEXT"}</button>
        								                    						</div>
        								                					</div>
        								            					</div>
        								        						</div>
        								        						</div>
                      												)}):"" }        								              				                      												
        									      			</div>	        								        		
        									    		</div>
        											</div>
        										</div>
        									</div>
        								</div>
								}
							</div>												
						</section>

				</article>
		</div>
	)
}

export default PlayQuiz