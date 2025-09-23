import { RootState } from '../Store/Store'
import { UserState } from '../Slice/userSlice';
import { CartItem } from '../Slice/cartSlice';

export const selectUserInfo = (state: RootState): UserState | null => state.user.userInfo;

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
