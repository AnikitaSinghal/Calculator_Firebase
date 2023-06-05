import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
const TABLE_HEAD = ["","Name", "Calculations", "Result", "Action"];

export default function Table() {
  const [data, setData] = useState([]);

  const url = "http://localhost:8080/api/operatorDetails";

  const fetchOperations = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      console.log(json)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    fetchOperations();
  }, []);

  const updateoperation = async (id) => {
    try {
      //const {id}=req.params;
      const response = await axios.put(`http://localhost:8080/api/update/${id}`);
      console.log('Data Updated', response.id);
    } catch (error) {
      console.log('Error updating data', error)
    }
  }

  const deleteoperation = async (id) => {
    try {
      //const id=req.params.id;
      const response = await axios.delete(`http://localhost:8080/api/delete/${id}`);
      console.log('Data deleted', response);
    } catch (error) {
      console.log('Error deleting data', error)
    }
  }


  return (
    <Card className=" h-75 w-75 flex justify-end m-6">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
              <th scope="row">{index+1}</th>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data[id].Name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data[id].operation}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data[id].result}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue" >
                  <div className="flex w-max gap-2">
                    <Button color="blue" onClick={(id)=>updateoperation(id)}>Edit</Button>
                    <Button color="pink" onClick={(id) => deleteoperation(id)}>Delete</Button>
                  </div>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}