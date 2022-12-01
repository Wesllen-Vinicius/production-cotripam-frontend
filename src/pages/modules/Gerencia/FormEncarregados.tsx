import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { FormEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'
import { cpf } from 'cpf-cnpj-validator'
import InputMask from 'react-input-mask'
import { EditEncarregado } from './EditEncarregados'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { formateDate } from '../../../utils/formateDate'

interface FormValues {
  cpf?: string
  nomeUser: string
  email: string
  password: string
  nivel: boolean
  comarcaId: string
}

interface Comarcas {
  id: string
  nome: string
}

interface Users {
  id: string
  cpf: string
  nomeUser: string
  email: string
  createdAt: Date
  modifiAt: Date
  Comarca: { nome: string }
}

export function FormEncarregados() {
  const validationSchema = Yup.object().shape({
    nomeUser: Yup.string()
      .required('Nome do colaborador é obrigatório.')
      .max(120, 'Nome deve conter no maximo 120 caracteres.'),
    email: Yup.string()
      .email('Email Invalido.')
      .required('Email é obrigatório.'),
    password: Yup.string()
      .min(8, 'Senha precisa de no minimo 8 caracteres.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Deve conter 8 caracteres, um maiúsculo, um minúsculo, um número e um caractere especial'
      )
      .required('Senha é obrigatório.'),
    nivel: Yup.boolean(),
    cpf: Yup.string()
      .required('CPF é obrigatório.')
      .test((value) => cpf.isValid(value!)),
    comarcaId: Yup.string().required('Comarca é obrigatório.'),
  })

  const [users, setUsers] = useState<Users[]>([])
  const [total, setTotal] = useState(0)
  const { register } = useForm<FormValues>()
  const [value, setValue] = useState(0)
  const [page, setPage] = useState(1)
  const [comarcas, setComarcas] = useState<Comarcas[]>([])

  const formik = useFormik({
    initialValues: {
      nomeUser: '',
      email: '',
      cpf: '',
      password: '',
      nivel: false,
      comarcaId: '',
    },
    validationSchema,
    onSubmit: (data: FormValues) => {
      api
        .post(`auth/signup`, {
          nomeUser: String(data.nomeUser),
          cpf: String(data.cpf),
          password: String(data.password),
          email: String(data.email),
          comarcaId: String(data.comarcaId),
        })
        .then(() => {
          setValue((c) => c + 1)
          Notification.fire({
            icon: 'success',
            title: `Encarregado cadastrado com sucesso.`,
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

  const deleteUser = async (id: string) => {
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
          await api.delete(`users/${id}`).then(() => {
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
    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()

    const dataInicio = formData.get('dataInicio')
    dataInicio && params.set('dataInicio', dataInicio.toString())

    const dataFim = formData.get('dataFim')
    dataFim && params.set('dataFim', dataFim.toString())

    const termo = formData.get('termo')
    termo && params.set('termo', termo.toString())
    api
      .get<{ count: number; termo: string; users: Users[] }>(
        `users?${params.toString()}`
      )
      .then((res) => {
        const users = res.data.users.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          modifiAt: new Date(user.modifiAt),
        }))
        setUsers(users)
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
      .get<{ count: number; users: Users[] }>(`users?page=${page}`)
      .then((res) => {
        const users = res.data.users.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          modifiAt: new Date(user.modifiAt),
        }))
        setUsers(users)
        setTotal(res.data.count)
      })
  }, [value, page])

  useEffect(() => {
    api
      .get<{ count: number; unidades: Comarcas[] }>(`unidades?page=${page}`)
      .then((res) => {
        const comarcas = res.data.unidades.map((comarca) => ({ ...comarca }))
        setComarcas(comarcas)
        setTotal(res.data.count)
      })
  }, [value, page])

  return (
    <>
      <div className="max-w-8xl mx-auto bg-white dark:bg-[#e2e8f0] p-8 rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Nome
              </label>
              <input
                value={formik.values.nomeUser}
                {...register('nomeUser')}
                onChange={formik.handleChange}
                type="text"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.nomeUser ? formik.errors.nomeUser : null}
              </div>
            </div>

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
                E-mail
              </label>
              <input
                value={formik.values.email}
                {...register('email')}
                onChange={formik.handleChange}
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.email ? formik.errors.email : null}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Senha
              </label>
              <input
                value={formik.values.password}
                {...register('password')}
                onChange={formik.handleChange}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div className="text-red-500">
                {formik.errors.password ? formik.errors.password : null}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Imagem do Perfil
              </label>
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-900"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                Comarca
              </label>
              <select
                defaultValue=""
                {...register('comarcaId')}
                onChange={formik.handleChange}
                value={formik.values.comarcaId}
                className="form-select appearance-none
                        w-full      px-3      py-1.5      text-gray-700      bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded      transition      mt-2
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="">Selecione uma comarca</option>
                {comarcas.map((comarca) => (
                  <option key={comarca.id} value={comarca.id}>
                    {comarca.nome}
                  </option>
                ))}
              </select>
              <div className="text-red-500">
                {formik.errors.comarcaId ? formik.errors.comarcaId : null}
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
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className=" p-5 bg-gray-300 dark:bg-gray-900">
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
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    CPF
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EMAIL
                  </th>
                  <th scope="col" className="px-6 py-2">
                    COMARCA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CRIADO EM
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ALTERADO EM
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b  dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {user.cpf}
                      </th>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {user.nomeUser}
                      </td>
                      <td className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {user.email}
                      </td>
                      <td
                        scope="row"
                        className="text-center px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                      >
                        {user.Comarca.nome}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {formateDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {formateDate(user.modifiAt)}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        <AnimatedDiv>
                          <EditEncarregado userId={user.id} />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="pl-5"
                            onClick={() => deleteUser(user.id)}
                          >
                            <img
                              src="/src/assets/icons/delete-content.svg"
                              width={20}
                            />
                          </motion.button>
                        </AnimatedDiv>
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
      </div>
    </>
  )
}
