import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const getStock = async(productId: number) => {
    const { data: stock } = await api.get<Stock>(`/stock/${productId}`);
    return stock ? stock.amount : 0;
  }

  const addProduct = async (productId: number) => {
    try {
      const stock = await getStock(productId);
      
      const productExists = cart.find(cartProduct => cartProduct.id === productId);
      
      // Creating a new product
      if(!productExists && stock > 0) {
        const { data: product } = await api.get<Product>(`/products/${productId}`);
        
        const productFormatted = {
          ...product,
          amount: 1
        }
        
        localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart, productFormatted]));
        setCart([
          ...cart,
          productFormatted
        ]);

        return;
      }

      // Increment product quantity (Product already exists)
      if(productExists && productExists.amount < stock) {
        const updatedProducts = cart.map(cartProduct => cartProduct.id === productExists.id ? {
          ...cartProduct,
          amount: cartProduct.amount + 1
        } : cartProduct);

        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedProducts));
        setCart(updatedProducts);

        return;
      }

      toast.error('Quantidade solicitada fora de estoque');
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const checkProductExists = cart.find(product => product.id === productId);

      if(!checkProductExists) {
        throw new Error();
      }

      const updatedProducts = cart.filter(product => product.id !== productId);

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedProducts));
      setCart(updatedProducts);
    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount <= 0) return;

      // Check product exists
      const checkProductExists = cart.find(product => product.id === productId);
      if(!checkProductExists) {
        throw new Error();
      }

      // Check stock
      const stock = await getStock(productId);
      if(amount > stock) {
        return toast.error('Quantidade solicitada fora de estoque');
      }

      // Update product amount
      const updatedProducts = cart.map(product => product.id === productId ? {
        ...product,
        amount
      } : product);

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedProducts));
      setCart(updatedProducts);
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
