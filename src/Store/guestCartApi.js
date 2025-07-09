import axios from 'axios';
import { getOrCreateGuestId } from '../utils/guestId';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function guestAddToCart(productId, quantity = 1) {
  const guestId = getOrCreateGuestId();
  return axios.post(`${baseUrl}/cart/guest/add`, { guestId, product: productId, quantity });
}

export async function guestViewCart() {
  const guestId = getOrCreateGuestId();
  return axios.get(`${baseUrl}/cart/guest/view`, { params: { guestId } });
}

export async function guestUpdateCartItem(itemId, quantity) {
  const guestId = getOrCreateGuestId();
  return axios.patch(`${baseUrl}/cart/guest/update/${itemId}`, { guestId, quantity });
}

export async function guestRemoveCartItem(itemId) {
  const guestId = getOrCreateGuestId();
  return axios.delete(`${baseUrl}/cart/guest/delete/${itemId}`, { data: { guestId } });
}

export async function guestCheckout(orderData) {
  const guestId = getOrCreateGuestId();
  return axios.post(`${baseUrl}/checkout/guest`, { ...orderData, guestId });
} 