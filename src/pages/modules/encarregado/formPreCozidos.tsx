import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'
import { motion } from 'framer-motion'
import { formateDate } from '../../../utils/formateDate'
import { useAuth } from '../../context/AuthContext'
interface Cozidos {
  id: number
  createdAt: Date
  mocoto: number
  culatra: number
  abomaso: number
  fundo: number
  tripa_grossa: number
  tripa_fina: number
}

interface FormValues {
  mocoto: number
  culatra: number
  abomaso: number
  fundo: number
  tripa_grossa: number
  tripa_fina: number
}

export function FormTripaCozida() {
  const { user } = useAuth()

  const userId = user?.id

  const validationSchema = Yup.object().shape({
    mocoto: Yup.number().required('Mocoto é Obrigatorio.'),
    culatra: Yup.number().required('Culatra é Obrigatorio.'),
    abomaso: Yup.number().required('Abomaso é obrigatorio.'),
    fundo: Yup.number().required('Fundo é Obrigatorio.'),
    tripa_grossa: Yup.number().required('Tripa Grossa é Obrigatorio.'),
    tripa_fina: Yup.number().required('Tripa Fina é Obrigatorio.'),
  })

  const [cozidos, setCozidos] = useState<Cozidos[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValues] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {
      mocoto: 0,
      culatra: 0,
      abomaso: 0,
      fundo: 0,
      tripa_grossa: 0,
      tripa_fina: 0,
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post('cozidos', {
          mocoto: Number(data.mocoto),
          culatra: Number(data.culatra),
          abomaso: Number(data.abomaso),
          fundo: Number(data.fundo),
          tripa_grossa: Number(data.tripa_grossa),
          tripa_fina: Number(data.tripa_fina),
          userUID: userId,
        })
        .then((e: any) => {
          setValues((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: 'Registro de Pré Cozidos realizado com sucesso!',
          })
        })
        .catch((e: any) =>
          Notification.fire({
            icon: 'error',
            title: e.message,
          })
        )
    },
  })

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
      .get<{ count: number; cozidos: Cozidos[] }>(
        `cozidos/getCozidoByUser?userId=${userId}&?page=${page}`
      )
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
    <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Mocoto
            </label>
            <input
              value={formik.values.mocoto}
              {...register('mocoto')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.mocoto ? formik.errors.mocoto : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Culatra
            </label>
            <input
              value={formik.values.culatra}
              {...register('culatra')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.culatra ? formik.errors.culatra : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Abomaso
            </label>
            <input
              value={formik.values.abomaso}
              {...register('abomaso')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.abomaso ? formik.errors.abomaso : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Fundo/Seco
            </label>
            <input
              value={formik.values.fundo}
              {...register('fundo')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.fundo ? formik.errors.fundo : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Tripa Grossa
            </label>
            <input
              value={formik.values.tripa_grossa}
              {...register('tripa_grossa')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.tripa_grossa ? formik.errors.tripa_grossa : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Tripa Fina
            </label>
            <input
              value={formik.values.tripa_fina}
              {...register('tripa_fina')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.tripa_fina ? formik.errors.tripa_fina : null}
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                MOCOTO
              </th>
              <th scope="col" className="px-6 py-3">
                CULATRA
              </th>
              <th scope="col" className="px-6 py-3">
                ABOMASO
              </th>
              <th scope="col" className="px-6 py-3">
                FUNDO
              </th>
              <th scope="col" className="px-6 py-3">
                TRIPA GROSSA
              </th>
              <th scope="col" className="px-6 py-3">
                TRIPA FINA
              </th>
              <th scope="col" className="px-6 py-3">
                CRIADO EM
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cozido.id}
                  </th>
                  <td className="px-6 py-4">{cozido.mocoto}</td>
                  <td className="px-6 py-4">{cozido.culatra}</td>
                  <td className="px-6 py-4">{cozido.abomaso}</td>
                  <td className="px-6 py-4">{cozido.fundo}</td>
                  <td className="px-6 py-4">{cozido.tripa_grossa}</td>
                  <td className="px-6 py-4">{cozido.tripa_fina}</td>
                  <td className="px-6 py-4">{formateDate(cozido.createdAt)}</td>
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
