import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { formateDate, formateDateString } from '../../../utils/formateDate'
import { useAuth } from '../../context/AuthContext'
import { cpf } from 'cpf-cnpj-validator'
import InputMask from 'react-input-mask'
interface Colaboradores {
  id: string
  cpf: string
  nome: string
  pis_pasep: string
  data_admis: string
  numero_registro: number
  createdAt: Date
}
interface FormValues {
  cpf: string
  nome: string
  pis_pasep: string
  data_admis: string
  numero_registro: number
  comarcaId: string
  userId: string
}

export function FormColaboradoresEncarregado() {
  const { user } = useAuth()

  const userComarcaId = user?.comarcaId
  const userId = user?.id

  const validationSchema = Yup.object().shape({
    cpf: Yup.string()
      .required('CPF é obrigatório.')
      .test((value) => cpf.isValid(value!)),
    nome: Yup.string().required('Nome é obrigatório.'),
    pis_pasep: Yup.string().required('PIS/PASEP é obrigatório.'),
    data_admis: Yup.string().required('Data de Admissão é obrigatório.'),
    numero_registro: Yup.number().required('Numero de Registro é obrigatório.'),
  })

  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([])
  const { register } = useForm<FormValues>()
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const formik = useFormik({
    initialValues: {
      cpf: '',
      nome: '',
      pis_pasep: '',
      data_admis: '',
      numero_registro: 0,
      comarcaId: '',
      userId: '',
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      console.log(user)
      api
        .post(`colaborador`, {
          cpf: String(data.cpf),
          nome: String(data.nome),
          pis_pasep: String(data.pis_pasep),
          data_admis: data.data_admis,
          numero_registro: Number(data.numero_registro),
          comarcaId: userComarcaId,
          userId: userId,
        })
        .then(() => {
          setValue((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: `Colaborador cadastrado com sucesso.`,
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
      .get<{ count: number; colaboradores: Colaboradores[] }>(
        `colaborador/getColaboradorByComarca?comarcaId=${userComarcaId}&?page=${page}`
      )
      .then((res) => {
        const colaboradores = res.data.colaboradores.map((colaborador) => ({
          ...colaborador,
          createdAt: new Date(),
        }))
        setColaboradores(colaboradores)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <div className="max-w-7xl mx-auto bg-white p-16 rounded-md shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              CPF
            </label>
            <InputMask
              mask="999.999.999-99"
              value={formik.values.cpf}
              {...register('cpf')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.cpf ? formik.errors.cpf : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Nome
            </label>
            <input
              type="text"
              value={formik.values.nome}
              {...register('nome')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.nome ? formik.errors.nome : null}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              PIS/PASEP
            </label>
            <input
              value={formik.values.pis_pasep}
              {...register('pis_pasep')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.pis_pasep ? formik.errors.pis_pasep : null}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Data Admissão
            </label>
            <input
              type="date"
              value={formik.values.data_admis}
              placeholder="0"
              {...register('data_admis')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.data_admis ? formik.errors.data_admis : null}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
              Numero de Registro
            </label>
            <input
              value={formik.values.numero_registro}
              {...register('numero_registro')}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="text-red-500">
              {formik.errors.numero_registro
                ? formik.errors.numero_registro
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
        <div className=" p-5 bg-gray-300 dark:bg-gray-900"></div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                CPF
              </th>
              <th scope="col" className="px-6 py-3">
                Num_regitro
              </th>
              <th scope="col" className="px-6 py-3">
                PIS/PASEP
              </th>
              <th scope="col" className="px-6 py-3">
                data admis
              </th>
              <th scope="col" className="px-6 py-3">
                criado em
              </th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((colaborador) => {
              return (
                <tr
                  key={colaborador.id}
                  className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <td className="px-6 py-4">{colaborador.nome}</td>
                  <td className="px-6 py-4">{colaborador.cpf}</td>
                  <td className="px-6 py-4">{colaborador.numero_registro}</td>
                  <td className="px-6 py-4">{colaborador.pis_pasep}</td>
                  <td className="px-6 py-4">
                    {formateDateString(colaborador.data_admis)}
                  </td>
                  <td className="px-6 py-4">
                    {formateDate(colaborador.createdAt)}
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
