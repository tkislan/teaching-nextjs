'use client'

import { createContext } from 'react'

export type ShoppingCart = {
  items: { id: number; count: number }[]
  addItem: (itemId: number) => void
}

export const ShoppingCartContext = createContext<ShoppingCart>({
  items: [],
  addItem: (itemId: number) => {
    throw new Error('Not implemented')
  },
})
