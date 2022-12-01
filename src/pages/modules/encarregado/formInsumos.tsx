import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { api } from '../../../services/API'
import { formateDate } from '../../../utils/formateDate'
import { Notification } from '../../../utils/Notification'
import { useAuth } from '../../context/AuthContext'

interface Insumos {
  id: number
  createdAt: Date
  sal_fino: number
  sal_grosso: number
  metabissulfito: number
  peroxido: number
  bombonas: number
  calVirgem: number
}

interface FormValues {
  sal_fino: number
  sal_grosso: number
  metabissulfito: number
  peroxido: number
  bombonas: number
  calVirgem: number
}

export function FormInssumos() {
  const { user } = useAuth()

  const userId = user?.id

  const validationSchema = Yup.object().shape({
    sal_fino: Yup.number().required('Sal Fino é Obrigatorio.'),
    sal_grosso: Yup.number().required('Sal Grosso é Obrigatorio.'),
    metabissulfito: Yup.number().required('Metabissulfito é Obrigatorio.'),
    peroxido: Yup.number().required('Peroxido é Obrigatorio.'),
    bombonas: Yup.number().required('Bombonas é Obrigatorio.'),
    calVirgem: Yup.number().required('Cal Virgem é Obrigatorio.'),
  })

  const [insumos, setInssumos] = useState<Insumos[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValues] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {
      sal_fino: 0,
      sal_grosso: 0,
      metabissulfito: 0,
      peroxido: 0,
      bombonas: 0,
      calVirgem: 0,
      createdAt: '',
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post('insumos', {
          sal_fino: Number(data.sal_fino),
          sal_grosso: Number(data.sal_grosso),
          metabissulfito: Number(data.metabissulfito),
          peroxido: Number(data.peroxido),
          bombonas: Number(data.bombonas),
          calVirgem: Number(data.bombonas),
          userUID: userId,
        })
        .then(() => {
          setValues((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: `Insumo cadastrado c0m sucesso.`,
          })
        })
        .catch((e) =>
          Notification.fire({
            icon: 'warning',
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
      .get<{ count: number; insumos: Insumos[] }>(
        `insumos/getInsumoByUser?userId=${userId}&?page=${page}`
      )
      .then((res) => {
        const insumos = res.data.insumos.map((insumo) => ({
          ...insumo,
          createdAt: new Date(),
        }))
        setInssumos(insumos)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Sal Grosso
            </label>
            <input
              value={formik.values.sal_grosso}
              {...register('sal_grosso')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.sal_grosso ? formik.errors.sal_grosso : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Sal Fino
            </label>
            <input
              value={formik.values.sal_fino}
              {...register('sal_fino')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.sal_fino ? formik.errors.sal_fino : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Metabissulfito
            </label>
            <input
              value={formik.values.metabissulfito}
              {...register('metabissulfito')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.metabissulfito
                ? formik.errors.metabissulfito
                : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Peróxido
            </label>
            <input
              value={formik.values.peroxido}
              {...register('peroxido')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.peroxido ? formik.errors.peroxido : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Bombonas
            </label>
            <input
              value={formik.values.bombonas}
              {...register('bombonas')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.bombonas ? formik.errors.bombonas : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Cal-Virgem
            </label>
            <input
              value={formik.values.calVirgem}
              {...register('calVirgem')}
              onChange={formik.handleChange}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.calVirgem ? formik.errors.calVirgem : null}
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
                SAL FINO
              </th>
              <th scope="col" className="px-6 py-3">
                SAL GROSSO
              </th>
              <th scope="col" className="px-6 py-3">
                CAL VIRGEM
              </th>
              <th scope="col" className="px-6 py-3">
                BOMBONAS
              </th>
              <th scope="col" className="px-6 py-3">
                PEROXIDO
              </th>
              <th scope="col" className="px-6 py-3">
                METABISSULFITO
              </th>
              <th scope="col" className="px-6 py-3">
                CRIADO EM
              </th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo) => {
              return (
                <tr
                  key={insumo.id}
                  className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {insumo.id}
                  </th>
                  <td className="px-6 py-4">{insumo.sal_fino}</td>
                  <td className="px-6 py-4">{insumo.sal_grosso}</td>
                  <td className="px-6 py-4">{insumo.calVirgem}</td>
                  <td className="px-6 py-4">{insumo.bombonas}</td>
                  <td className="px-6 py-4">{insumo.peroxido}</td>
                  <td className="px-6 py-4">{insumo.metabissulfito}</td>
                  <td className="px-6 py-4">{formateDate(insumo.createdAt)}</td>
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
