import { useState,useEffect } from "react";
import JSONdata from './data.json'

const Table = () => { 
  const [data, setData] = useState(JSONdata)
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDestination, setFilterDestination] = useState("")
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() =>{
    console.log(JSONdata)
    let id = 1;
    const jsonArrayWithId = JSONdata.map(obj => {
    return {...obj, id: id++};
    });
    setData(jsonArrayWithId)
  },[])

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleStatusFilter = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleLocationFilter = (event) => {
    setFilterLocation(event.target.value)
  };

  const handleDestinationFilter = (event) => {
    setFilterDestination(event.target.value)
  }

  const handleUpdateData = (id, field, value) => {
    const newData = [...data];
    const index = newData.findIndex((d) => d.id === id);
    newData[index][field] = value;
    setData(newData);
  };

  const sortedData = sortColumn
    ? [...data].sort((a, b) =>
        sortOrder === "asc"
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn]
      )
    : [...data];

  const filteredData = filterStatus
    ? sortedData.filter((d) => d.status === filterStatus)
    : sortedData;
  const filteredData2 = filterLocation
    ? filteredData.filter(
        (d) =>
        d.source.toLowerCase().startsWith(filterLocation.toLowerCase())
      )
    : filteredData;
    const filteredData3 = filterDestination
    ? filteredData2.filter(
        (d) =>
          d.destination.toLowerCase().startsWith(filterDestination.toLowerCase())
      )
    : filteredData2;

  return (
    <div>
        <div className="filter-boxes">
        <div className="filter-box">
            <span className="filter-text">Filter by Status:</span>
            <div className="select-wrapper">
            <select value={filterStatus} onChange={handleStatusFilter}>
                <option value="">All</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
            </select>
            </div>
        </div>
        <div className="filter-box">
            <span className="filter-text">Filter by Source:</span>
            <input
            type="text"
            placeholder="Enter Source"
            value={filterLocation}
            onChange={handleLocationFilter}
            />
        </div>
        <div className="filter-box">
            <span className="filter-text">Filter by Destination:</span>
            <input
            type="text"
            placeholder="Enter Destination"
            value={filterDestination}
            onChange={handleDestinationFilter}
            />
        </div>
        </div>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Shipper</th>
            <th>
                Weight (kg) 
                <button onClick={() => handleSort("weight")} style={{backgroundColor:'grey',marginLeft:'5px'}}>
                    {sortColumn === "weight" ? (sortOrder === "asc" ? "↑" : "↓"):("↓")}
                </button> 
            </th>
            <th>
                Cost (₹)
                <button onClick={() => handleSort("cost")} style={{backgroundColor:'grey',marginLeft:'5px'}}>
                    {sortColumn === "cost" ? (sortOrder === "asc" ? "↑" : "↓"):("↓")}
                </button> 
            </th>
            <th>Source</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData3.map((item) => (
            <tr key={item.id}>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.user}
                    onChange={(e) =>
                      handleUpdateData(item.id, "user", e.target.value)
                    }
                  />
                ) : (
                  item.user
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.shipper}
                    onChange={(e) =>
                      handleUpdateData(item.id, "shipper", e.target.value)
                    }
                  />
                ) : (
                  item.shipper
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.weight}
                    onChange={(e) =>
                      handleUpdateData(item.id, "weight", e.target.value)
                    }
                  />
                ) : (
                  item.weight
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.cost}
                    onChange={(e) =>
                      handleUpdateData(item.id, "cost", e.target.value)
                    }
                  />
                ) : (
                  item.cost
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.source}
                    onChange={(e) =>
                      handleUpdateData(item.id, "source", e.target.value)
                    }
                  />
                ) : (
                  item.source
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input
                    type="text"
                    value={item.destination}
                    onChange={(e) =>
                      handleUpdateData(
                        item.id,
                        "destination",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  item.destination
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleUpdateData(item.id, "status", e.target.value)
                    }
                  >
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <button onClick={() => setEditingRow(null)}>Save</button>
                ) : (
                  <button onClick={() => setEditingRow(item.id)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
