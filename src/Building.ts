

enum BuildingType {
    GARAGE = "Гараж",
    HOUSE = "Дом",
    GARDEN = "Сад"
}

interface IBuilding {
    readonly id: number
    readonly title: String
    readonly floors: number,
    readonly squarePerFloor: number,
    readonly people: number,
    readonly squarePerPerson: number
}

abstract class Building implements IBuilding {
    readonly id: number
    readonly floors: number;
    readonly people: number;
    readonly squarePerFloor: number;
    readonly squarePerPerson: number;
    readonly title: String;

    constructor(floors: number, people: number, squarePerFloor: number, title: String) {
        this.id = Math.random()
        this.floors = floors
        this.people = people
        this.squarePerFloor = squarePerFloor
        this.title = title
        this.squarePerPerson = people !== 0 ? squarePerFloor / people : 0
    }
}

class House extends Building {
}

class Garden extends Building {
    gardenSquare: number

    constructor(floors: number, people: number, squarePerFloor: number, title: String, gardenSquare: number) {
        super(floors, people, squarePerFloor, title)
        this.gardenSquare = gardenSquare
    }
}

class Garage extends Building {
    constructor(floors: number, squarePerFloor: number, title: String) {
        super(floors, 0, squarePerFloor, title)
    }
}

export type { IBuilding, Building }
export  { Garage, Garden, House, BuildingType }