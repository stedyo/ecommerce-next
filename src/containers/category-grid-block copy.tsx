import { useEffect, useState } from 'react'
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import CategoryCard from "@components/common/category-card";
import { useWindowSize } from "@utils/use-window-size";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

interface CategoriesProps {
	sectionHeading: string;
	className?: string;
}

const breakpoints = {
	"1220": {
		slidesPerView: 4,
		spaceBetween: 28,
	},
	"800": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"440": {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
	sectionHeading = "text-section-title",
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const { width } = useWindowSize();
	//const data = []


	const [latest, setLatest] = useState<any[]>([]);


	useEffect(() => {
		Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETFEATUREDCATEGORIES)
        .then(res => {
			
		
			if(res.status === 200 && res.data.length > 0){
				Object.keys(res.data).forEach(function(key) {
					
					let image = res.data[key].image_link
					if(image === null || image === ""){
						image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[key].id}.${res.data[key].photo_ext}`
					}


					var prod = {
						id: res.data[key].id,
						name: res.data[key].product_name,
						description: res.data[key].description,
						slug: res.data[key].id,
						image: {
							id: res.data[key].id,
							thumbnail: {url: image, width: '480', height: '275'},
							original: {url: image, width: '1800', height: '800'}
						},
						price: res.data[key].price,
						sale_price: res.data[key].price,
						variations: [],
						categoria: res.data[key].categoria,
						subcategoria: res.data[key].subcategoria
					}
					setLatest(latest => [...latest, prod])
				})
			} 

			
		}).catch(err => {
			// nothing here
		})
	}, [])
	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			
				<>
					{width < 1025 ? (
						<div className="relative">
							<Carousel breakpoints={breakpoints}>
								{ latest?.map((category) => (
											<SwiperSlide key={`category--key${category.id}`}>
												<CategoryCard category={category} />
											</SwiperSlide>
								))}
							</Carousel>
						</div>
					) : (
						<div className="lg:grid lg:grid-cols-3 lg:gap-5 xl:gap-7">
							{latest?.map((category) => (
										<CategoryCard
											key={`category--key${category.id}`}
											category={category}
										/>
							))}
						</div>
					)}
				</>
			
		</div>
	);
};

export default CategoryGridBlock;
