import React, { useEffect, useState } from 'react'
import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { useWindowSize } from "@utils/use-window-size";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Link from '@components/ui/link';

const breakpoints = {
	"1500": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};
/*  primeiro menu de destaques */
const HeroBlock: React.FC = () => {
	
	const { width } = useWindowSize();
	const defaultBanner = process.env.NEXT_PUBLIC_URL_DESTAQUES + "/default_destaque.png"
	const [highlights, setHighlights] = useState<any[]>([]);



	useEffect(() => {
		Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETDESTAQUES)
        .then(res => {
			
			if(res.status === 200 && res.data.length > 0){
				Object.keys(res.data).forEach(function(key) {

					var bannerH = {id: res.data[key].id,
						title: res.data[key].product_name,
						slug: res.data[key].product_name,
						image: {
							mobile: {url: `${process.env.NEXT_PUBLIC_URL_DESTAQUES}/${res.data[key].id}.${res.data[key].photo_ext_destaque}`, width: '620', height: '275'},
							desktop: {url: `${process.env.NEXT_PUBLIC_URL_DESTAQUES}/${res.data[key].id}.${res.data[key].photo_ext_destaque}`, width: '1800', height: '800'}
						}
					}
					setHighlights(highlights => [...highlights, bannerH])
				})
			} else {
				
				var defaultBannerObj = {id: 0,
					title: 'Achados do Caramelus',
					slug: '',
					image: { 
						mobile: {url: defaultBanner, width: '480', height: '275'}, 
						desktop: {url: defaultBanner, width: '1800', height: '800'} 
						}
				}
				setHighlights(highlights => [...highlights, defaultBannerObj])
			}

			
		}).catch(err => {
			console.log(err)
			var defaultBannerObj = {id: 0,
				title: 'Achados do Caramelus',
				slug: '',
				image: { 
					mobile: {url: defaultBanner, width: '480', height: '275'}, 
					desktop: {url: defaultBanner, width: '1800', height: '800'} 
					}
			}
			setHighlights(highlights => [...highlights, defaultBannerObj])
		})
	}, [])

	return (
		
		<div className="heroBannerOne relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0">
			
			<br /> 

			{highlights.length > 0 &&
			<Carousel
				breakpoints={breakpoints}
				centeredSlides={width < 1500 ? false : true}
				autoplay={{ delay: 5000 }}
				className="mx-0"
				buttonClassName="hidden"
				pagination={{
					clickable: true,
				}}
			>
				{highlights?.map((banner: any) => (
					<SwiperSlide
						className="carouselItem px-0 2xl:px-3.5"
						key={`banner--key-${banner?.id}`}
					>
					{banner.id > 0 &&
					<Link href={`${ROUTES.PRODUCT}/${banner.id}`}>
						<BannerCard
							banner={banner}
							href={`${ROUTES.PRODUCT}/}`}
						/>
					</Link>
					}
					{banner.id === 0 &&
					<BannerCard
							banner={banner} href={''}						//href={`${ROUTES.PRODUCT}/}`}
					/>
					}
					</SwiperSlide>
				))}
			</Carousel>
			}
		</div>
	);
};

export default HeroBlock;
