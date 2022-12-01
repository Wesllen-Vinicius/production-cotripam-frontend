import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { formateDate } from '../../../utils/formateDate'
import { useAuth } from '../../context/AuthContext'
interface Abates {
  id: number
  createdAt: Date
  bois: number
  vacas: number
  total: number
  condenados: number
}
interface FormValues {
  bois: number
  vacas: number
  total: number
  condenados: number
  aproveitado: number
}

export function FormAbates() {
  const { user } = useAuth()

  const userId = user?.id

  const validationSchema = Yup.object().shape({
    bois: Yup.number().required('Campo bois é obrigatório.'),
    total: Yup.number().required('Campo total é obrigatório.'),
    condenados: Yup.number().required('Campo condenados é obrigatório.'),
  })

  const [abates, setAbates] = useState<Abates[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {
      bois: 0,
      vacas: 0,
      total: 0,
      condenados: 0,
      aproveitado: 0,
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post(`abates`, {
          bois: Number(data.bois),
          vacas: Number(data.vacas),
          total: Number(data.total),
          condenados: Number(data.condenados),
          aproveitado: Number(data.aproveitado),
          userUID: userId,
        })
        .then(() => {
          setValue((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: `Registro de abate cadastrado com sucesso.`,
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
      .get<{ count: number; abates: Abates[] }>(
        `abates/getAbateByUser?userId=${userId}&?page=${page}`
      )
      .then((res) => {
        const abates = res.data.abates.map((abate) => ({
          ...abate,
          createdAt: new Date(),
        }))
        setAbates(abates)
        setTotal(res.data.count)
      })
  }, [value, page])

  useEffect(() => {
    function SetVacas() {
      if (formik.values.total > 0 && formik.values.bois > 0) {
        formik.values.vacas = formik.values.total - formik.values.bois
      }
      if (formik.values.total > 0 && formik.values.condenados > 0) {
        formik.values.aproveitado =
          formik.values.total - formik.values.condenados
      }
    }
    SetVacas()
  }, [formik.values.bois, formik.values.total, formik.values.condenados])

  return (
    <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Total Abatido
            </label>
            <input
              type="text"
              value={formik.values.total}
              placeholder="0"
              {...register('total')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.total ? formik.errors.total : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Bois Abatidos
            </label>
            <input
              type="number"
              value={formik.values.bois}
              {...register('bois')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.bois ? formik.errors.bois : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Vacas Abatidas
            </label>
            <input
              disabled
              value={formik.values.vacas}
              {...register('vacas')}
              onChange={formik.handleChange}
              className="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.vacas ? formik.errors.vacas : null}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Condenados
            </label>
            <input
              type="text"
              value={formik.values.condenados}
              placeholder="0"
              {...register('condenados')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.condenados ? formik.errors.condenados : null}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Total Aproveitado
            </label>
            <input
              disabled
              value={formik.values.aproveitado}
              {...register('aproveitado')}
              onChange={formik.handleChange}
              className=" bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.vacas ? formik.errors.vacas : null}
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
                Bois
              </th>
              <th scope="col" className="px-6 py-3">
                Vacas
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Cond.
              </th>
              <th scope="col" className="px-6 py-3">
                Criado em
              </th>
            </tr>
          </thead>
          <tbody>
            {abates.map((abate) => {
              return (
                <tr
                  key={abate.id}
                  className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {abate.id}
                  </th>
                  <td className="px-6 py-4">{abate.bois}</td>
                  <td className="px-6 py-4">{abate.vacas}</td>
                  <td className="px-6 py-4">{abate.total}</td>
                  <td className="px-6 py-4">{abate.condenados}</td>
                  <td className="px-6 py-4">{formateDate(abate.createdAt)}</td>
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
