import Image from "next/image";
import { useRouter } from "next/router";
//import { getDirection } from "@utils/get-direction";
interface CategoryBannerProps {
	className?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
	className = "mb-7",
}) => {
	//const { locale } = useRouter();
	//const dir = getDirection(locale);
	const {
		query: { slug },
	} = useRouter();

	const categoryTitle = slug?.toString().split("-").join("");
	

	let banner = ""
	
	if(slug == "cachorros"){
		banner = "/assets/images/banner-dog.png"
	} else if(slug == "gatos"){
		banner = "/assets/images/banner-cat.png"
	} else if(slug == "peixes"){
		banner = "/assets/images/banner-fish.png"
	} else if(slug == "outros"){
		banner = "/assets/images/banner-outros.png"
	} else if(slug == "lovers"){
		banner = "/assets/images/banner-lovers.png"
	} else {
		banner = "/assets/images/banner-error.png"
	}



	return (
		<>
		<br />
		<div
			className={`bg-gray-200 rounded-md relative flex flex-row ${className}`}
		>
			
			<div className="hidden md:flex">
				<Image
					src={banner}
					alt="Category Banner"
					width={1800}
					height={570}
					className="rounded-md"
				/>
			</div>
			<div className="relative md:absolute top-0 start-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
				<h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full">
					#{categoryTitle}
				</h2>
			</div>
		</div>
	 </>
	);
};

export default CategoryBanner;
