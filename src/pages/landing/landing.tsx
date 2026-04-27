import BestDeals from './Best-Deals/best-deals';
import Categories from './Categories/categories';
import FeaturedSection from './Featured-section/featured-section';
import Hero from './Hero/hero';

export default function Landing() {
  return (
    <main className="pt-6">
      <div className="w-[70%] mx-auto">
        <Hero />
        <BestDeals />
        <Categories />
        <FeaturedSection/>
      </div>
    </main>
  );
}
