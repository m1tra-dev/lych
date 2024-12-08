import { action, makeAutoObservable, observable, computed } from "mobx";

export default class CounterStore {
    count: number;
    price: number;
    index: number;
    constructor(index:number,price: number) {
        this.index = index
        this.price = price;
        this.count = this.loadCountFromLocalStorage()!;
        makeAutoObservable(this);
    }

    saveCountToLocalStorage() {
        const basketData = JSON.parse(localStorage.getItem('BasketData') || '{}');
        basketData[this.index][1] = this.count; // Сохраняем count по индексу
        localStorage.setItem('BasketData', JSON.stringify(basketData));
    }

    loadCountFromLocalStorage() {
        const basketData = localStorage.getItem('BasketData') as string | null;
        if (basketData) {
            const storedCount = JSON.parse(basketData)[this.index][1];
        return storedCount ? parseInt(storedCount, 10) : 1 || null; 
    }
    }

    increment = (value: number) => {
        this.count += 1;    
        this.saveCountToLocalStorage();
    }

    decrement = (value: number) => {
        this.count -= 1;
        this.saveCountToLocalStorage();
    }

}