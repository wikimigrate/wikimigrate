import { JobClassification, JobGroup } from '../../../../definitions/auxiliary/JobClassification'

// See: http://noc.esdc.gc.ca/English/noc/Introduction.aspx?ver=16#struc

export const noc2016: JobClassification = {
    classificationSystemId: 'noc2011',
    regionId: 'canada',
    title: {
        en: 'National Occupational Classification',
    },
    titleShort: {
        en: 'NOC',
    },
    jobGroups: {
    },
    jobTypes: [],
    reference: {
        url: 'http://noc.esdc.gc.ca/English/NOC/OccupationIndex.aspx?ver=16',
    },
}

export default noc2016
