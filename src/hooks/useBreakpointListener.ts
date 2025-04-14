import { useEffect } from 'react'
import { useBreakpointStore } from '@/stores/useBreakpointStore'

export function useBreakpointListener() {
    const setWidth = useBreakpointStore((s) => s.setWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        handleResize() // set initially
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setWidth])
}
