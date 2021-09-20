import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'


export default function Trabajos() {
  return (
    <>
        <Head>
            <title>Eperiencia</title>
        </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <Image src="/images/img.jpg" 
       height={300}
       width={300}
      alt="Your Name" />
    </>
  )
}