import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { GiClick } from "react-icons/gi";
import { LinkProps } from "next/link";
import { useTranslation } from "next-i18next";

interface Props {
	item: any;
	variant?: "rounded" | "circle";
	size?: "small" | "medium";
	effectActive?: boolean;
	href: LinkProps["href"];
}





const Card: React.FC<Props> = ({
	item,
	variant = "circle",
	size = "small",
	effectActive = false,
	href,
}) => {

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.srcset = `${process.env.NEXT_PUBLIC_URL_CATEGORIAS}/default.png`
	}
	

	


	const { name, image } = item ?? {};
	const imageSize: any =
		(size === "small" && 140) || (size === "medium" && 155);

	const placeholderImage = `/assets/placeholder/card-${size}.svg`;
	const { t } = useTranslation("common");
	return (
		<Link
			href={href}
			className="group flex justify-center text-center flex-col"
		>
			<div
				className={`relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto ${
					variant === "rounded" ? "rounded-md" : "rounded-full"
				}`}
			>
				<div className="flex">
					<Image
						src={image?.original ?? placeholderImage}
						alt={name || t("text-card-thumbnail")}
						width={imageSize}
						height={imageSize}
						quality={100}
						onError={handleImageError}
						className={`object-cover bg-gray-300 ${
							variant === "rounded" ? "rounded-md" : "rounded-full"
						}`}
					/>
				</div>
				{effectActive === true && (
					<>
						<div
							className={`absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30 ${
								variant === "rounded" ? "rounded-md" : "rounded-full"
							}`}
						/>
						<div className="absolute top left h-full w-full flex items-center justify-center">
							<GiClick className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
						</div>
					</>
				)}
			</div>
			<Text variant="heading" className="capitalize">
				{name}
			</Text>
		</Link>
	);
};

export default Card;
