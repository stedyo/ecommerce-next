import React from "react";
import { useEffect, useState } from 'react'
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import { Product } from "@framework/types";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';


interface ProductsProps {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
	products?: Product[];
	uniqueKey?: string;
}

const ProductsBlock: React.FC<ProductsProps> = ({
	sectionHeading,
	categorySlug,
	className = "mb-9 md:mb-9 lg:mb-10 xl:mb-12",
}) => {
	
	const [latest, setLatest] = useState<any[]>([]);


	useEffect(() => {
		Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETLASTESTPROD)
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
						urlImagem: image,
						image: {
							id: res.data[key].id,
							thumbnail: {url: image, width: '480', height: '275'},
							original: {url: image, width: '1800', height: '800'}
						},
						price: res.data[key].price,
						sale_price: parseFloat(res.data[key].price).toFixed(2),
						variations: [],
						categoria: res.data[key].categoria,
						subcategoria: res.data[key].subcategoria
					}
					setLatest(latest => [...latest, prod])
				})
			} 

			
		}).catch(err => {
			// nothing here
			console.log(err)
		})
	}, [])


	
	return (
		<div className={className}>
			<SectionHeader
				sectionHeading={sectionHeading}
				categorySlug={categorySlug}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
				{latest?.map((product) => (
					<ProductCard
						key={`product--key${product.id}`}
						product={product}
						variant="grid"
					/>
				))}
			</div>

		</div>
	);
};

export default ProductsBlock;
