import { ILFlag } from "@components/icons/ILFlag";
import { SAFlag } from "@components/icons/SAFlag";
import { CNFlag } from "@components/icons/CNFlag";
import { USFlag } from "@components/icons/USFlag";
import { DEFlag } from "@components/icons/DEFlag";
import { ESFlag } from "@components/icons/ESFlag";
export const siteSettings = {
	name: "Caramelu's Inc",
	description:
		"O Sherlock Pet da Web",
	author: {
		name: "Caramelus Inc.",
		websiteUrl: "https://caramelusinc.com.br",
		address: "",
	},
	logo: {
		url: "/assets/images/carameluslogo.png",
		alt: "Caramelus",
		href: "/",
		width: 250,
		height: 77,
	},
	defaultLanguage: "pt",
	currencyCode: "USD",
	site_header: {
		menu: [
			{
				id: 1,
				path: "/category/cachorros",
				label: "menu-dogs",
				subMenu: [
					{
						id: 3,
						path: "/category/cachorros?category=acessorios",
						label: "menu-dog-acessorios",
					},
					{
						id: 5,
						path: "/category/cachorros?category=beleza",
						label: "menu-dog-beleza",
					},
					{
						id: 2,
						path: "/category/cachorros?category=brinquedos",
						label: "menu-dog-brinquedos",
					},
					{
						id: 6,
						path: "/category/cachorros?category=casa",
						label: "menu-dog-camas"
					},
					{
						id: 7,
						path: "/category/cachorros?category=racoes",
						label: "menu-dog-racoes"
					},
					{
						id: 1,
						path: "/category/cachorros?category=roupas",
						label: "menu-dog-looks",
					},
					{
						id: 4,
						path: "/category/cachorros?category=servicos",
						label: "menu-dog-servicos",
					}
				],
			},
			{
				id: 2,
				path: "/category/gatos",
				label: "menu-cats",
				subMenu: [
					{
						id: 3,
						path: "/category/gatos?category=acessorios",
						label: "menu-cat-acessorios",
					},
					{
						id: 5,
						path: "/category/gatos?category=beleza",
						label: "menu-cat-beleza",
					},
					{
						id: 2,
						path: "/category/gatos?category=brinquedos",
						label: "menu-cat-brinquedos",
					},
					{
						id: 6,
						path: "/category/gatos?category=casa",
						label: "menu-cat-camas"
					},
					{
						id: 7,
						path: "/category/gatos?category=racoes",
						label: "menu-cat-racoes"
					},
					{
						id: 1,
						path: "/category/gatos?category=roupas",
						label: "menu-cat-looks",
					},
					
					
					{
						id: 4,
						path: "/category/gatos?category=servicos",
						label: "menu-cat-servicos",
					},
					
					
					
				],
			},
			{
				id: 3,
				path: "/category/peixes",
				label: "menu-fishes",
				subMenu: [
					{
						id: 1,
						path: "/category/peixes?category=aquarios",
						label: "menu-fish-aquarios",
					},
					{
						id: 3,
						path: "/category/peixes?category=alimentacao",
						label: "menu-fish-alimentacao",
					},
					{
						id: 2,
						path: "/category/peixes?category=acessorios",
						label: "menu-fish-acessorios",
					},
				
					
				],
			},
			{
				id: 4,
				path: "/category/outros",
				label: "menu-outros",
			},
			{
				id: 5,
				path: "/category/lovers",
				label: "menu-lovers",
			},
			
		
		],
		mobileMenu: [
			{
				id: 1,
				path: "/category/cachorros",
				label: "menu-dogs",
				subMenu: [
					
					{
						id: 3,
						path: "/category/cachorros?category=acessorios",
						label: "menu-dog-acessorios",
					},
					{
						id: 5,
						path: "/category/cachorros?category=beleza",
						label: "menu-dog-beleza",
					},
					{
						id: 2,
						path: "/category/cachorros?category=brinquedos",
						label: "menu-dog-brinquedos",
					},
					{
						id: 6,
						path: "/category/cachorros?category=casa",
						label: "menu-dog-camas"
					},
					{
						id: 7,
						path: "/category/cachorros?category=racoes",
						label: "menu-dog-racoes"
					},
					{
						id: 1,
						path: "/category/cachorros?category=roupas",
						label: "menu-dog-looks",
					},
					{
						id: 4,
						path: "/category/cachorros?category=servicos",
						label: "menu-dog-servicos",
					}
				],
			},
			{
				id: 2,
				path: "/category/gatos",
				label: "menu-cats",
				subMenu: [
					{
						id: 3,
						path: "/category/gatos?category=acessorios",
						label: "menu-cat-acessorios",
					},
					{
						id: 5,
						path: "/category/gatos?category=beleza",
						label: "menu-cat-beleza",
					},
					{
						id: 2,
						path: "/category/gatos?category=brinquedos",
						label: "menu-cat-brinquedos",
					},
					{
						id: 6,
						path: "/category/gatos?category=casa",
						label: "menu-cat-camas"
					},
					{
						id: 7,
						path: "/category/gatos?category=racoes",
						label: "menu-cat-racoes"
					},
					{
						id: 1,
						path: "/category/gatos?category=roupas",
						label: "menu-cat-looks",
					},
					
					
					{
						id: 4,
						path: "/category/gatos?category=servicos",
						label: "menu-cat-servicos",
					},
					
				],
			},
			{
				id: 3,
				path: "/category/peixes",
				label: "menu-fishes",
				subMenu: [
					{
						id: 1,
						path: "/category/peixes?category=aquarios",
						label: "menu-fish-aquarios",
					},
					{
						id: 3,
						path: "/category/peixes?category=alimentacao",
						label: "menu-fish-alimentacao",
					},
					{
						id: 2,
						path: "/category/peixes?category=acessorios",
						label: "menu-fish-acessorios",
					},
					
				],
			},
			{
				id: 4,
				path: "/category/outros",
				label: "menu-outros",
			},
			{
				id: 5,
				path: "/category/lovers",
				label: "menu-lovers",
			},
		],
	
		languageMenu: [
			{
				id: "ar",
				name: "عربى - AR",
				value: "ar",
				icon: <SAFlag width="20px" height="15px" />,
			},
			{
				id: "zh",
				name: "中国人 - ZH",
				value: "zh",
				icon: <CNFlag width="20px" height="15px" />,
			},
			{
				id: "en",
				name: "English - EN",
				value: "en",
				icon: <USFlag width="20px" height="15px" />,
			},
			{
				id: "de",
				name: "Deutsch - DE",
				value: "de",
				icon: <DEFlag width="20px" height="15px" />,
			},
			{
				id: "he",
				name: "rעברית - HE",
				value: "he",
				icon: <ILFlag width="20px" height="15px" />,
			},
			{
				id: "es",
				name: "Español - ES",
				value: "es",
				icon: <ESFlag width="20px" height="15px" />,
			},
		],
	},
};
