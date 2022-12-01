import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/API'
import { useAuth } from '../../context/AuthContext'

interface Comarcas {
  id: string
  nome: string
  createdAt: Date
  modifiAt: Date
  cidade_estado: string
  meta_preCozido: number
  meta_serosa: number
}

export function PerfilGerencia() {
  const { user } = useAuth()

  const comarcaId = user?.comarcaId

  const { register, handleSubmit, setValue } = useForm<Comarcas>()

  useEffect(() => {
    api.get(`unidades/${comarcaId}`).then((res) => {
      setValue('nome', res.data.nome)
      setValue('id', res.data.id)
      setValue('cidade_estado', res.data.cidade_estado)
      setValue('meta_serosa', res.data.meta_serosa)
      setValue('meta_preCozido', res.data.meta_preCozido)
      setValue('createdAt', res.data.createdAt)
      setValue('modifiAt', res.data.modifiAt)
    })
  }, [])

  return (
    <div className="max-w-8xl mx-auto ">
      <form>
        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="bg-white dark:bg-[#e2e8f0] p-3 rounded-md shadow-md">
            <div className="mt-1 flex items-center justify-center">
              <span className="inline-block h-24 w-24 overflow-hidden ">
                <img
                  className="h-20 w-20 text-gray-300"
                  src="/src/assets/user.png"
                />
              </span>
            </div>
            <div className="mb-3 mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                IDENTIFICADOR :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700  leading-tight focus:outline-none"
                value={user?.id}
                disabled
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                CPF :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700  leading-tight focus:outline-none"
                value={user?.cpf}
                disabled
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                NOME :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={user?.name}
                disabled
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
              >
                E-MAIL :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={user?.email}
                disabled
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                CRIADO :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={user?.createdAt}
                disabled
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                ALTERADO :
              </label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={user?.modifiAt}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="pt-5 xl:pt-0">
            <div className="bg-white dark:bg-[#e2e8f0] p-3 rounded-md shadow-md">
              <div className="mt-1 flex items-center justify-center">
                <span className="inline-block h-24 w-24 overflow-hidden ">
                  <img
                    className="h-20 w-20 text-gray-300"
                    src="/src/assets/group.png"
                  />
                </span>
              </div>
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  IDENTIFICADOR :
                </label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  {...register('id')}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  NOME :
                </label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  {...register('nome')}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  CIDADE/ESTADO :
                </label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  {...register('cidade_estado')}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  CRIADO :
                </label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  {...register('createdAt')}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-5 mt-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  ALTERADO :
                </label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  {...register('modifiAt')}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
