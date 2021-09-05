import { useEffect, useState } from 'react'
import Card from "@components/common/card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Axios from "axios";

interface CategoriesProps {
	sectionHeading: string;
	className?: string;
	type?: "rounded" | "circle";
}

const breakpoints = {
	"1720": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"1400": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"1025": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 5,
		spaceBetween: 20,
	},
	"500 ": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
};

const breakpointsCircle = {
	"1720": {
		slidesPerView: 5,
		spaceBetween: 48,
	},
	"1400": {
		slidesPerView: 5,
		spaceBetween: 32,
	},
	"1025": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"768": {
		slidesPerView: 5,
		spaceBetween: 20,
	},
	"500 ": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
};

const CategoryBlock: React.FC<CategoriesProps> = ({
	className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
	sectionHeading,
	type = "circle",
}) => {




	const [categorias, setCategorias] = useState<any[]>([]);


	useEffect(() => {
		Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETCATEGORIAS)
        .then(res => {
			
			if(res.status === 200 && res.data.length > 0){
				Object.keys(res.data).forEach(function(key) {

					var singleCategory = {
						id: res.data[key].id,
						name: res.data[key].name,
						slug: res.data[key].link,
						productCount: 0,
						image: {
							id: res.data[key].id,
							thumbnail: `${process.env.NEXT_PUBLIC_URL_CATEGORIAS}/${res.data[key].id}.png`,
							original: `${process.env.NEXT_PUBLIC_URL_CATEGORIAS}/${res.data[key].id}.png`
						}
					}
					setCategorias(categorias => [...categorias, singleCategory])
				})
			
			} 

		}).catch(err => {
			console.log(err)
		})
	}, [])



	return (
		<div className={className}>

			{categorias.length > 0 &&
				<SectionHeader sectionHeading={sectionHeading} />
			}

			{categorias.length > 0 &&
				<Carousel
					breakpoints={type === "rounded" ? breakpoints : breakpointsCircle}
					buttonClassName="-mt-8 md:-mt-10"
				>
				{categorias?.map((category: any) => (
					<SwiperSlide key={`category--key-${category.id}`}>
						<Card
							item={category}
							href={`${ROUTES.CATEGORY}/${category.slug}`}
							variant={type}
							effectActive={true}
							size={type === "rounded" ? "medium" : "small"}
						/>
					</SwiperSlide>
				))}
				
				</Carousel>
			}
		</div>
	);
};

export default CategoryBlock;
