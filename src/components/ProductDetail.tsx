import { createDB } from '../lib/db'
import { CreateProductReviewForm } from './CreateProductReviewForm'

async function getProductDetail(id: number) {
  const db = createDB()

  const product = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirstOrThrow()

  return product
}

async function getProductReviews(id: number) {
  const db = createDB()

  const reviews = await db.selectFrom('productsReviews').selectAll().where('productId', '=', id).execute()

  return reviews
}

async function getProductPhotos(id: number) {
  const db = createDB()

  const photos = await db.selectFrom('productsPhotos').selectAll().where('productId', '=', id).execute()

  return photos
}

type ProductDetailProps = {
  id: number
}

export async function ProductDetail({ id }: ProductDetailProps) {
  const product = await getProductDetail(id)
  const reviews = await getProductReviews(id)
  const photos = await getProductPhotos(id)

  return (
    <div>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>
        {photos.map((p) => (
          <div key={p.id}>
            <picture>
              <img src={p.url} alt="Picture" />
            </picture>
          </div>
        ))}
      </div>
      <div>
        {reviews.map((pr) => (
          <div key={pr.id}>
            {pr.username} - [{pr.rating}] {pr.content}
          </div>
        ))}
      </div>
      <CreateProductReviewForm productId={product.id} />
    </div>
  )
}
