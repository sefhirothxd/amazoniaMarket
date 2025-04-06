import { redirect } from 'next/navigation';

const Page = () => {
	// Redirecciona a /intranet/panel
	redirect('/intranet/panel');

	// Este código no se ejecutará
	return <div>Redireccionando...</div>;
};

export default Page;
