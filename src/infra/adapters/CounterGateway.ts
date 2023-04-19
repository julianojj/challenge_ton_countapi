export interface CounterGateway {
    hit(url: string): Promise<any>
}
