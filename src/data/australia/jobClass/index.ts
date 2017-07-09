import { JobClassification, JobGroup } from '../../../definitions/auxiliary/JobClassification'

const sol: JobGroup = {
    jobGroupId: 'sol',
    system: 'aus-job-class',
    designation: '',
    lineage: []
}

const csol: JobGroup = {
    jobGroupId: 'csol',
    system: 'aus-job-class',
    designation: '',
    lineage: []
}

const australiaJobClassification: JobClassification = {
    classificationSystemId: 'aus-job-class',
    regionId: 'australia',
    title: {
        en: 'Skilled occupations',
    },
    titleShort: {
        en: 'SOL',
    },
    version: '2016',
    jobGroups: {
        sol,
        csol,
    },
    reference: {
        url: 'https://www.border.gov.au/Trav/Work/Work/Skills-assessment-and-assessing-authorities/skilled-occupations-lists',
    },
}

/**/
export default australiaJobClassification
