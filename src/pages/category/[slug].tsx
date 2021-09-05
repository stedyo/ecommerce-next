import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import StickyBox from "react-sticky-box";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import ActiveLink from "@components/ui/active-link";
import { ShopFilters } from "@components/shop/filters";
//import SearchTopBar from "@components/shop/top-bar";
import Subscription from "@components/common/subscription";
import { ProductGrid } from "@components/product/product-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBanner from "@containers/category-banner";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Category() {
	const { query } = useRouter();


	/* produtos com filtro */
	return (
		<div className="border-t-2 border-borderBottom">
			<Container>
				<CategoryBanner />
			
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<div className="pb-7">
							
								<BreadcrumbItems separator="/">
									<ActiveLink
										href={"/"}
										activeClassName="font-semibold text-heading"
									>
										<a>Home</a>
									</ActiveLink>
									<ActiveLink
										href={query.slug}
										activeClassName="font-semibold text-heading"
									>
										<a className="capitalize"><strong>{query.slug}</strong></a>
									</ActiveLink>
								</BreadcrumbItems>
							</div>
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">
						{/*<SearchTopBar />*/}
						<ProductGrid />
					</div>
				</div>



				<Subscription />
			</Container>
		</div>
	);
}

Category.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
