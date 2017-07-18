import { evaluate, Spec } from './evaluator'
import crs from '../../src/data/canada/crs'
import { Person } from '../../src/definitions/Person'
import { ScoreSystem } from '../../src/definitions/ScoreSystem'
import { calcScore } from '../../src/calculators/calcScore'
import { alice, bob, ulysses } from './guys'

// console.info(convertLanguageTestScores(alice.languageTests[0].scores, languageTestProfiles[0].equivalency.ielts))

const spec: Spec<[Person, ScoreSystem], number>[] = [
    [
        "alice",
        [
            alice,
            crs
        ],
        479,
    ],
    [
        "bob",
        [
            bob,
            crs
        ],
        336,
    ],
    [
        "ulysses",
        [
            ulysses,
            crs
        ],
        361,
    ],
]

evaluate(spec, (person, spec) => calcScore(person, spec).score)
