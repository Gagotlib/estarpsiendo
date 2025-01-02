import axios from 'axios'
import { useEffect, useState } from 'react'

type Data<T> = T | null
export type ErrorType = Error | null

interface Params<T> {
	data: Data<T>
	loading: boolean
	error: ErrorType
}

export const useFetchData = <T>(url: string): Params<T> => {
	const [data, setData] = useState<Data<T>>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<ErrorType>(null)

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			try {
				const response = await axios.get(url)
				const jsonData: T = response.data

				setData(jsonData)
				setError(null)
			} catch (err) {
				setError(err as Error)
				console.log(err);
				
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}
