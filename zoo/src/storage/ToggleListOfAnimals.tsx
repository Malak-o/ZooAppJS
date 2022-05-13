import axios from "axios";
import { IAnimal } from "../models/IAnimal";

const list: IAnimal[] = JSON.parse(localStorage.getItem("listOfAnimals") || "[]");

export const animalList: IAnimal[] = list; 
export let now: Date = new Date(); 

export function toggleList(): IAnimal[] {
    if (animalList.length === 0) {
        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then((res) => {
            let animalList: IAnimal[] = res.data;
            localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
        });
    } return animalList;
}

export function getDateFromStorage(lastAte: Date, theAnimal: IAnimal): Date {
    lastAte = theAnimal.lastFed;
    lastAte = new Date(lastAte);
    lastAte.setDate(lastAte.getDate());
    return lastAte;
}