import React, { Fragment } from 'react'

const ProfileAbout = (props) => {
    //bio, skills, name
    return (
        <div className="profile-about bg-light p-2">
            {props.profile.bio && (
                <Fragment>
                    <h2 className="text-primary">{`${props.profile.user.name.trim().split(' ')[0]}'s Bio`}</h2>
                    <p>{props.profile.bio}</p>
                </Fragment>
            )}
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {props.profile.skills.map((skill, index) => (
                    <div key={index} className="p-1">
                        <i className="fas fa-check"></i>{skill}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default ProfileAbout
