export const CarouselComponent = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide relative mt-16"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner relative w-full overflow-hidden rounded-lg">
        <div className="carousel-item active relative float-left w-full">
          <img
            src="/src/assets/matriz2.jpg"
            className="block h-[600px] w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl">Matriz COTRIPAM 2022</h5>
            <p>
              Foto panorâmica da matriz, localizada em Senador Guiomard, AC - RO{' '}
            </p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src="/src/assets/mocotoBovino.jpg"
            className="block h-[600px] w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl">Motocó Bovino</h5>
            <p>Produzido pro profissionais, já fatiados e limpos.</p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src="/src/assets/abomasoCongelado.jpg"
            className="block h-[600px] w-full"
            alt="..."
          />
          <div className="carousel-caption hidden md:block absolute text-center">
            <h5 className="text-xl">Abomaso Congelado</h5>
            <p>Otima escolha para uma dobradinha, ou uma penelada.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
