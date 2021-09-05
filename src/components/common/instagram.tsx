import { useEffect, useState } from 'react'
import Image from "next/image";
import { GiClick } from "react-icons/gi";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import SectionHeader from "@components/common/section-header";
import router from "next/router";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import Axios from "axios";
import { ROUTES } from '@utils/routes';


const handleProductView = (product_id: any) =>{
		
	if(product_id !== "" && product_id !== null && product_id > 0){
		router.push(`${ROUTES.PRODUCT}/${product_id}`)
	}
	
}

const handleImageError = (e) => {
	e.target.onerror = null;
    e.target.srcset = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/error.png`
}


interface Props {
	className?: string;
	productVariant?: "list" | "gridSlim";
}
const Instagram: React.FC<Props> = ({ className = "", 	productVariant = "list" }) => {
	const { t } = useTranslation("common");

	const [mostClicked, setMostClicked] = useState<any[]>([]);
	

	useEffect(() => {
		Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETMOSTCLICKED)
        .then(res => {
			
		
			if(res.status === 200 && res.data.length > 0){
				
				Object.keys(res.data).forEach(function(key) {

					let image = res.data[key].image_link
					if(image === null || image === ""){
						image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[key].id}.${res.data[key].photo_ext}`
					}


					var singleMostClicked = {
						id: res.data[key].id,
						title: res.data[key].product_name,
						slug: res.data[key].product_name,
						image: image,
					}
					setMostClicked(mostClicked => [...mostClicked, singleMostClicked])
				})
			
			} 

			}).catch(err => {
				console.log(err)
			})
	}, [])




	return (
		<div
			className={`flex flex-col border border-gray-300 rounded-lg pt-6 sm:pt-7 lg:pt-8 xl:pt-7 2xl:pt-9 px-4 md:px-5 lg:px-7 pb-6 lg:pb-7 ${
				productVariant !== "gridSlim" && "xl:px-5 2xl:px-7"
			} ${className}`}
		>
		<SectionHeader
			sectionHeading="text-flash-sale"
			className="mb-4 md:mb-5 lg:mb-6 xl:mb-5 2xl:mb-6 3xl:mb-8"
		/>

		<div
			className={cn(
				"grid grid-cols-3 md:grid-cols-6 gap-0.5 sm:gap-1 overflow-hidden rounded-md",
				className
			)}
		>
			{mostClicked?.map((item) => (
				<a
					className="group flex justify-center text-center relative"
					//href={item.slug}
					key={`instagram--key${item.id}`}
					target="_blank"
					onClick={() => handleProductView(item.id)}
				>
					<Image
						src={item.image ?? "/assets/placeholder/instagram.svg"}
						alt={t(`${item.title}`) || t("text-instagram-thumbnail")}
						width={300}
						height={300}
						className="bg-gray-300 object-cover rounded"
						onError={handleImageError}
					/>
					<div className="absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
					<div className="absolute top left h-full w-full flex items-center justify-center">
						<GiClick className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
					</div>
				</a>
			))}
		</div>

			
			
				
		</div>
		
	);
};

export default Instagram;
