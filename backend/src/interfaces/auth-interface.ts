export default interface User {
    name: string;
    password: string;
    email: string;
    address: string;
    phone: string | null;
    isAdmin: boolean;
}