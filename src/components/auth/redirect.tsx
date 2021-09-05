import Button from "@components/ui/button";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";




const Redirect = () => {
	
	const { closeModal } = useUI();
	

	
	return (
		<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-9 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
					O Sherlock Caramelus vai levar você até o site onde essa oferta está sendo vendida.
				</p>
			</div>
			
			

			<Button className="h-11 md:h-12 w-full mt-2">
				Me leve para lá
			</Button>
		
		</div>
	);
};

export default Redirect;
