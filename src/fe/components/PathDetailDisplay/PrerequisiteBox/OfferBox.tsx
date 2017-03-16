import * as React from 'react'

import {
    OfferPrereq
} from '../../../../data/common'

const OfferBox = (props: {prereq: OfferPrereq}) => {
    return (
        <div>
            You have offer from {props.prereq.employer.regionId}
        </div>
    )
}

export default OfferBox