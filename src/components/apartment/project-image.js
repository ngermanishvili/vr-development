import React from 'react'

const ProjectImage = ({ onImageClick, isFullscreen }) => {
    return (
        <div className={`${isFullscreen ? 'h-screen' : 'md:h-screen'} h-[400px] cursor-pointer`} onClick={onImageClick}>
            <img className='w-full h-full object-cover' src="/shekvetili/shekvetili.webp" alt="Project Image" />
        </div>
    )
}

export default ProjectImage