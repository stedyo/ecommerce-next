import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import { FC, useEffect, useState } from "react";
import Text from "@components/ui/text";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import React from "react";
import { Drawer } from "@components/common/drawer/drawer";
import FilterSidebar from "@components/shop/filter-sidebar";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import { getDirection } from "@utils/get-direction";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";

interface ProductGridProps {
	className?: string;
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const { query } = useRouter();

	const [countPages, setCountPages] = useState(0)
	const [curSlug, setcurSlug] = useState(query.slug)
	const [curPrice, setcurPrice] = useState(query.price)
	const [curCategories, setcurCategories] = useState(query.category)
	const [totalItems, setTotalItens] = useState(0)
	const [filterCombobox] = useState("newest")

	const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
	const [filteredPetLovers, setFilteredPetLovers] = useState<any[]>([]);
	const [loadMore, setLoadMore] = useState(false)
	const [showPetLovers, setShowPetLovers] = useState(false)
	
	
	const myRef = React.createRef() as React.MutableRefObject<HTMLInputElement>;
	const fetchNextPage = (ref : any) => {
		ref.current.scrollIntoView({behavior: 'smooth'})
		const newCount = countPages + 1
		setCountPages(newCount)
	}

	const useStyles = makeStyles((theme) => ({
		formControl: {
		  margin: theme.spacing(1),
		  minWidth: 120,
		},
		selectEmpty: {
		  marginTop: theme.spacing(2),
		},
	  }));

	const classes = useStyles();

	useEffect(() => {

		setFilteredProducts([])
		setLoadMore(false)

		// HANDLE: slug
		// mudou de pet, zera paginação
		if(curSlug !== query.slug){ 
			setCountPages(0)
			setcurSlug(query.slug)
		}

		// 	HANDLE: price
		//  inicializa o primeiro valor em curPrice
		if(query.price !== undefined && curPrice === undefined){
			setcurPrice(query.price)
		}
		// caso mude o preço, reseta contagem da pagina
		if(curPrice !== query.price){
			setCountPages(0)
			setcurPrice(query.price)
		}
		
		// HANDLE: categorias
		//  inicializa o primeiro valor em curCategories
		if(query.category !== undefined && curCategories === undefined){
			setcurCategories(query.category)
		}
		// caso mude as categorias, reseta contagem da pagina
		if(curCategories !== query.category){
			setCountPages(0)
			setcurCategories(query.category)
		}

		if(query.slug !== ""  && query.slug !== null && query.slug !== undefined){
		
			var params = {
				categoria: query.slug,
				subcategoria: query.category ? query.category :  "all",
				preco: query.price ? query.price : "all",
				count: countPages
			}
			
			Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETFILTEREDPRODUCTS, params)
			.then(res => {

				if(res.status !== 200){
					setShowPetLovers(true)
				}
			
				if(res.status === 200 && res.data.length > 0){
					
					setTotalItens(res.data[0].total_count)

					if(res.data.length == 15){ // se achou 15 resultados, mostra o botao de carregar mais
						setLoadMore(true)
					}

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
							sale_price: res.data[key].price,
							variations: [],
							categoria: res.data[key].categoria,
							subcategoria: res.data[key].subcategoria
						}
						setFilteredProducts(filteredProducts => [...filteredProducts, prod])
					})
				} else {
					
					Axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETPETLOVERSRECENTLYADDEED)
					.then(res => {
						if(res.status === 200 && res.data.length > 0){
					
							//setTotalItens(res.data[0].total_count)
		
							if(res.data.length == 15){ // se achou 15 resultados, mostra o botao de carregar mais
								setLoadMore(true)
							}
		
							Object.keys(res.data).forEach(function(key) {
								
								let image = res.data[key].image_link
								if(image === null || image === ""){
									image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[key].id}.${res.data[key].photo_ext}`
								}
			
			
								var lovers = {
									id: res.data[key].id,
									name: res.data[key].product_name,
									description: res.data[key].description,
									slug: res.data[key].id,
									image: {
										id: res.data[key].id,
										thumbnail: {url: image, width: '480', height: '275'},
										original: {url: image, width: '1800', height: '800'}
									},
									galery:[],
									price: res.data[key].price,
									sale_price: res.data[key].price,
									variations: [],
									categoria: res.data[key].categoria,
									subcategoria: res.data[key].subcategoria
								}
								setFilteredPetLovers(filteredPetLovers => [...filteredPetLovers, lovers])
							})
						}
					}).catch(err => {
						// nothing here
						console.log(err)
					})
			
				}
	
				
			}).catch(err => {
				// nothing here
				console.log(err)
			})
	

		}
		
	}, [countPages, query])



	const { locale } = useRouter();
	const { openFilter, displayFilter, closeFilter } = useUI();
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
	return (
		<span >
			
			<div className="flex justify-between items-center mb-7">
			<Text variant="pageHeading" className="hidden lg:inline-flex pb-1">
				
			</Text>
			<button
				className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
				onClick={openFilter}
			>
				<FilterIcon />
				<span className="ps-2.5">Filtros</span>
			</button>
			<div className="flex items-center justify-end">
				{totalItems > 0 &&
				<div className="flex-shrink-0 text-body text-xs md:text-sm leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
					Caramelu's encontrou <strong>{totalItems} {totalItems > 1 ? 'itens': 'item'}</strong> para você 
				</div>
				}
				    
				<FormControl className={classes.formControl}>
					<NativeSelect
					className={classes.selectEmpty}
					value={filterCombobox}
					name="filter"
					inputProps={{ 'aria-label': 'age' }}
					disabled
					>
					
					<option value="newest">Novidades</option>
					</NativeSelect>
					<FormHelperText>Filtrado por:</FormHelperText>
				</FormControl>
    
			</div>
			<Drawer
				placement={dir === "rtl" ? "right" : "left"}
				open={displayFilter}
				onClose={closeFilter}
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<FilterSidebar />
			</Drawer>
		</div>
		{filteredProducts.length > 0 &&
			<>
			<div
				ref={myRef} 
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
			{filteredProducts?.map((product) => (
				<ProductCard
					key={`product--key${product.id}`}
					product={product}
					variant="grid"
				/>
			))}
			
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{loadMore &&
				<Button
						onClick={() => fetchNextPage(myRef)}
						variant="slim"
					>
						Carregar mais
				</Button>
				}
			</div>
			</>
			}
			{showPetLovers &&
				<>
				<div style={{fontSize: "16px", textAlign: "center", padding:"0px 10px 70px 0px"}}>
					
					
					<img  style={{borderRadius: "10px"}} src="/assets/images/notfound.png" />
					<br />
					Mas, quem sabe você não goste dessas novidades que o Caramelu's 
					encontrou para os 
					<strong><a href={`${ROUTES.CATEGORY}/lovers`}> PET LOVERS </a></strong>
				</div>
				<div
					ref={myRef} 
					className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
				>
					{filteredPetLovers?.map((product) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							variant="grid"
						/>
					))}
				</div>
			</>
			}
		</span>
	);
};
