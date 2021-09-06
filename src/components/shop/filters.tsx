import { CategoryFilter } from "./category-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";



export const ShopFilters: React.FC = () => {

	const router = useRouter();
	const { pathname, query } = router;

	const handleRadio = (event: any) => {
		
		if(event.target.value !== null && event.target.value !== "" && event.target.value !== undefined){
			router.push({
				pathname,
				query: {
					slug: event.target.value,
				},
			});
		}

	}

	

	return (
		
		
		<div className="pt-1">
			
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					Escolha Outro Pet:
				</h3>
			<div className="mt-2 flex flex-col space-y-4">
				<div style={{marginBottom: '5px'}} className="group flex items-center text-heading text-sm cursor-pointer">
					<input
						type="radio"
						className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
						name="pet"
						value="cachorros"
						checked={query.slug === "cachorros"  ? true : false}
						onClick={handleRadio}
						readOnly
					/>
					<span className="ms-2 text-sm text-heading relative">
						Cachorros
					</span>
				</div>
				<div style={{marginBottom: '5px'}} className="group flex items-center text-heading text-sm cursor-pointer">
					<input
						type="radio"
						className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
						name="pet"
						value="gatos"
						checked={query.slug === "gatos" ? true : false}
						onClick={handleRadio}
						readOnly
					/>
					<span className="ms-2 text-sm text-heading relative">
						Gatos
					</span>
				</div>
				<div style={{marginBottom: '5px'}} className="group flex items-center text-heading text-sm cursor-pointer">
					<input
						type="radio"
						className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
						name="pet"
						value="peixes"
						checked={query.slug === "peixes"  ? true : false}
						onClick={handleRadio}
						readOnly
					/>
					<span className="ms-2 text-sm text-heading relative">
						Peixes
					</span>
				</div>
				<div  style={{marginBottom: '5px'}} className="group flex items-center text-heading text-sm cursor-pointer">
					<input
						type="radio"
						className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
						name="pet"
						value="lovers"
						checked={query.slug === "lovers"  ? true : false}
						onClick={handleRadio}
						readOnly
					/>
					<span className="ms-2 text-sm text-heading relative">
						Pet Lovers
					</span>
				</div>
				<div style={{marginBottom: '5px'}} className="group flex items-center text-heading text-sm cursor-pointer">
					<input
						type="radio"
						className="form-radio w-5 h-5 border border-gray-300 text-heading rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading"
						name="pet"
						value="outros"
						checked={query.slug === "outros"  ? true : false}
						onClick={handleRadio}
						readOnly
					/>
					<span className="ms-2 text-sm text-heading relative">
						Outros Pets
					</span>
				</div>
			</div>
		</div>
			
		
			<CategoryFilter />
			<PriceFilter />
		</div>
	);
};


