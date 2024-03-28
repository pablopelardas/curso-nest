import axios from "axios";

export interface HttpAdapter{
    get<T>(url: string): Promise<T>;
    post(url: string, data: any): Promise<void>;
    patch(url: string, data: any): Promise<void>;
    put(url: string, data: any): Promise<void>;
}

export class PokeApiFetchAdapter implements HttpAdapter{
    async get<T>(url: string): Promise<T>{
        const data = await fetch(url).then(res => res.json());
        return data;
    }
    async post(url: string, data: any){
        console.log('post', url, data);
        return;
    }
    async patch(url: string, data: any){
        console.log('patch', url, data);
        return;
    }
    async put(url: string, data: any){
        console.log('put', url, data);
        return;
    }
}

export class PokeApiAdapter implements HttpAdapter{
    private readonly axios = axios;

    async get<T>(url: string): Promise<T>{
        const {data} = await this.axios.get(url);
        return data;
    }
    async post(url: string, data: any){
        console.log('post', url, data);
        return;
    }
    async patch(url: string, data: any){
        console.log('patch', url, data);
        return;
    }
    async put(url: string, data: any){
        console.log('put', url, data);
        return;
    }

    
}