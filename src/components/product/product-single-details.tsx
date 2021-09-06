import React, { useEffect, useState } from "react";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { BiBeenHere } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { ROUTES } from "@utils/routes";
import Logo from "@components/ui/logo";
import Image from "next/image";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";

const ProductSingleDetails: React.FC = () => {
	const {
		query: { slug },
	} = useRouter();

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.srcset = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/error.png`
	}

	const [affiliate, setAffiliate] = React.useState("")
	const [subcategoria, setSubcategoria] = React.useState("")
	const [open, setOpen] = React.useState(false);
	const [singleProduct, setSingleProduct] = useState<any[]>([]);
	const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
	const [show404, setShow404] = useState(false)
	

	
		
		useEffect(() => {

			setAffiliate("")
			setSubcategoria("")
			setSingleProduct([])
			setRelatedProducts([])
		
			if(slug !== null && slug !== ""  && slug != undefined){
		
				const params = {
					product_id: slug
				}

				Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.GETSINGLEPRODUCT, params)
				.then(res => {
				
					if(res.status !== 200){
						setShow404(true)
					}
				
					if(res.status === 200 && res.data[0].id !== null && res.data[0].id > 0){
						
							let image = res.data[0].image_link
							if(image === null || image === ""){
								image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[0].id}.${res.data[0].photo_ext}`
							}
						
							var prod = {
								id: res.data[0].id,
								link: res.data[0].link,
								category:{
									id: res.data[0].id,
									name: res.data[0].categoria,
									slug: res.data[0].categoria,
									link: res.data[0].categoria_link
								},
								observacao: res.data[0].observacao,
								name: res.data[0].product_name,
								description: res.data[0].description,
								slug: res.data[0].id,
								image: {
									id: res.data[0].id,
									thumbnail: {url: image, width: '480', height: '275'},
									original: {url: image, width: '1800', height: '800'}
								},
								gallery: {
									id: res.data[0].id,
									thumbnail: {url: image, width: '480', height: '275'},
									original: {url: image, width: '1800', height: '800'}
								},
								price: res.data[0].price,
								sale_price: res.data[0].price,
								categoria: res.data[0].categoria,
								subcategoria: res.data[0].subcategoria,
								related: res.data[0].related
							}
							setSubcategoria(res.data[0].subcategoria_link)
							setSingleProduct(singleProduct => [...singleProduct, prod])

							// related products
							if(res.data[0].related && res.data[0].related.length > 0){
								Object.keys(res.data[0].related).forEach(function(rkey) {
						
									let image = res.data[0].related[rkey].image_link
									if(image === null || image === ""){
										image = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/${res.data[0].related[rkey].id}.${res.data[0].related[rkey].photo_ext}`
									}
				

									var relprod = {
										id: res.data[0].related[rkey].id,
										name: res.data[0].related[rkey].product_name,
										description: res.data[0].related[rkey].description,
										slug: res.data[0].related[rkey].id,
										image: {
											id: res.data[0].related[rkey].id,
											thumbnail: {url: image, width: '480', height: '275'},
											original: {url: image, width: '1800', height: '800'}
										},
										price: res.data[0].related[rkey].price,
										sale_price: res.data[0].related[rkey].price,
										categoria: res.data[0].related[rkey].categoria,
										subcategoria: res.data[0].related[rkey].subcategoria
									}
									setRelatedProducts(relatedProducts => [...relatedProducts, relprod])
								})
							}


					} 
					
				}).catch(err => {
					// nothing here
					console.log(err)
				})
			}
		}, [slug])
	

	const { width } = useWindowSize();
	const data = singleProduct[0]

	const handleClose = (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		setOpen(false);
	};

	const handleOpen = (affiliateLink : string) => {
	
		setAffiliate(affiliateLink)
		setOpen(true);
	};

	const handleComprar = () => {
		
		if(affiliate !== null && affiliate !== "" && affiliate !== undefined){
			window.open(affiliate, "_blank")
			setOpen(false)
		}
	}
	
	return (
		<>
		{data !== undefined &&
		<>
		<div className="py-6">
			<br />
			<span className="font-semibold text-heading inline-block pe-2">
				Você está vendo:
			</span>
			<Link
				href={`${ROUTES.CATEGORY}/${data?.category?.link}`}
				className="transition hover:underline hover:text-heading"
			>
			<strong>{data?.category?.name.toUpperCase()}</strong>
			</Link>
			<BiBeenHere style={{display:"inline", margin: "0px 7px"}} /> 
			<Link
				href={`${ROUTES.CATEGORY}/${data?.category?.link}?category=${subcategoria.toLowerCase().trim()}`}
				className="transition hover:underline hover:text-heading"
			>
			{data?.subcategoria.toUpperCase()}
			</Link>
			
				
		</div>
		<div  className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<div className="col-span-1 transition duration-150 ease-in hover:opacity-90">
					
					<img
					src={
						data?.image?.original?.url
					}
					alt={`${data?.name}--${data?.id}`}
					className="object-cover w-full"
					onError={handleImageError}
					style={{boxShadow:"5px 5px 5px #ccc", maxWidth:"500px"}}
						
					/>
				</div>
			) : (
				<div className="col-span-4 grid grid-cols-1 gap-2.5">
					<div
							key={data?.id}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									data?.image?.original?.url
								}
								alt={`${data?.name}--${data?.id}`}
								className="object-cover w-full"
								onError={handleImageError}
								style={{boxShadow:"5px 5px 5px #ccc", maxWidth: "500px"}}
							/>
						</div>
				</div>
			)}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.name}
					</h2>
					<p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{data?.description}
					</p>
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							R$ {parseFloat(data?.price).toFixed(2)}
						</div>
						
					</div>
				</div>
				
				<div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
					
					<Button
						variant="slim"
						value={data?.link}
						className={`w-full md:w-6/12 xl:w-full`}
						onClick={() => handleOpen(data?.link)}
					>
						<span className="py-2 3xl:px-8">COMPRAR</span>
					</Button>
				</div>
				{data?.observacao !== "" &&
				<div style={{marginTop: "10px"}} className="pb-3 border-b border-gray-300">
					<strong>Observação: </strong>{data?.observacao}
				</div>
				}
				

				{/*<ProductMetaReview data={data} />*/}
			</div>
		</div>

		{/* PRODUTOS RELACIONADOS */}
		{relatedProducts.length > 0 &&
		<div className="mb-9 lg:mb-10 xl:mb-14">
			<SectionHeader sectionHeading="Produtos Relacionados" />
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
				{relatedProducts.map((product: any) => (
						<ProductCard
							key={`product--key${product.id}`}
							product={product}
							imgWidth={340}
							imgHeight={440}
							variant="grid"
						/>
				))}	
			</div>
		</div>		
		}


	
		<Dialog open={open} onClose={handleClose}>
		<DialogActions>
			<a href="!#" onClick={handleClose}>
				<AiOutlineCloseSquare />
			</a>
	    </DialogActions>
		<DialogContent>
			<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			
				<div className="text-center mb-9 pt-2.5">
					<div>
						<Logo />
						
					</div>
					<p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
						O Sherlock Caramelus vai levar você até o site onde essa oferta está sendo vendida.
					</p>
				</div>
				
				

				<Button onClick={handleComprar} className="h-11 md:h-12 w-full mt-2">
					Me leve para lá
				</Button>
			
			</div>
			</DialogContent>
		</Dialog>
		</>
		}

		<>
		{show404 &&
		<div>
			<Image
				src="/assets/images/404.svg"
				alt="bunda"
				width={822}
				height={492}
			/>
		</div>
		}
		</>
		</>
		
		
	);
};

export default ProductSingleDetails;
