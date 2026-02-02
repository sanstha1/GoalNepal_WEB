export const API = {
    AUTH: {
        REGISTER : "/api/auth/register",
        LOGIN : "/api/auth/login",
        WHOAMI: '/api/auth/whoami',
        UPDATE_PROFILE : "/api/auth/profile",
    },
    ADMIN: {
        REGISTER: "/api/admin/register",
        USER: {
            CREATE: '/api/admin/users',
            GET_ALL: '/api/admin/users/all',
            GET_BY_ID: '/api/admin/users',
            UPDATE: '/api/admin/users',
            DELETE: '/api/admin/users'
        }
    }
}