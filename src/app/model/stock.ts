export class Stock {
    id?: number;
    name: string;
    code: string;
    price: number;
    previousPrice: number;
    exchange: string;
    favorite: boolean;
    isPositiveChange: boolean; // Thêm thuộc tính isPositiveChange

    constructor(
        name: string,
        code: string,
        price: number,
        previousPrice: number,
        exchange: string = '',
        favorite: boolean = false,
        id?: number
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.price = price;
        this.previousPrice = previousPrice;
        this.exchange = exchange;
        this.favorite = favorite;
        this.isPositiveChange = price >= previousPrice; // Tính toán giá trị ngay trong constructor
    }

    // Static method to create a Stock instance from a plain object
    static fromObject(obj: any): Stock {
        const stock = new Stock(
            obj.name,
            obj.code,
            +obj.price,
            +obj.previousPrice,
            obj.exchange ?? '',
            obj.favorite === 'true' || obj.favorite === true,
            obj.id
        );
        return stock;
    }
}
