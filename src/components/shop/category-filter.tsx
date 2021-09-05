//import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React, {useEffect, useState } from "react";
//import { useTranslation } from "next-i18next";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export const CategoryFilter = () => {
	//const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;




	const [category, setCategories] = useState<any[]>([]);

	/* GET ALL SUBCATEGORIES */

	useEffect(() => {
		// reset hooks state
		setCategories([])

		if(query.slug !== "" && query.slug !== null && query.slug !== undefined){
			
			const params = {
				categoria: query.slug
			}
			
			
			Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETSUBCATEGORIASFILTER, params)
			.then(res => {
				
				if(res.status === 200 && res.data.length > 0){
					Object.keys(res.data).forEach(function(key) {
						

						if(res.data[key].link !== "geral"){
							var cat = {
								id: `${res.data[key].link}-${query.slug}`,
								name: res.data[key].name,
								slug: res.data[key].link,
								productCount: 0,
								image: {
									id: key,
									thumbnail: "",
									original: ""
								},
							
							}
							setCategories(category => [...category, cat])
						}
					})
				} 
				
			}).catch(err => {
				// nothing here
				console.log(err)
			})

		} 
		
	}, [query.slug])



	const selectedCategories = query?.category
		? (query.category as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);

	

	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.category]);

	//if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
	
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { category, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { category: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}


	return (
		<>
		{category.length > 0 &&
		<div className="block border-b border-gray-300 pb-7 mb-7">
			
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				Categorias de Produtos
			</h3>
			
			<div className="mt-2 flex flex-col space-y-4">
				{category?.map((item: any) => (
					
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						value={item.slug}
						checked={formState.includes(item.slug)}
						onChange={handleItemClick}
					/>
					
				))}
			</div>
		</div>
		}
		</>
	);
};
/*function params(arg0: string, params: any) {
	throw new Error("Function not implemented.");
}*/

