import {z} from "zod";

export const todoValidator = z.object({
    content:z.string().min(1,"ใส่รายการที่ต้องทำก่อน"),

})