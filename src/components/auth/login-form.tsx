import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useTranslation } from "next-i18next";
import Axios from "axios";
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useState } from "react";

const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	//const { closeModal } = useUI();
	const { mutate: login, isLoading } = useLoginMutation();
	const [message, setMessage] = useState("")

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputType>();

	function onSubmit({ email, password, remember_me }: LoginInputType) {
		login({
			email,
			password,
			remember_me,
		});
		
		
		if(email !== undefined && email !== "" && email !== null  && password !== undefined && password !== "" && password !== null ){
			var md5 = require('md5')
			
			const params = {
				user: email,
				password: md5(password)
			}
			
			Axios.post(process.env.NEXT_PUBLIC_REST_API_ENDPOINT + API_ENDPOINTS.DASHLOGIN, params)
			.then(res => {

		 	if(res.data.message && res.data.message === "dontmatch"){
				setMessage("As credenciais não estão corretas")
			} else if(res.data.id  && res.data.id > 0){
				sessionStorage.setItem('permission','yes')
				window.location.href = '/dashboard'
			} else {
				sessionStorage.setItem('permission','no')
			}

			}).catch(err => {
				// nothing here
				console.log(err)
			})
		}


	}

	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="forms:label-name"
						type="user"
						variant="solid"
						{...register("email")}
						
					/>
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
						})}
					/>
					<div className="flex items-center justify-center">
						{/*
						<div className="flex items-center flex-shrink-0">
							<label className="switch relative inline-block w-10 cursor-pointer">
								<input
									id="remember"
									type="checkbox"
									className="opacity-0 w-0 h-0"
									{...register("remember_me")}
								/>
								<span className="bg-gray-500 absolute inset-0 transition-all duration-300 ease-in slider round"></span>
							</label>
							<label
								htmlFor="remember"
								className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
							>
								{t("forms:label-remember-me")}
							</label>
						</div>
						<div className="flex ms-auto">
							<button
								type="button"
								onClick={handleForgetPassword}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								{t("common:text-forgot-password")}
							</button>
						</div>*/}
					</div>
					<span>{message}</span>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							Entrar
						</Button>
					</div>
				</div>
			</form>
			
			{/*
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
				onClick={handelSocialLogin}
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-facebook")}
			</Button>
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
				onClick={handelSocialLogin}
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button>
			
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-no-account")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{t("common:text-register")}
				</button>
			</div>
			*/}
		</div>
	);
};

export default LoginForm;
