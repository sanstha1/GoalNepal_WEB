export const API = {
    AUTH: {
        REGISTER : "/api/auth/register",
        LOGIN : "/api/auth/login",
        WHOAMI: '/api/profile/me',
        UPDATE_PROFILE : "/api/profile/upload-profile-picture",
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },
    PROFILE: {
        ME: '/api/profile/me',
        GET_BY_ID: '/api/profile',
        UPDATE: '/api/profile',
        UPLOAD_PICTURE: '/api/profile/upload-profile-picture',
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