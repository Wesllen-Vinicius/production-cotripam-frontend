import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const WhileHoverButton = ({ children }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:bg-white dark:text-black text-white bg-[#111827]"
  >
    {children}
  </motion.button>
)
