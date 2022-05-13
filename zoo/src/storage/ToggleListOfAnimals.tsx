import axios from "axios";
import { IAnimal } from "../models/IAnimal";

const list: IAnimal[] = JSON.parse(localStorage.getItem("listOfAnimals") || "[]");

export const animalList: IAnimal[] = list; 
export let now: Date = new Date(); 

export function toggleList(): IAnimal[] {
    if (animalList.length == 0) {
        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then((res) => {
            let animalList: IAnimal[] = res.data;
            localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
        });   
    } return animalList;
}

export function getDateFromStorage(lastEat: Date, theAnimal: IAnimal): Date {
    lastEat = theAnimal.lastFed;
    lastEat = new Date(lastEat);
    lastEat.setDate(lastEat.getDate());
    return lastEat;
}