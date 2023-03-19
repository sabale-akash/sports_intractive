import React, { useState, useEffect } from "react";
import "./index.css"

const PlayerList=()=> {
  const [players, setPlayers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data?.playerList);
        console.log(data && data?.playerList, "::::::adsdsdf");
      });
  }, []);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers =
    players &&
    players.filter(
      (player) =>
        player.TName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.PFName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedPlayers =
    filteredPlayers &&
    filteredPlayers.sort((a, b) =>
      sortOrder === "asc" ? a.Value - b.Value : b.Value - a.Value
    );

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name or team"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button onClick={handleSortOrderChange}>
          {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
        </button>
      </div>

      <div class="card-grid">
        {sortedPlayers &&
          sortedPlayers.length > 0 &&
          sortedPlayers.map((player) => (
            <div class="card" key={player.Id}>
              <img
                class="card-image"
                src={`/images/${player.Id}.jpg`}
                alt={player.PFName}
              />
              <div class="card-name">{`${player.PFName} (${player.SkillDesc})`}</div>
              <div class="card-value">{`Value: $${player.Value}`}</div>
              <div class="card-upcoming-match">{`Upcoming match: ${player.UpComingMatchesList[0].CCode} vs. ${player.UpComingMatchesList[0].VsCCode}`}</div>
              <div class="card-next-match-time">{`Next match time: ${new Date(
                player.UpComingMatchesList[0].MDate
              ).toLocaleString()}`}</div>
            </div>
          ))}
      </div>
    </>
  );
} 

export default PlayerList;
