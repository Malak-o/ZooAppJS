import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { animalList, getDateFromStorage, now } from '../storage/ToggleListOfAnimals'
import { IAnimal } from '../models/IAnimal'
import '../styles/animals.css'


export const Animals = () => {
    const [ animals, setAnimals ] = useState<IAnimal[]>([]);
    let hungryAnimal: boolean;
    let lastEat: Date; 
    let itsSameDay: boolean; 
    let lastFedTimeAgo: number; 

    useEffect(() => {
        if (animals.length !== 0) return; 
        setAnimals(animalList);
    });

    return (
        <>
        <h1> ~~~ | The animal Park, Zoo | ~~~ </h1>
        <div className='container'>{
            animals.map((animal) => {
                lastEat = getDateFromStorage(lastEat, animal);
                lastFedTimeAgo = now.valueOf() - lastEat.valueOf();
                itsSameDay =  lastEat.getUTCDate() == now.getUTCDate();
                hungryAnimal = lastFedTimeAgo >= 3600000 * 4;


                if ( hungryAnimal) {
                    return (
                        <div key={animal.id} className='img-container'>
                            <Link to={"/animal/" + animal.id}>
                                <h3>{animal.name} (Needs to be fed)</h3>
                                <img src={animal.imageUrl} alt={animal.latinName} />
                                <p>{animal.shortDescription}</p>
                            </Link>
                        </div>
                    )
                } else {
                    return (
                        <div key={animal.id} className='img-container'>
                            <Link to={"/animal/" + animal.id}>
                                <h3>{animal.name}</h3>
                                <img src={animal.imageUrl} alt={animal.latinName} />
                                <p>{animal.shortDescription}</p>
                            </Link>
                        </div>
                    )
                }

            })
        }
        </div>
    </>
    )
}

