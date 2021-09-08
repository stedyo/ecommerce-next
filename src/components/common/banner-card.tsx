//import Image from "next/image";
import type { FC } from "react";
import { useWindowSize } from "@utils/use-window-size";
//import cn from "classnames";
import { LinkProps } from "next/link";
import React from "react";


interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	href: LinkProps["href"];
}

function getImage(deviceWidth: number, imgObj: any) {
console.log(deviceWidth)
	if(deviceWidth > 1200){
		return imgObj.desktop
	} else if(deviceWidth > 600 && deviceWidth <= 1200){
		return imgObj.tablet
	} else {
		return imgObj.mobile
	}
}

const handleImageError = (e) => {
	e.target.onerror = null;
    e.target.srcset = `${process.env.NEXT_PUBLIC_URL_DESTAQUES}/default_destaque.png`
}


const BannerCard: FC<BannerProps> = ({
	banner,
	//className,
	//variant = "rounded",
	//effectActive = false,
	//href,
}) => {
	const { width } = useWindowSize();
	const { title, image } = banner;
	const selectedImage = getImage(width, image);

	return (
		<div style={{width: `100%`}}>
			<img
				src={selectedImage.url}
				alt={title}
				onError={handleImageError}
				style={{borderRadius: "20px", objectFit:"cover", width: `${selectedImage.width}px`,  height: `${selectedImage.height}px`}}
				
			/>
		</div>	
			
	
	);
};

export default BannerCard;

