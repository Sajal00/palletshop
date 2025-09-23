// src/Redux/Selectors.ts

import { RootState } from '../Store/Store'
import { UserState } from '../Slice/userSlice';


export const selectUserInfo = (state: RootState): UserState | null => state.user.userInfo;