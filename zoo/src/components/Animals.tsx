import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { animalList, getDateFromStorage, now } from '../storage/ToggleListOfAnimals'
import { IAnimal } from '../models/IAnimal'
import '../styles/animals.css'

/* https://animals.azurewebsites.net/api/animals" */

export const Animals = () => {
    const [ animals, setAnimals ] = useState<IAnimals[]>([]);
    let hungryAnimal: boolean;
    let lastFed: Date; 
    let itsSameDay: boolean; 
    let lastFedTimeAgo: number; 

    useEffect(() => {
        if (animals.length !== 0) return; 
        setAnimals(animalList);
    });

    return (
        <>
        <h1>ZOO</h1>
        <div className='container'>{
            animals.map((animal) => {
                hungryAnimal = lastFedTimeAgo >= 3600000 * 4;
                lastFed = getDateFromStorage(lastFed, animal);
                itsSameDay =  lastFed.getUTCDate() == now.getUTCDate();
                lastFedTimeAgo = now.valueOf() - lastFed.valueOf();

                if ( hungryAnimal) {
                    return (
                        <div key={animal.id} className='img-container'>
                            <Link to={"/animal/" + animal.id}>
                                <h3>{animals.name} (needs to be fed)</h3>
                                <img src={animal.imageURL} alt={animals.latinName} />
                                <p>{animals.shortDescription}</p>
                            </Link>
                        </div>
                    )
                } else {
                    return (
                        <div key={animal.id} className='img-container'>
                            <Link to={"/animal/" + animal.id}>
                                <h3>{animals.name}</h3>
                                <img src={animal.imageURL} alt={animal.latinName} />
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

