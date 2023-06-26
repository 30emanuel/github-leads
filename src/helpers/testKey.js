import axios from "axios";

export const testKey = async(key) =>{
    try {
        const response = await axios.get(
            `https://api.github.com/user`,
            {
                headers: {
                    Authorization: `Token ${key}` 
                }
            }
        )

        return {
            rateLimit: response.headers['x-ratelimit-remaining'],
            isValid: true
        }
    } catch (error) {
        return {
            rateLimit: 0,
            isValid: false
        }
    }
}