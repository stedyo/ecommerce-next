import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
const LoginForm = dynamic(() => import("@components/auth/login-form"));
const Redirect = dynamic(() => import("@components/auth/redirect") )
const ForgetPasswordForm = dynamic(
	() => import("@components/auth/forget-password-form")
);
//const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "LOGIN_VIEW" && <LoginForm />}
			{modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
			{modalView === "NEWSLETTER_VIEW" && <Newsletter />}
			{modalView === "REDIRECT" && <Redirect />}
		</Modal>
	);
};

export default ManagedModal;
