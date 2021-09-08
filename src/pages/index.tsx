import Container from "@components/ui/container";
import CategoryGridBlock from "@containers/category-grid-block";
import Divider from "@components/ui/divider";
import Subscription from "@components/common/subscription";
import HeroBlock from "@containers/hero-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import Instagram from "@components/common/instagram";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { homeOneBanner as banner } from "@framework/static/banner";



export default function Home() {




	return (
		<>
			<HeroBlock />
			<Container>
				{/* 
					is_top_banner === 1
					ultimos adicionados no instagram
				*/}
				<CategoryBlock sectionHeading="" />


				{/* 
					maior_comissao === 1 
					limitados aos 6 ultimos adicionados
				*/}
				<Instagram />
				
				<br />
				<br />
			

				<img
					src="/assets/images/banner/banner-1.png"
					alt={banner.title}
					style={{borderRadius: "10px"}}
				/>

				
				<br />
				<br />

				{/* ultimos 15 produtos adicionados --- ? */}
				<BestSellerProductFeed />

				<Divider />

				{/* ultimos adicionados dessas categorias específicas */}
				<CategoryGridBlock sectionHeading="text-featured-categories" />

				<Subscription className="bg-linen px-5 sm:px-8 md:px-16 2xl:px-24" />
				<br />
			</Container>
		</>
	);
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {

	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
		revalidate: 60,
	};
};
