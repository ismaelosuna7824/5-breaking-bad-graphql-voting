import dotenv from 'dotenv';
// El path se coge desde la raíz

const environments = dotenv.config({ path: './src/.env' });
if (process.env.NODE_ENV !== 'production') {
    if (environments.error) {
        throw environments.error
    }
}
export default environments;