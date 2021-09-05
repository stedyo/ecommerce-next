import Link from "next/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { Category } from "@framework/types";
import { useTranslation } from "next-i18next";
import { ROUTES } from "@utils/routes";
import router from "next/router";

interface Props {
	category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
	
	const handleImageError = (e: { target: { onerror: null; srcset: string; }; }) => {
		e.target.onerror = null;
		e.target.srcset = `${process.env.NEXT_PUBLIC_URL_PRODUCTS}/error.png`
	}
	
	const { name, products } = category;
	const { t } = useTranslation("common");

	const handleProductView = (product_id: any) =>{
		
		if(product_id !== "" && product_id !== null && product_id > 0){
			router.push(`${ROUTES.PRODUCT}/${product_id}`)
		}
		
	}
	
	return (
		
		<div className="flex flex-col border border-gray-300 rounded-lg p-4 lg:p-5 xl:p-7">
			<Text
				variant="heading"
				className="capitalize -mt-0.5 lg:-mt-1 xl:-mt-0 mb-2.5 lg:mb-3.5"
			>
				{name}
			</Text>
			
			<div className="grid grid-cols-3 gap-2.5 xl:gap-3">
				{products?.slice(0, 3)?.map((product) => (
					
						<a className="flex rounded-md overflow-hidden" onClick={() => handleProductView(product?.id)}>
							<Image
								src={
									product?.image?.original ??
									"/assets/placeholder/products/product-cat.svg"
								}
								alt={name || t("text-category-thumbnail")}
								width={165}
								height={165}
								onError={handleImageError}
								className="bg-gray-300 object-cover rounded-md transition duration-300 ease-in-out transform hover:scale-110"
								
							/>
						</a>
					
				))}
			</div>
			
		</div>
		
	);
};

export default CategoryCard;
