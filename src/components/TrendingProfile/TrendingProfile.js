import React from 'react'

const TrendingProfile = ({profile}) => {
    return (
        <div className="trending__profileCard flexColumn flexAlignCenter flexCenter">
            <img src={profile.picture_url} className="trending__profileImage" alt="UserImage" id="trendingImgProfile" />
            <div className="trending__profileName flexRow flexAlignCenter">
                <span>{profile.name}</span>
            </div>
            <div className="trending__profileCollege flexRow flexAlignCenter">
                <span>{profile.portfolio.college.split(',')[0]}</span>   
            </div>   
            <div className="trending__profileViews flexRow flexAlignCenter">       
                <span>{profile.portfolio.views}{" "}Views</span>
            </div>
        </div>
    )
}

export default TrendingProfile
