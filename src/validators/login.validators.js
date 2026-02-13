import {z} from "zod";

export const loginValidator = z.object({
    username:z.string().min(4,"ใส่ Username อย่างน้อย 4 ตัว"),
    password:z.string().min(4,"ใส่ Password อย่างน้อย 4 ตัว"),

})