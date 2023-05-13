import { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [exfile, setFileData] = useState([]);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      await axios.post("http://localhost:5000/upload", formData);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getList = async (e) => {
    try {
      const res = await axios.get("http://localhost:5000/getExData");
      const {
        data: { list, fileName },
      } = res.data;
      console.log("res", fileName, Object.values(JSON.parse(list))[0]);
      const value = Object.values(JSON.parse(list))[0];
      if (!!value) {
        setFileData(value);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="App">
      <h1> Upload file </h1>
      <hr/>
      <div className="upload">
      <input type="file" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      </div>
      <hr/>
      <h1> File Data </h1>
      {exfile.length ? (
        <table style={{ width: "100%" }}>
          {exfile.map((data) => (
            <tr>
              <td>{data["A"]}</td>
              <td>{data["B"]}</td>
              <td>{data["C"]}</td>
              <td>{data["D"]}</td>
            </tr>
          ))}
        </table>
      ) : (
        <div className="fetch">
        <h3>No Data</h3>
        <button onClick={() => getList()}>Get Data</button>
        </ div>
      )}
      
    </div>
  );
}

export default App;
