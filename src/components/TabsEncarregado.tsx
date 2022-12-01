import { Tab } from '@headlessui/react'
import { FormAbates } from '../pages/modules/encarregado/formAbates'
import { FormColaboradoresEncarregado } from '../pages/modules/encarregado/formColaboradores'
import { FormInssumos } from '../pages/modules/encarregado/formInsumos'
import { FormSerosa } from '../pages/modules/encarregado/formSerosa'
import { FormTripaCozida } from '../pages/modules/encarregado/formPreCozidos'
import { PerfilEncarregado } from '../pages/modules/encarregado/perfilEncarregado'
import { AnimatedDiv } from './animations/Transition'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const NavigationEnc = () => {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="sm:flex md:flex xl:flex space-x-1 rounded-xl bg-gray-300 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Perfil
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Abate diário
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Serosa
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Pré-Cozidos
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Insumos
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                'ring-white ',
                selected
                  ? 'bg-[#0687b7] shadow'
                  : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
              )
            }
          >
            Cadastro de colaborador
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <PerfilEncarregado />
            </AnimatedDiv>
          </Tab.Panel>
          <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
            <AnimatedDiv key={1}>
              <FormAbates />
            </AnimatedDiv>
          </Tab.Panel>

          <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
            <AnimatedDiv key={2}>
              <FormSerosa />
            </AnimatedDiv>
          </Tab.Panel>

          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={3}>
              <FormTripaCozida />
            </AnimatedDiv>
          </Tab.Panel>

          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <FormInssumos />
            </AnimatedDiv>
          </Tab.Panel>
          <Tab.Panel className={classNames('rounded-xl bg-transparent  p-3')}>
            <AnimatedDiv key={4}>
              <FormColaboradoresEncarregado />
            </AnimatedDiv>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
