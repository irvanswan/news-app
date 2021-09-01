/* module.exports = {
    env: {
        API_URL: 'http://localhost:3333/news/api',
        API_URL_IMG: 'http://localhost:3333/',
        ORIGIN_URL:'http://localhost:3000',
        SECRET_COOKIE_PASSWORD: 'zj41^B$3yDp@R28VW@akXDQI4BMskEhs*Lx',
        VERSION_STATE:'development',
        GOOGLE_CLIENT_ID:'681983374499-1son4dkk5f6go6snifmarqsoegfr8il5.apps.googleusercontent.com',
        FACEBOOK_CLIENT_ID:'576155690033340'
    },
} */
module.exports = {
    env: {
        API_URL: process.env.NEXT_API_URL,
        API_URL_IMG: process.env.NEXT_API_URL_IMG,
        ORIGIN_URL: process.env.NEXT_ORIGIN_URL,
        SECRET_COOKIE_PASSWORD: process.env.NEXT_SECRET_COOKIE_PASSWORD,
        VERSION_STATE: process.env.NEXT_VERSION_STATE,
        GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
        FACEBOOK_CLIENT_ID: process.env.NEXT_FACEBOOK_CLIENT_ID
    },
}