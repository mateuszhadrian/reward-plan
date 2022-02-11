export interface RequestBodyDto {
name: string;
criteria: RequestBodyCriteria[]
}

export interface RequestBodyCriteria {
    product: string;
    from: number,
    to: number,
    criterion: string,
    percentage: string
}