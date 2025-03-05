import axios from 'axios'

export async function fetchData<T>(url: string): Promise<T> {
	try {
		const response = await axios.get<T>(url)
		return response.data
	} catch (error) {
		console.error('Error fetching data:', error)
		throw new Error('Failed to fetch data')
	}
}
