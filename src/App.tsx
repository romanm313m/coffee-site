import { About } from './components/About';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <About />
      </main>
      <Footer />
    </>
  );
}
