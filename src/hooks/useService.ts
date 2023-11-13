'use client'

import { useRef } from 'react'

import { Newable } from '@/types/Newable'

export const useService = <T>(Service: Newable<T>) => {
  const service = useRef(new Service())

  return service.current
}
