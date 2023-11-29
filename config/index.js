import dotenv from 'dotenv'

dotenv.config()
export const {APP_PORT,REFRESH_TOKEN_SECRET, DEBUG_MODE,DB_URL ,JWT_SECRET} = process.env