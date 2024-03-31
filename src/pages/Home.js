import '../App.css';

export const Home = () => {
    return (
        <div className="flex w-full h-screen justify-center pt-[73px]">
            <div className="sides"></div>
                <div className=''>

                </div>
            <div className='w-[52%] bg-lighter-white'>

            </div>

            <div className="sides">
                <div className='flex flex-col gap-[10px] w-[90%] h-fit mt-[22px] bg-lighter-white rounded-[12px] p-[10px]'>
                    <h3 className='text-[20px]'>Lates Updates</h3>
                    <ul className='flex flex-col gap-[5px]'>
                        <li className='flex w-full justify-between h-fit'>
                            <div className='flex flex-col'>
                                <span className='text-[16px]'>Title</span>
                                <span className='text-[12px]'>Posted by:</span>
                            </div>
                            <button className='text-[14px]'>View</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}