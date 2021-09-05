import Image from "next/image";
import type { FC } from "react";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";
import React from "react";


interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	classNameInner?: string;
	href: LinkProps["href"];
}

function getImage(deviceWidth: number, imgObj: any) {
	return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const handleImageError = (e: { target: { onerror: null; srcset: string; }; }) => {
	e.target.onerror = null;
    e.target.srcset = `${process.env.NEXT_PUBLIC_URL_DESTAQUES}/default_destaque.png`
}


const BannerCard: FC<BannerProps> = ({
	banner,
	className,
	variant = "rounded",
	effectActive = false,
	href,
}) => {
	const { width } = useWindowSize();
	const { title, image } = banner;
	const selectedImage = getImage(width, image);

	return (
		<div className={cn("mx-auto", className)}>
		
				<Image
					src={selectedImage.url}
					width={selectedImage.width}
					height={selectedImage.height}
					alt={title}
					onError={handleImageError}
					quality={100}
					className={cn("bg-gray-300 object-cover w-full", {
						"rounded-md": variant === "rounded",
					})}
				/>
				{effectActive && (
					<div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
				)}
			
		</div>
	);
};

export default BannerCard;
function classNameInner(arg0: string, classNameInner: any): string | undefined {
	throw new Error("Function not implemented.");
}

