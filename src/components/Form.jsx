
import { useState, useEffect } from "react";
import '../App.css'


export const Form = () => {

    const [page, setpage] = useState(1);

    useEffect(() => {
        getData()
        // console.log(form)

    }, [page])

    const [data, setdata] = useState([]);
    const [dummy, setDummy] = useState(false)



    const [form, setform] = useState({
        name: "",
        age: "",
        address: "",
        salary: "",
        department: "",
        marital_status: ""
    });
    const handleChange = (e) => {

        const { name, value } = e.target
        // console.log(e.target)
        console.log(form)
        setform({
            ...form,
            [name]: e.target.type === "checkbox" ? e.target.checked : value,

        })


    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)

        fetch("http://localhost:3001/formData", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            }
        }).then(() => {

            getData()
        })
    }



    const handleSort = () => {


        setdata(() => data.sort((a, b) => {
            return a.salary - b.salary;
        }))

        console.log("Sort data ::", data);
        setDummy(dummy === "true" ? "false" : "true")



    }

    const handleFilter = (e) => {

        const dep = e.target.value
        console.log(dep)


        fetch(`http://localhost:3001/formData`).then((d) =>
            d.json()).then((res) => {

                var Newdata = res.filter(function (el) {
                    return el.department === dep
                }
                );

                setdata(Newdata)

                // console.log("DATA :", data)
            })



    }

    const handleDelete = (e) => {

        console.log(e)
        fetch(`http://localhost:3001/formData/${e}`, {
            method: "DELETE",

        }).then(() => {

            getData()
        })
    }



    const getData = () => {

        fetch(`http://localhost:3001/formData?_page=${page}&_limit=5`).then((d) =>
            d.json()).then((res) => {

                setdata(res)
                // console.log("DATA :", data)
            })

    }

    // const appendData = (data) => {

    //     console.log("DATA :", data)
    // }

    return <div>
        <div>
            <form onSubmit={handleSubmit}>

                <input type="text" name="name" placeholder="User name Here" onChange={handleChange} />
                <input type="number" name="age" placeholder="User age Here" onChange={handleChange} />
                <input type="text" name="address" placeholder="User Address Here" onChange={handleChange} />
                <input type="number" name="salary" placeholder="User salary Here" onChange={handleChange} />

                <select name="department" onChange={handleChange} type="input"  >
                    <option value="">choose an Department</option>
                    <option value="FT-WEB" name="department">FT Web</option>
                    <option value="AND" name="department" >Android</option>
                    <option value="UIX" name="department" >UI UX</option>

                </select>

                Marital Status :

                <input type="radio" name="marital_status" value="married" onClick={handleChange} /> Married
                <input type="radio" name="marital_status" value="not married" onClick={handleChange} />Not Married

                <button type="submit" >Submit</button>
            </form>
        </div>
        <div>
            <h4>Filter by department : </h4>
            <select name="department" onChange={handleFilter} type="input"  >
                <option value="">choose an Department</option>
                <option value="FT-WEB" name="department">FT Web</option>
                <option value="AND" name="department" >Android</option>
                <option value="UIX" name="department" >UI UX</option>

            </select>

            <button disabled={page === 1} onClick={() => { setpage(page < 2 ? 1 : page - 1) }}> Pre </button>
            <button onClick={() => { setpage(page + 1) }}> Next </button>
            <button onClick={() => { handleSort() }}>Sort By Ascending Salary </button>

            <table className="tableDiv">
                <thead>
                    <tr>
                        <th>Name</th> <th>Age</th> <th>Address</th> <th>Salary</th> <th>Department</th> <th>Marital Status</th>
                    </tr>
                </thead>
                <tbody>



                    {data.map((e) => <tr> <td><h4>{e.name} </h4> </td><h4>{e.age} </h4> <td><h4>{e.address} </h4> </td><h4>{e.salary} </h4> <td> <h4>{e.department} </h4></td>     <td><h4>{e.marital_status} </h4></td> <td><h4 onClick={() => { handleDelete(e.id) }}>Delete </h4></td></tr>)}


                </tbody>


            </table>


        </div>


    </div>



}