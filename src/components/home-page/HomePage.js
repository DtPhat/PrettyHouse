import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../home-page/HomeStyle.scss';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function HomePage() {
	const location = useLocation();
	const [showToast, setShowToast] = useState()
	const [message, setMessage] = useState()
	if (showToast) {
		message.includes("successful")
			? toast.success(message)
			: toast.error(message)
	}
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const decodedData = decodeURIComponent(params.get('data'));
		const serverResponse = JSON.parse(decodedData);
		console.log(serverResponse)
		if (!serverResponse) {
			return
		}
		if (!serverResponse.clientId) {
			setShowToast(true)
			setMessage(serverResponse.message || "Payment error")
			return
		}
		const accessToken = localStorage.getItem('accessToken')
		const decodedAccessToken = accessToken ? JSON.parse(atob(accessToken.split('.')[1]) || null) : null;

		if (serverResponse.clientId == decodedAccessToken?._id) {
			setMessage('Payment successful')
			setShowToast(true)
		}
	}, [location]);
	const navigate = useNavigate()
	return (
		<section style={{ margin: '0.5rem 0' }}>
			<Carousel>
				<Carousel.Item>
					<img src='https://exarch.ai/wp-content/uploads/2022/05/1-11.jpg'
						style={{ width: '100%', height: '38rem', objectFit: 'cover' }} />
					<Carousel.Caption>
						<Button variant='light' onClick={() => navigate('/designs/elegant-dining', { state: { designId: '65c4ab20b4a947d1f56803de' } })}>
							Get it now
						</Button>
						<h3>Contemporary Bedroom Oasis</h3>
						<p>Create a contemporary bedroom oasis for a serene retreat</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src='https://st.hzcdn.com/simgs/pictures/home-offices/mid-century-interior-remodel-ellen-weiss-design-img~4ee1a1840e1a5fd8_14-6799-1-94ce116.jpg'
						style={{ width: '100%', height: '38rem', objectFit: 'cover' }} />
					<Carousel.Caption color='black'>
						<Button variant='light' onClick={() => navigate('/designs/mid-century-office', { state: { designId: '65c4a7455909a62ef590d24e' } })}>
							Get it now
						</Button>
						<h3>Mid-Century Office</h3>
						<p>A minimalist and functional home office with Scandinavian design elements</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src='https://www.homilo.com/wp-content/uploads/2022/10/Art-Deco-Dining-Room.jpg'
						style={{ width: '100%', height: '38rem', objectFit: 'cover' }} />
					<Carousel.Caption>
						<Button variant='light' onClick={() => navigate('/designs/art-deco-dining', { state: { designId: '65c4a9d4fd2e7ab51fa87ffa' } })}>
							Get it now
						</Button>
						<h3>Art Deco Dining</h3>
						<p>Dine in style with an art deco-inspired dining room setup</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</section>
	)
}
