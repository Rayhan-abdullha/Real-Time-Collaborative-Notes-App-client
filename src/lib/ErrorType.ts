export interface CustomErrorType { response: { data: { message: string } } }
export interface AuthErrorType { response: { data: { message: string; details: { message: string }[] } } }