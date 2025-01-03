import LastPosts from '@/components/LastPosts'

import Intro from "@/components/intro/Intro"

export default async function Home() {
	return <div className='page-container'>
		<Intro/>
		<LastPosts />
		</div>
}
