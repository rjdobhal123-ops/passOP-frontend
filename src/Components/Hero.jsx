
import { useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';




const Hero = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [form, setForm] = useState({ website: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        const req = await fetch("http://localhost:3000/");
        const data = await req.json();
        setpasswordArray(data);
    }

    useEffect(() => {
        getPasswords()
    }, [])


    //For Saving Passwords
    const savePassword = async () => {


        if (form.website.length === 0 && form.username.length == 0 && form.password.length == 0) {
            return toast('Error: No input!', { theme: "dark" });
        }
        if (form.website.length < 3) {
            return toast('Error: URL is too short!', { theme: "dark" });
        }
        if (form.username.length < 3) {
            return toast('Error: username is too short!', { theme: "dark" });
        }
        if (form.password.length < 8) {
            return toast('Error: Password is weak!', { theme: "dark" });
        }

        const newPassword = {
            ...form,
            id: uuidv4()
        };



        setpasswordArray([
            ...passwordArray,
            newPassword
        ]);

        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword) });

        setForm({ website: "", username: "", password: "" })
        toast('Saved Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    }




    //For updating the form value
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    //For copying Text
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('📝copied!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    //For Editing the previous inputs
    const handleEdit = (id) => {
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    //For deleting the credentials
    const handleDelete = async (id) => {
        let cancel = confirm("Do you really want to delete password?")

        if (cancel) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let response = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            
            toast('Credentials Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }




    return (

        <div className='font-serif'>

            {/* Toast container */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className=' flex flex-col items-center my-2 p-4'>
                <h1><div className="logo font-bold text-5xl my-4">
                    <span> &lt;pass</span>
                    <span className='text-green-400'>OP&gt;</span>
                </div></h1>

                <p className='text-xl md:text-2xl m-0 p-0'><span>Take control of your digital security</span> </p>
                <p className='text-2xl md:text-4xl m-0 p-0'><span className='text-green-500'>with our password manager</span></p>
            </div>

            <div className="hero w-full h-auto  mx-auto flex  justify-center">
                <div className='w-3/4 h-auto  flex flex-col items-center gap-6 p-6'>

                    {/* Website url */}
                    <div className='w-full flex justify-center'>
                        <input
                            onChange={handleChange} value={form.website} className='w-3/4 border-2 border-green-600 rounded-full px-4 py-2' placeholder="Add website URL" type="text" name='website' />


                    </div>

                    {/* username and password */}
                    <div className='flex  justify-center gap-2 md:gap-6 w-full'><input onChange={handleChange} value={form.username} className='px-4 py-2 w-1/3 border-2 border-green-600 rounded-full' placeholder='Username' type="text" name='username' />
                        <input required onChange={handleChange} value={form.password} className='px-4 py-2 w-1/3 border-2 border-green-600 rounded-full' placeholder='Password' type={showPassword ? "text" : "password"} name='password' />
                        <span className='cursor-pointer flex  justify-center m-0'>
                            <img onClick={() => setshowPassword(!showPassword)} className='py-2' width={26} src={showPassword ? "/eye.png" : "/hidden.png"} alt="" />
                        </span>

                    </div>


                    {/* Add button */}

                    <button onClick={savePassword} className=' flex justify-center items-center gap-2 text-lg text-black px-2 py-2 rounded-full bg-green-500 w-[100px]  hover:w-[110px] ring-1 ring-white'>
                        <img width={20} src="/add-folder.png" alt="" /><span>Save</span></button>

                </div>
            </div>


            {/* Table section for showing passwords*/}
            <div className='mx-10 md:mx-52  text-lg'> <span className='font-bold underline'>Your Passwords</span>{passwordArray.length === 0 && <div >no passwords to show</div>}</div>


            {passwordArray.length !== 0 &&
                <div className='flex flex-col justify-center items-center gap-2 my-4 w-full overflow-x-auto mx-2'>
                    <table className="table-auto mb-20 text-center border border-2 border-green-800 rounded-lg md:rounded-xl w-3/4 md:w-3/4 overflow-hidden">
                        <thead className='text-white bg-green-800 text-sm md:text-md'>
                            <tr>
                                <th className='px-2 md:px-2  border-r-2'>Website</th>
                                <th className='px-2 md:px-2 border-r-2'>Username</th>
                                <th className='px-2 md:px-2 border-r-2'>Password</th>
                                <th className='px-2 md:px-2 border-r-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((items, index) => {
                                return <tr key={index}>
                                    <td className='p-2  border-r-2 overflow-x-auto'> <div className='flex justify-between gap-3 items-center'>
                                        <span><a href={items.website}>{items.website}</a></span><img className='hover:scale-95 cursor-pointer' onClick={() => { copyText(items.website) }} width={12} src="/copy.png" alt="" /></div></td>
                                    <td className='p-2 border-r-2 overflow-x-auto '> <div className='flex justify-between gap-3 items-center'> <span>{items.username}</span><img className='hover:scale-95 cursor-pointer' onClick={() => { copyText(items.username) }} width={12} src="/copy.png" alt="" /></div></td>
                                    <td className='p-2 border-r-2 overflow-x-auto '> <div className='flex justify-between gap-3 items-center'> <span>{".".repeat(items.password.length)}</span><img className='hover:scale-95 cursor-pointer' onClick={() => { copyText(items.password) }} width={12} src="/copy.png" alt="" /></div></td>

                                    <td className='flex justify-around gap-2 p-2 mx-3'>
                                        <span onClick={() => { handleEdit(items.id) }} className='cursor-pointer hover:scale-95'><img className=' md:w-[20px]' src="/edit.png" alt="" /></span>
                                        <span onClick={() => { handleDelete(items.id) }} className='cursor-pointer hover:scale-95'><img className=' md:w-[20px]' src="/bin.png" alt="" /></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>}



        </div>
    )
}

export default Hero
