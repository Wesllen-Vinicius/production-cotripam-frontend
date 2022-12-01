import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'
import { motion } from 'framer-motion'
import { formateDate } from '../../../utils/formateDate'
import { useAuth } from '../../context/AuthContext'

interface Serosas {
  id: number
  createdAt: Date
  corte_630: number
  corte_470: number
  corte_320: number
  corte_170: number
  kmtotal: number
  media: number
}

interface FormValues {
  corte_630: number
  corte_470: number
  corte_320: number
  corte_170: number
}

export function FormSerosa() {
  const { user } = useAuth()

  const userId = user?.id

  const validationSchema = Yup.object().shape({
    corte_630: Yup.number().required('Corte 630 é obrigatório.'),
    corte_470: Yup.number().required('Corte 470 é obrigatório.'),
    corte_320: Yup.number().required('Corte 320 é obrigatório.'),
    corte_170: Yup.number().required('Corte 170 é obrigatório.'),
  })

  const [serosas, setSerosas] = useState<Serosas[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {
      corte_630: 0,
      corte_470: 0,
      corte_320: 0,
      corte_170: 0,
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post(`serosa`, {
          corte_630: Number(data.corte_630),
          corte_470: Number(data.corte_470),
          corte_320: Number(data.corte_320),
          corte_170: Number(data.corte_170),
          userId: userId,
        })
        .then((e: any) => {
          setValue((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: 'Registro de serosa cadastrado!',
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
      .get<{ count: number; serosas: Serosas[] }>(
        `serosa/getSerosaByUser?userId=${userId}&?page=${page}`
      )
      .then((res) => {
        const serosas = res.data.serosas.map((serosa) => ({
          ...serosa,
          createdAt: new Date(),
        }))
        setSerosas(serosas)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Corte 630
            </label>
            <input
              type="number"
              value={formik.values.corte_630}
              {...register('corte_630')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.corte_630 ? formik.errors.corte_630 : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Corte 470
            </label>
            <input
              value={formik.values.corte_470}
              {...register('corte_470')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.corte_470 ? formik.errors.corte_470 : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Corte 320
            </label>
            <input
              value={formik.values.corte_320}
              {...register('corte_320')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.corte_320 ? formik.errors.corte_320 : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Corte 170
            </label>
            <input
              value={formik.values.corte_170}
              {...register('corte_170')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.corte_170 ? formik.errors.corte_170 : null}
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
                630
              </th>
              <th scope="col" className="px-6 py-3">
                470
              </th>
              <th scope="col" className="px-6 py-3">
                320
              </th>
              <th scope="col" className="px-6 py-3">
                170
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Criado Em
              </th>
            </tr>
          </thead>
          <tbody>
            {serosas.map((serosa) => {
              return (
                <tr
                  key={serosa.id}
                  className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {serosa.id}
                  </th>
                  <td className="px-6 py-4">{serosa.corte_630}</td>
                  <td className="px-6 py-4">{serosa.corte_470}</td>
                  <td className="px-6 py-4">{serosa.corte_320}</td>
                  <td className="px-6 py-4">{serosa.corte_170}</td>
                  <td className="px-6 py-4">{serosa.kmtotal}</td>
                  <td className="px-6 py-4">{formateDate(serosa.createdAt)}</td>
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
