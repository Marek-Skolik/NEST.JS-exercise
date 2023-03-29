import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
    export class OrdersService {

    public getAll(): Order[] {
    return db.orders;
    };
    
    public getById(id: Order['id']): Order | null {
    return db.orders.find((p) => p.id === id);
    };

    public deleteById(id: Order['id']): Order | null {
        return db.orders.find((p) => p.id === id);
    };

    public post(orderData: Omit<Order, 'id'>): Order {
        const newOrder = { ...orderData, id: uuidv4() };
        db.orders.push(newOrder);
        return newOrder;
    }; 

    public put(id: Order['id'], orderData: Omit<Order, 'id'>) {
        db.orders = db.orders.map((p) => {
            if (p.id === id) {
            return { ...p, ...orderData };
            }
            return p;
            });
    };
}

