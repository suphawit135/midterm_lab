
import { create } from "zustand";

const useUserStore = create((set)=>({
    token: null,
    setToken:(token)=>set({token}),
})  
)

export default useUserStore