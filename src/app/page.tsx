import Banner from '@/components/Banner';
import Nosotros from '@/components/Nosotros';
import Productos from '@/components/Productos';
import Tiendas from '@/components/Tiendas';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Formulario from '@/components/Formulario';
import Marcas from '@/components/Marcas';

export default function Home() {
	return (
		<main className="min-h-screen">
			<Header />
			<Banner />
			<Nosotros />
			<Productos />
			<Tiendas />
			<Formulario />
			<Marcas />
			<Footer />
		</main>
	);
}
