import React,{ useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'


const ShowBlog = () => {
	const [blogData, setBlogData] = useState()
	const [loading, setLoading] = useState(true);
	const { id } = useParams()
	useEffect(() => {
		async function loadData(){
			const data = await axios.get(process.env.REACT_APP_SERVER_URL+`/blog/${id}`)
			console.log(data)
			setBlogData(data.data);
			setLoading(false);
		}
		loadData()
	}, [])

	console.log(id)

	return (
		<div id="page-wrapper">
				{
					loading ?
					    <div>loading</div>
					    :
						<div>
							<section id="banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.0) 0%, rgba(9,9,121,0.1) 35%, rgba(0,212,255,0.1) 100%), url(${blogData.img_url})`,backgroundSize: 'cover', minHeight: "300px" }}>				
								<div class="w-100 h-100 d-flex justify-content-center align-items-center text-white" style={{background: 'none', minHeight: "300px"}}>
									<div>
										<h2><strong>{blogData?blogData.title:""}</strong></h2>
									</div>
								</div>
							</section>
							
							<section class="container-sm py-5 mt-3">
								<header class="major123" style={{textAlign: "left"}}>								
										<div dangerouslySetInnerHTML={{ __html: blogData.markdown}}></div>
								</header>										
							</section>
						</div>
			}				
		</div>
	)
}

export default ShowBlog