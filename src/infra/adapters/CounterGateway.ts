export interface CounterGateway {
    hit(url: string): Promise<any>
    get(url: string): Promise<any>
}
