import React from 'react'

const Footer = () => {
	return (
		<>
			   	<footer className=" custom-font footer">
					<div className="row bg-primary pb-2 pt-3">
						<div className="col-md-4 d-flex justify-content-center"> 
						<a href="/privacy-policy" className="text-white mx-3 d-flex flex-column align-items-center text-decoration-none">Privacy Policy</a>
								<a href="/terms-of-use" className="text-white mx-3 d-flex flex-column align-items-center text-decoration-none">Terms of use</a>
						</div>
						<div className="col-md-4 d-flex justify-content-center"> 
						<a className="mx-2" href="https://www.facebook.com/WowQuizo-102022302265265/"><img src="https://holaquiz.com/public/images/what_if/footer_fb.png" height="30" alt="sdfsd"/></a>
						    {/* <a className="mx-2"><img src="https://holaquiz.com/public/images/what_if/footer_instagram.png"  height="30" alt="sdsdf"/></a> */}
							{/* <a className="mx-2"><img src="https://holaquiz.com/public/images/what_if/footer_twitter.png" height="30" alt="df"/></a> */}
						</div>
						<div className="col-md-4 d-flex justify-content-center"> 
						copyright@WowQuizzo 2021
						</div>
					</div>


      				
    			</footer>
		</>
	)
}

export default Footer