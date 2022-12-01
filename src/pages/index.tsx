import { CarouselComponent } from '../components/Carousel'
import GerenteSection from '../components/GerenteSection'
import { TabsProducts } from '../components/GridsProducts/TabsProducts'

export default function Home() {
  return (
    <>
      <div className="h-auto">
        <CarouselComponent />
        <TabsProducts />
        {/* <GridProducts /> */}
        <GerenteSection />
      </div>
    </>
  )
}
