import { Tab } from '@headlessui/react'
import { AnimatedDiv } from './animations/Transition'
import { TableAbateDiario } from '../pages/modules/Gerencia/TableAbateDiario'
import { TableTripaCozida } from '../pages/modules/Gerencia/TableCozidos'
import { PerfilGerencia } from '../pages/modules/Gerencia/PerfilGerencia'
import { FormEncarregados } from '../pages/modules/Gerencia/FormEncarregados'
import { TableSerosa } from '../pages/modules/Gerencia/TableSerosa'
import { FormUnidades } from '../pages/modules/Gerencia/FormComarca'
import { AnimatePresence, motion } from 'framer-motion'
import { TableInsumos } from '../pages/modules/Gerencia/TableInsumos'
import { TableColaboradores } from '../pages/modules/Gerencia/TableColaboradores'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const NavigationGerencia = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full  sm:px-0"
      >
        <Tab.Group>
          <Tab.List className="sm:flex md:flex xl:flex  rounded-xl bg-gray-300 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
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
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
                  'ring-white ',
                  selected
                    ? 'bg-[#0687b7] shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
                )
              }
            >
              Cadastro de Comarca
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
                  'ring-white ',
                  selected
                    ? 'bg-[#0687b7] shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
                )
              }
            >
              Cadastro de Encarregado
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
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
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
                  'ring-white ',
                  selected
                    ? 'bg-[#0687b7] shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
                )
              }
            >
              Abates
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
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
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
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
                  'w-full rounded-lg py-1.0 text-sm font-medium leading-5 text-white',
                  'ring-white ',
                  selected
                    ? 'bg-[#0687b7] shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-[#0687b7]'
                )
              }
            >
              Colaboradores
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <PerfilGerencia />
              </AnimatedDiv>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={1}>
                <FormUnidades />
              </AnimatedDiv>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={1}>
                <FormEncarregados />
              </AnimatedDiv>
            </Tab.Panel>

            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <TableSerosa />
              </AnimatedDiv>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <TableAbateDiario />
              </AnimatedDiv>
            </Tab.Panel>

            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <TableTripaCozida />
              </AnimatedDiv>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <TableInsumos />
              </AnimatedDiv>
            </Tab.Panel>
            <Tab.Panel className={classNames('rounded-xl bg-transparent p-3')}>
              <AnimatedDiv key={2}>
                <TableColaboradores />
              </AnimatedDiv>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </AnimatePresence>
  )
}
