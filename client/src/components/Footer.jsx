

export default function Footer() {

    const githubURL = 'data:image/png;base64,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';
    const facebookURL = 'data:image/png;base64,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';
    const linkedURL = 'data:image/png;base64,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'
    return (

    <div className='bg-gray-800 py-4 w-full  absolute bottom-0'>
        <div  className='flex text-white items-center justify-around  mx-auto'>
            <h1 className='italic'> © 2024 DatK application. All Rights Reserved</h1>
            <ul className='flex gap-10'>
            <a href="https://github.com/Dat02/mern-auth" target="_blank" >
                <img src={githubURL} className = 'h-10 w-10 self-center cursor-pointer rounded-full object-cover mt-3'/>
            </a>
            <a href="https://facebook.com/datnguyendinh.hust" target="_blank" >
                <img src={facebookURL} className = 'h-10 w-10 self-center cursor-pointer rounded-full object-cover mt-3'/>
            </a>
            <a href="https://www.linkedin.com/in/dinhdat02" target="_blank" >
                <img src={linkedURL} className = 'h-10 w-10 self-center cursor-pointer rounded-full object-cover mt-3'/>
            </a>
                
            </ul>
        </div>
    </div>
  )
}