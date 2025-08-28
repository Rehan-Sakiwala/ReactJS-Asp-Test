// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://localhost:7276/api',
    EMPLOYEES: '/Employees',
    get EMPLOYEES_URL() {
        return this.BASE_URL + this.EMPLOYEES;
    }
};

//Configuration
export const APP_CONFIG = {
    APP_NAME: 'Employee Management',
    APP_DESCRIPTION: 'Manage your team with ease',
    VERSION: '1.0.0'
};


export const DEV_CONFIG = {
    DEBUG: true,
    API_TIMEOUT: 10000,
    MAX_RETRIES: 3
};
