import { useState } from "react"

const useRequest = (callback) => {
    const [isLoading, setIsLoading] = useState(false)

    const request = async function() {
        setIsLoading(true)
        const response = await callback(...arguments)

        await new Promise(resolve => setTimeout(resolve, 10))
        
        setIsLoading(false)
        
        return response
    }

    return [isLoading, request]
}

export default useRequest;