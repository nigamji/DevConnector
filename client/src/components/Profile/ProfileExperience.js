import React, { Fragment } from 'react'
import Moment from 'react-moment'
const ProfileExperience = (props) => {
    return (
        <Fragment>
            <h3 className="text-dark">{props.experience.company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{props.experience.from}</Moment> - {!props.experience.to ?
                    'Now'
                    : <Moment format="YYYY/MM/DD">{props.experience.to}</Moment>}
            </p>
            <p><strong>Position: </strong>{props.experience.title}</p>
            <p>
                <strong>Description: </strong>{props.experience.description && (props.experience.description)}
            </p>
        </Fragment>
    )
}

export default ProfileExperience
