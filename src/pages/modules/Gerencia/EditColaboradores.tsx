import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'

interface ColaboradorProps {
  id: string
}
interface IFormValues {
  id: string
  cpf: string
  nome: string
  pis_pasep: string
  data_admis: string
  numero_registro: number
}

export function EditColaboradoradores({ id }: ColaboradorProps) {
  const { register, handleSubmit, setValue } = useForm<IFormValues>()

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<IFormValues> = async (data) => {
      try {
        await api.put(`colaborador/${id}`,
          {
            cpf: data.cpf,
            nome: data.nome,
            pis_pasep: data.pis_pasep,
            data_admis: data.data_admis,
            numero_registro: Number(data.numero_registro)
          })
        console.log(data)
        Notification.fire({
          icon: 'success',
          title: 'Atualizado com sucesso!',
        })
        window.location.reload(), 4000
        fn()
      } catch (e: any) {
        Notification.fire({
          icon: 'error',
          title: e.message,
        })
      }
    }
    return submit
  }

  const loadData = () => {
    api.get<IFormValues>(`colaborador/${id}`).then((res) => {
      setValue('nome', res.data.nome)
      setValue('cpf', res.data.cpf)
      setValue('pis_pasep', res.data.pis_pasep)
      setValue('data_admis', res.data.data_admis)
      setValue('numero_registro', res.data.numero_registro)
    })
  }

  return (
    <Modal onOpen={loadData}>
      {({ handleCloseModal }) => {
        return (
          <AnimatedDiv>
            <div className="max-w-5xl mx-auto bg-white p-16 ">
              <form onSubmit={handleSubmit(onSubmit(handleCloseModal))}>
                <div className="grid xl:grid-cols-2 xl:gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      NOME
                    </label>
                    <input
                      {...register('nome')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      CPF
                    </label>
                    <input
                      {...register('cpf')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      PIS_PASEP
                    </label>
                    <input
                      {...register('pis_pasep')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      DATA_ADMIS
                    </label>
                    <input
                      {...register('data_admis')}
                      type="date"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      NUMERO_REGISTRO
                    </label>
                    <input
                      {...register('numero_registro')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </AnimatedDiv>
        )
      }}
    </Modal>
  )
}
