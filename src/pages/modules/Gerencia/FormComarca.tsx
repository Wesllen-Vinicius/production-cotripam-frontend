import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { api } from '../../../services/API'
import { formateDate } from '../../../utils/formateDate'
import { Notification } from '../../../utils/Notification'
import { EditComarca } from './EditComarcas'
interface FormValues {
  nome: string
  meta_preCozido: number
  meta_serosa: number
  cidade_estado: string
}

interface Comarcas {
  id: string
  nome: string
  createdAt: Date
  modifiAt: Date
  cidade_estado: string
  meta_preCozido: number
  meta_serosa: number
}

export function FormUnidades() {
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome da Comarca é Obrigatorio.'),
    meta_preCozido: Yup.number().required('Meta de Pré Cozidos é Obrigatorio.'),
    meta_serosa: Yup.number().required('Meta de Serosa é Obrigatorio.'),
    cidade_estado: Yup.string().required(
      'Nome da Cidade e Abreviação do estado é Obrigatorio.'
    ),
  })

  const [comarcas, setComarcas] = useState<Comarcas[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValue] = useState(0)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const formik = useFormik({
    initialValues: {
      nome: '',
      meta_preCozido: 0,
      meta_serosa: 0,
      cidade_estado: '',
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post(`unidades`, {
          nome: String(data.nome),
          meta_preCozido: Number(data.meta_preCozido),
          meta_serosa: Number(data.meta_serosa),
          cidade_estado: String(data.cidade_estado),
        })
        .then(() => {
          setValue((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: `Comarca Cadastrada`,
          })
        })
        .catch((e) =>
          Notification.fire({
            icon: 'error',
            title: e.message,
          })
        )
    },
  })

  const deleteComarca = async (id: string) => {
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
          await api.delete(`unidades/${id}`).then(() => {
            setValue((c) => c + 1)
          })
          swalWithBootstrapButtons.fire(
            'Deletado!',
            'Os dados foram deletados, não poderão ser restaurados.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
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
    const form = new FormData(event.currentTarget)
    api
      .get<{ count: number; termo: string; unidades: Comarcas[] }>(
        `unidades?termo=${form.get('termo')}`
      )
      .then((res) => {
        const comarcas = res.data.unidades.map((comarca) => ({
          ...comarca,
          createdAt: new Date(comarca.createdAt),
          modifiAt: new Date(comarca.modifiAt),
        }))
        setComarcas(comarcas)
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
      .get<{ count: number; unidades: Comarcas[] }>(`unidades?page=${page}`)
      .then((res) => {
        const comarcas = res.data.unidades.map((comarca) => ({
          ...comarca,
          createdAt: new Date(comarca.createdAt),
          modifiAt: new Date(comarca.modifiAt),
        }))
        setComarcas(comarcas)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white dark:bg-[#e2e8f0] p-16 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Nome da Comarca
              </label>
              <input
                value={formik.values.nome}
                {...register('nome')}
                onChange={formik.handleChange}
                type="text"
                id="nomeUnidade"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.nome ? formik.errors.nome : null}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Meta Serosa
              </label>
              <input
                value={formik.values.meta_serosa}
                {...register('meta_serosa')}
                onChange={formik.handleChange}
                type="number"
                id="nomeUnidade"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.meta_serosa ? formik.errors.meta_serosa : null}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Meta Pré Cozidos
              </label>
              <input
                value={formik.values.meta_preCozido}
                {...register('meta_preCozido')}
                onChange={formik.handleChange}
                type="number"
                id="nomeUnidade"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.meta_preCozido
                  ? formik.errors.meta_preCozido
                  : null}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Cidade e Estado - Comarca
              </label>
              <input
                value={formik.values.cidade_estado}
                {...register('cidade_estado')}
                onChange={formik.handleChange}
                type="text"
                id="total"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.cidade_estado
                  ? formik.errors.cidade_estado
                  : null}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="text-white mt-5 bg-[#199f53] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Cadastrar
            </motion.button>
          </div>
        </form>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <div className=" p-5 bg-gray-300 dark:bg-gray-900">
            <form onSubmit={onSearch}>
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
            </form>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  ID
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Nome da comarca
                </th>
                <th scope="col" className="px-6 py-3">
                  cidade/estado
                </th>
                <th scope="col" className="px-6 py-3">
                  meta serosa
                </th>
                <th scope="col" className="px-6 py-3">
                  meta pré cozido
                </th>
                <th scope="col" className="px-6 py-3">
                  CRIADO EM
                </th>
                <th scope="col" className="px-6 py-3">
                  ações
                </th>
              </tr>
            </thead>
            <tbody>
              {comarcas.map((comarca) => {
                return (
                  <tr
                    key={comarca.id}
                    className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {comarca.nome}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {comarca.cidade_estado}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {comarca.meta_serosa}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {comarca.meta_preCozido}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {formateDate(comarca.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <EditComarca id={comarca.id} />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="pl-2"
                        onClick={() => deleteComarca(comarca.id)}
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
    </>
  )
}
