import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Blog = () => {
	const [blogData, setBlogData] = useState()
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function loadData(){
			const data = await axios.get(process.env.REACT_APP_SERVER_URL+"blog")
			console.log(data)
			setBlogData(data.data);
			setLoading(false);
		}
		loadData()
	}, [])

	return (
		<div>
			<div id="page-wrapper">

				<article className="my-5">					

						<section className="container d-flex flex-column align-items-center mt-5">

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
						</section>

				</article>			
			</div>
		</div>
	)
}

export default Blog