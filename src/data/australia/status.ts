import { 
    Status,
    duration
 } from '../common'

export const citizenship: Status = {
    id: "citizen",
    regionId: "australia",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

export const visa189holder: Status = {
    id: "189",
    regionId: "australia",
    name: {
        en: "Permanent Residence(189)"
    },
    rights: [
        "work",
        "study",
        "medicare",
    ],
    duration: duration(5, "year"),
}

export const pr: Status = {
    id: "permanent",
    regionId: "australia",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

export const alien: Status = {
    id: "alien",
    regionId: "australia",
    name: {
        en: "Alien"
    },
    rights: [],
}