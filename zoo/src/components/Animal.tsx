import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { animalList, getDateFromStorage, now } from '../storage/ToggleListOfAnimals';
import { useParams } from 'react-router-dom'
import { IAnimal } from '../models/IAnimal';
import { isLabeledStatement, isNumericLiteral } from 'typescript';

export const Animal = () => {
    const [animal,setAnimal] = useState<IAnimal>({
    
    id: 0,
    name: '',
    latinName: '',
    yearOfBirth: 0,
    shortDescription: '', 
    longDescription: '',
    imageUrl: '',
    medicine: '',
    isFed: false,
    lastFed: new Date()
    });

    const [time, setTime] = useState<Date>(new Date())

    let params = useParams();
    let lastFed: Date;

    let theAnimal: IAnimal = animalList.filter(function (thisAnimal) {
        return thisAnimal.id.toString() == params.id;
    })[0];
    const index: number = animalList.findIndex(i => i.id === theAnimal.id);


    useEffect(() => {
        setAnimal(theAnimal);
        lastFed = getDateFromStorage(lastFed, theAnimal);
        setTime(lastAte);

        console.log(now.valueOf() - lastFed.valueOf());
        if (now.valueOf() - lastFed.valueOf() > 3600000 * 2) {
            animalList[index].isFed = false;
            localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
            return;
        }
    }, []);


    const feed = () => {
        if(!isNumericLiteral.isFed) {
            setAnimal({ ...animal, isFed: true, lastFed: new Date() });
            setTime(new Date());
            animalList[index].isFed = true;
            animalList[index].lastFed = new Date();
            localStorage.setItem('listOfAnimals', JSON.stringify(animalList));
            return;
        }
    }
    return(
        <div>
            <h5>{animal.latinName}</h5>
            <img src={animal.imageUrl} alt={animal.latinName} />
            <p>{animal.longDescription}</p>
            <p>{time.toUTCString()}</p>
            <button
            onClick={feed} >
                Feeds { animal.name}
            </button>
        </div>
    )

  }