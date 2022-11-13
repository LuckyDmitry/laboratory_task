import {Dispatch, SetStateAction, useState} from 'react'
import {BuildingType, Garage, Garden, House, IBuilding} from "./Building";
import {InputComponent, InputType} from "./InputComponent";

const descending = (lhs: IBuilding, rhs: IBuilding) => {
    if (lhs.squarePerPerson < rhs.squarePerPerson) {
        return 1;
    }
    if (lhs.squarePerPerson > rhs.squarePerPerson) {
        return -1;
    }
    return 0;
}

const ascending = (lhs: IBuilding, rhs: IBuilding) => {
    return descending(lhs, rhs) * -1
}

const App: React.FC = () => {
    const[buildingTitle, setBuildingTitle] = useState('')
    const[squarePerFloor, setSquarePerFloor] = useState('')
    const[floors, setFloors] = useState('')
    const[people, setPeople] = useState('')
    const[squareOfProperty, setSquareOfProperty] = useState('')
    const [buildings, setBuildings] = useState<IBuilding[]>([])
    const [value, setValue] = useState(BuildingType.HOUSE)
    const [sortDown, setSortDown] = useState(true)

    const addBuilding = () => {
        const floorsAsNumber = Number(floors)
        const peopleAsNumber = Number(people)
        const squarePerFloorAsNumber = Number(squarePerFloor)

        if (value === BuildingType.HOUSE) {
            setBuildings(buildings.concat([ new House(floorsAsNumber, peopleAsNumber, squarePerFloorAsNumber, buildingTitle)]))
        } else if (value === BuildingType.GARAGE) {
            setBuildings(buildings.concat([ new Garage(floorsAsNumber, squarePerFloorAsNumber, buildingTitle)]))
        } else if (value === BuildingType.GARDEN) {
            const squareOfPropertyAsNumber = Number(squareOfProperty)
            setBuildings(buildings.concat([ new Garden(floorsAsNumber, peopleAsNumber, squarePerFloorAsNumber, buildingTitle, squareOfPropertyAsNumber)]))
        }
    }

    const onAddClick = () => {
        addBuilding()
        setBuildingTitle("")
        setSquareOfProperty("")
        setSquarePerFloor("")
        setPeople("")
        setFloors("")
    }

    const active = () => {
        const mainCondition = buildingTitle.length !== 0 && squarePerFloor.length !== 0 && floors.length !== 0
        if (value === BuildingType.HOUSE) {
            return mainCondition && people.length !== 0
        } else if (value === BuildingType.GARAGE) {
            return mainCondition
        } else if (value === BuildingType.GARDEN) {
            return mainCondition && people.length !== 0 && squareOfProperty.length !== 0
        }
        return false
    }

    const sortActive = () => {
        return buildings.length > 1
    }

    const sortByDescending = () => {
        const copy = [...buildings]
        copy.sort(descending)
        setSortDown(true);
        setBuildings(copy);
    }

    const sortByAscending = () => {
        const copy = [...buildings]
        copy.sort(ascending)
        setSortDown(false);
        setBuildings(copy);
    }

    return (
        <div className={'my-2 mx-2'}>
            { InputComponent("Название", buildingTitle, setBuildingTitle ) }
            { InputComponent("Площадь этажа", squarePerFloor, setSquarePerFloor, InputType.number ) }
            { value !== BuildingType.GARAGE &&
                InputComponent("Количество людей", people,  setPeople, InputType.number)
            }
            { InputComponent("Количество этажей", floors, setFloors, InputType.number ) }

            { value === BuildingType.GARDEN &&
                InputComponent("Площадь сада", squareOfProperty, setSquareOfProperty, InputType.number )
            }
            { DropdownComponent(value, setValue) }
            <button type="button"
                    onClick={onAddClick}
                    disabled={!active()}
                    className="inline-flex mx-3 my-3 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Добавить элемент
            </button>
            <button type="button"
                    onClick={sortByAscending}
                    disabled={!sortActive()}
                    className="inline-flex mx-3 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Сортировать по возрастанию
            </button>
            <button type="button"
                    onClick={sortByDescending}
                    disabled={!sortActive()}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Сортировать по убыванию
            </button>
        <ul>{buildings.map(building => {
            return <li key={building.id}>
                <label> title: {building.title }, </label>
                <label> square per person: {building.squarePerPerson} </label>
            </li>
        })}</ul>
    </div>
    )
}

export { App }

function DropdownComponent(value: BuildingType, setter: Dispatch<SetStateAction<BuildingType>>) {
    return (
        <div className="relative my-2 w-1/5 lg:max-w-sm">
            <select value={value} onChange={event => {
                if (event.target.value === BuildingType.GARDEN) {
                    setter(BuildingType.GARDEN)
                } else if (event.target.value === BuildingType.GARAGE) {
                    setter(BuildingType.GARAGE)
                } else if (event.target.value === BuildingType.HOUSE) {
                    setter(BuildingType.HOUSE)
                }
                console.log(value)
            }} className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>{BuildingType.HOUSE}</option>
                <option>{BuildingType.GARAGE}</option>
                <option>{BuildingType.GARDEN}</option>
            </select>
        </div>
    );
}
