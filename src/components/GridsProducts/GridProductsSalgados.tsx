
const product = {
  name: 'Salgados',
  breadcrumbs: [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Produtos' },
  ],
  images: [
    {
      src: '/src/assets/tripaFinaSalgada.jpg',
      alt: 'Serosa Após o tratamento, salgada para transporte e tratamento futuro.',
    },
    {
      src: '/src/assets/producao1.jpg',
      alt: 'Amostra de serosa para comparação de metragem',
    },
    {
      src: '/src/assets/picotado-salgadojpeg.jpeg',
      alt: 'Serosa transformada em fio no seu primeiro estagio de fio de sultura.',
    },
    {
      src: '/src/assets/tripaGrossa2.jpg',
      alt: 'Serosa transformada em fio no seu primeiro estagio de fio de sultura.',
    },
  ],
  description:
    'Produtos salgados, podem ser mantidos congelados e em temperatura ambiente, o sal conserva o produto por até 6 meses no seu estado perfeito.',
  highlights: [
    'Tratado com produtos de primeira linha.',
    'Todas as nossas instalações são tratadas e mantidas com o padrão SIF.',
    'Todas as instalações contam com maquinarios contruidos em Inox para manter o melhor padrão de qualidade e higiene.',
    '100% derivado animal.',
  ]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function GridSalgados() {

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-[#e2e8f0] p-2 rounded-md shadow-md">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-2 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[1].src}
              alt={product.images[1].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="h-80 w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="h-80 w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Informações do produto</h2>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900"> <img src="/src/assets/logo-unfilled-w-b-text.svg" width={190} /></h3>
              <div className="flex items-center">
              </div>
            </div>

            <form className="mt-10">

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">-Informações</h3>
                </div>
                <div className="overflow-x-auto relative mt-5">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Sal
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Tipo
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Categoria
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Fino
                        </th>
                        <td className="py-4 px-6">
                          Bovino
                        </td>
                        <td className="py-4 px-6">
                          Comestível
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Destaques deste nosso produto</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
