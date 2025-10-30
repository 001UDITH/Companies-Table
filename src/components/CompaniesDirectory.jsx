import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function CompaniesDirectory() {
  const notify = () => toast('Filter Reset completed !');

  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const getData = async () => {
    try {
      const { data } = await axios.get("/companies.json");
      setCompanies(data);
      setFiltered(data);
    } catch (err) {
      setError("Failed to load company data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (s, loc, ind) => {
    let result = companies;

    if (s) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(s.toLowerCase())
      );
    } else if (loc) {
      result = result.filter((c) => c.location === loc);
    } else if (ind) {
      result = result.filter((c) => c.industry === ind);
    }
    setFiltered(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;


    const newSearch = name === "search" ? value : search;
    const newLocation = name === "location" ? value : location;
    const newIndustry = name === "industry" ? value : industry;

    if (name === "search") setSearch(value);
    if (name === "location") setLocation(value);
    if (name === "industry") setIndustry(value);

    handleFilter(newSearch, newLocation, newIndustry);
  };


  const resetFilter = () => {
    setSearch("");
    setLocation("");
    setIndustry("");
    setFiltered(companies);
  };

  const locations = [...new Set(companies.map((c) => c.location))];
  const industries = [...new Set(companies.map((c) => c.industry))];

  if (error) return <p>{error}</p>;

  return (
    <div className="title-table-wrapper">
      <h2>Companies Directory</h2>

      <div className="input-btn-wrap">
        <input
          type="text"
          placeholder="Search by name"
          name="search"
          value={search}
          onChange={handleChange}
        />

        <select
          value={location}
          onChange={handleChange}
          name="location"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={industry}
          onChange={handleChange}
          name="industry"
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <button  className="common-btn"  onClick={() => { resetFilter(); notify(); }}>Reset</button>
        <ToastContainer />
      </div>

      <table border="1" cellPadding="5" className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Industry</th>
          </tr>
        </thead>
        <tbody>
  {filtered.length > 0 ? (
    filtered.map((c) => (
      <tr key={c.id}>
        <td data-label="ID">{c.id}</td>
        <td data-label="Company Name">{c.name}</td>
        <td data-label="Location">{c.location}</td>
        <td data-label="Industry">{c.industry}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="error">No results found</td>
    </tr>
  )}
</tbody>

      </table>
    </div>

  );
}

export default CompaniesDirectory;
