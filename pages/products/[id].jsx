import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Product
({ product }) {
  if (!product) return (
    <div>
      <p>Product not found</p>
      <Link href="/products">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <Link href="/products">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
  const product = await res.json()
  return { props: { product } }
}