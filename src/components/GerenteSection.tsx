export default function GerenteSection() {
  return (
    <section className="bg-slate-200 dark:bg-[#1f2937] mt-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            CEO`S
          </h2>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
            <a>
              <img
                className="w-80 rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="/src/assets/images-home/jose-severino-perfil.jpg"
                alt="Jese Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a>José Severino</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">CEO</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Brasileiro, pernambucano
              </p>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-900 dark:border-gray-700">
            <a>
              <img
                className="w-60 rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="/src/assets/images-home/User-Profile-PNG.png"
                alt="Jese Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a>Vitor</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">CEO</span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Prefere se manter anonimo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
