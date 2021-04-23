import React, { Fragment } from 'react'
import Moment from 'react-moment'
const ProfileEducation = (props) => {
    return (
        <Fragment>
            <h3 className="text-dark">{props.education.school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{props.education.from}</Moment> - {!props.education.to ?
                    'Now'
                    : <Moment format="YYYY/MM/DD">{props.education.to}</Moment>}
            </p>
            <p><strong>Degree: </strong>{props.education.degree}</p>
            <p><strong>Field Of Study: </strong>{props.education.fieldofstudy}</p>
            <p>
                <strong>Description: </strong>{props.education.description && (props.education.description)}
            </p>
        </Fragment>
    )
}

export default ProfileEducation
