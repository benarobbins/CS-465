export interface Trip {
    _id: string, // Internal primary key in MongoDB
    code: string,
    name: string,
    length: string,
    starte: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string
}