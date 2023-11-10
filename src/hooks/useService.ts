'use client'

import { useEffect, useRef } from 'react'

import { Newable } from '@/types/Newable'
import { isServerSide } from '@/utils/environment'

export const useService = <T>(Service: Newable<T>) => {
  const service = useRef(new Service())

  return service.current
}
