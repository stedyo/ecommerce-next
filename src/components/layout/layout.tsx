import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";

/*import Footer from "@components/layout/footer/footer";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";*/

const Layout: React.FC = ({ children }) => {
	//const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	//const { t } = useTranslation("common");
	return (
		<div className="flex flex-col min-h-screen">
			
			<NextSeo
				additionalMetaTags={[
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0",
					},
				]}
				title="Caramelus Inc"
				description="O Sherlock Pet da Web"
				canonical="https://www.caramelusinc.com.br/"
				openGraph={{
					url: "https://www.caramelusinc.com.br",
					title: "Caramelus Inc",
					description:
						"O Sherlock Pet da Web",
					images: [
						{
							url: "/assets/images/carameluslogo.png",
							width: 800,
							height: 600,
							alt: "Caramelus",
						},
						{
							url: "/assets/images/carameluslogo.png",
							width: 900,
							height: 800,
							alt: "Caramelus",
						},
					],
				}}
			/>
			<Header />
			
			<main
				className="relative flex-grow"
				style={{
					minHeight: "-webkit-fill-available",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{children}
			</main>
			<br />
			<MobileNavigation />
			{/*<Footer />
			
			
			<Search />
			
			<CookieBar
				title={t("text-cookies-title")}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{t("text-accept-cookies")}
					</Button>
				}
			/>*/}
		</div>
	);
};

export default Layout;
