import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import { getDirection } from "@utils/get-direction";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return await Document.getInitialProps(ctx);
	}
	render() {
		const { locale } = this.props.__NEXT_DATA__;
		if (process.env.NODE_ENV !== "production") {
			i18n!.reloadResources(locale);
		}
		return (
			<Html dir={getDirection(locale)}>
				<Head>
				{/*<!-- Global site tag (gtag.js) - Google Analytics -->*/}
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-YMWRY1711T" />
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '[Tracking ID]', { page_path: window.location.pathname });
							`,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
