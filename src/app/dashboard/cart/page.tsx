import { WidgetItem } from '@/components';
import { products, type Product } from '@/products/data/products';
import { ItemCard } from '@/shopping-cart';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Carrito',
  description: 'Carrito de compras',
};

type ProductInCart = {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const id of Object.keys(cart)) {
    // Luego se va a llamar a la BD
    const product = products.find((p) => p.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number };
  const productsInCart = getProductsInCart(cart);

  // eslint-disable-next-line max-len
  const totalToPay = productsInCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title="Total a pagar">
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className='font-bold text-center text-gray-500'>Impuestos 15%: {(totalToPay * 0.15).toFixed(2)}</span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
