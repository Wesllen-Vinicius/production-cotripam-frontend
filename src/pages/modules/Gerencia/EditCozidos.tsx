import { SubmitHandler, useForm } from 'react-hook-form'
import { AnimatedDiv } from '../../../components/animations/Transition'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/API'
import { Notification } from '../../../utils/Notification'

interface CozidoProps {
  id: number
}

interface Cozido {
  mocoto: number
  culatra: number
  abomaso: number
  fundo: number
  tripa_grossa: number
  tripa_fina: number
}

export function EditCozidos({ id }: CozidoProps) {
  const { register, handleSubmit, setValue } = useForm<Cozido>()

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Cozido> = async (data) => {
      try {
        await api.put(`cozidos/${id}`, data)
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
    api.get<Cozido>(`cozidos/${id}`).then((res) => {
      setValue('mocoto', res.data.mocoto)
      setValue('culatra', res.data.culatra)
      setValue('abomaso', res.data.abomaso)
      setValue('fundo', res.data.fundo)
      setValue('tripa_fina', res.data.tripa_fina)
      setValue('tripa_grossa', res.data.tripa_grossa)
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
                      Mocoto
                    </label>
                    <input
                      {...register('mocoto')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Culatra
                    </label>
                    <input
                      {...register('culatra')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Abomaso
                    </label>
                    <input
                      {...register('abomaso')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Fundo
                    </label>
                    <input
                      {...register('fundo')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Tripa Fina
                    </label>
                    <input
                      {...register('tripa_fina')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Tripa Grossa
                    </label>
                    <input
                      {...register('tripa_grossa')}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full h-full text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
