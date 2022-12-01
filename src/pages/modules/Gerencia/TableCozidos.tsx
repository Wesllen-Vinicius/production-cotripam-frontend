import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../../services/API'
import { EditCozidos } from './EditCozidos'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import { formateDate } from '../../../utils/formateDate'
interface Cozidos {
  id: number
  createdAt: Date
  mocoto: number
  culatra: number
  abomaso: number
  fundo: number
  tripa_grossa: number
  tripa_fina: number
  User: { nomeUser: string; cpf: string, Comarca: { nome: string } }
}

export function TableTripaCozida() {
  const [cozidos, setCozidos] = useState<Cozidos[]>([])
  const [value, setValues] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const deleteCozido = async (id: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    })

    swalWithBootstrapButtons
      .fire({
        title: 'Tem certeza que deseja excluir?',
        text: 'Após a exclusão os dados não poderão ser restaurados!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, Confirmo!',
        cancelButtonText: 'Não, desejo Cancelar!',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`cozidos/${id}`).then(() => {
            setValues((c) => c + 1)
          })
          swalWithBootstrapButtons.fire(
            'Deletado!',
            'Os dados foram deletados, não poderão ser restaurados.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Seus arquivos não foram excluidos, fique tranquilo :)',
            'error'
          )
        }
      })
  }

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    const dataInicio = formData.get('dataInicio')
    dataInicio && params.set('dataInicio', dataInicio.toString())

    const dataFim = formData.get('dataFim')
    dataFim && params.set('dataFim', dataFim.toString())

    const termo = formData.get('termo')
    termo && params.set('termo', termo.toString())
    api
      .get<{ count: number; termo: string; cozidos: Cozidos[] }>(
        `cozidos?${params.toString()}`
      )
      .then((res) => {
        const cozidos = res.data.cozidos.map((cozido) => ({
          ...cozido,
          createdAt: new Date(cozido.createdAt),
        }))
        setCozidos(cozidos)
        setTotal(res.data.count)
      })
  }

  const nextDisable = page === total
  const prevDisable = page === 1

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (page < total) {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    api
      .get<{ count: number; cozidos: Cozidos[] }>(`cozidos?page=${page}`)
      .then((res) => {
        const cozidos = res.data.cozidos.map((cozido) => ({
          ...cozido,
          createdAt: new Date(),
        }))
        setCozidos(cozidos)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-[#e2e8f0] p-10 rounded-md shadow-md">
      <form onSubmit={onSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              name="termo"
              type="text"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#0687b7] focus:border-[#0687b7] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0687b7] dark:focus:border-[#0687b7]"
              placeholder="Filtrar"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-[#0687b7]  font-medium rounded-lg text-sm px-4 py-2 "
            >
              Buscar
            </motion.button>
          </div>

          <div className=" relative pt-2 md:pt-0 md:pl-2">
            <input
              name='dataInicio'
              type="date"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#0687b7] focus:border-[#0687b7] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0687b7] dark:focus:border-[#0687b7]"
            />
          </div>

          <div className="pt-2 md:pl-2 md:pt-0">
            <input
              name='dataFim'
              type="date"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#0687b7] focus:border-[#0687b7] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0687b7] dark:focus:border-[#0687b7]"
            />
          </div>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-2 py-3">
                ID
              </th>
              <th scope="col" className="px-2 py-3">
                mocoto
              </th>
              <th scope="col" className="px-2 py-3">
                culatra
              </th>
              <th scope="col" className="px-2 py-3">
                abomaso
              </th>
              <th scope="col" className="px-2 py-3">
                fundo
              </th>
              <th scope="col" className="px-2 py-3">
                tripa grossa
              </th>
              <th scope="col" className="px-2 py-3">
                tripa fina
              </th>
              <th scope="col" className="px-2 py-3">
                NOME_COMARCA
              </th>
              <th scope="col" className="px-2 py-3">
                NOME_RESPONSAVEL
              </th>
              <th scope="col" className="px-2 py-3">
                CPF_RESPONSAVEL
              </th>
              <th scope="col" className="px-2 py-3">
                Criado em
              </th>
              <th scope="col" className="px-2 py-3">
                ações
              </th>
            </tr>
          </thead>
          <tbody>
            {cozidos.map((cozido) => {
              return (
                <tr
                  key={cozido.id}
                  className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.mocoto}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.culatra}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.abomaso}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.fundo}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.tripa_grossa}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.tripa_fina}
                  </td>
                  <td
                    scope="row"
                    className="text-center px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.User.Comarca.nome}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.User.nomeUser}
                  </td>
                  <td
                    scope="row"
                    className="text-center px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.User.cpf}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {formateDate(cozido.createdAt)}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <EditCozidos id={cozido.id} />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="pl-5"
                      onClick={() => deleteCozido(cozido.id)}
                    >
                      <img
                        src="/src/assets/icons/delete-content.svg"
                        width={20}
                      />
                    </motion.button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-center pb-2 bg-gray-300 dark:bg-gray-900">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              disabled={prevDisable}
              onClick={handlePrev}
              className="disabled:bg-slate-600 py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Anterior
            </button>

            <button
              disabled={nextDisable}
              onClick={handleNext}
              className="disabled:bg-slate-600  py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Proximo
            </button>
          </div>
          <div className="inline-flex mt-2 xs:mt-0">
            <label className="disabled:bg-stone-700  py-2 px-4 text-sm font-medium text-white bg-gray-600 rounded-l border-gray-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
              {page}
            </label>
            <label className="disabled:bg-stone-700  py-2 px-2 text-sm font-medium text-white bg-gray-500 rounded-0 border-gray-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
              -
            </label>
            <label className="disabled:bg-stone-700  py-2 px-4 text-sm font-medium text-white bg-gray-600 rounded-r border-gray-700  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
              {total}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
