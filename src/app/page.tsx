import Banner from '@/components/Banner';
import Nosotros from '@/components/Nosotros';
import Productos from '@/components/Productos';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<main className="min-h-screen">
			<Header />
			<Banner />
			<Nosotros />
			<Productos />
			<Footer />
		</main>
	);
}
