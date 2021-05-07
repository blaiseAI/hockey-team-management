import React , {useState, useEffect} from 'react';
import Dexie from "dexie";
function Players() {
  //set the database 
  const db = new Dexie("players_db");
  //create the database store
  db.version(1).stores({
    players: "++id, first_name, last_name, gender, dateOfBirth, city, team, rank, achievement, file"
})
  db.open().catch((err) => {
      console.log(err.stack || err)
  })
  
  //set the state and property
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("Edmonton");
  const [team, setTeam] = useState("Edmonton Oilers");
  const [rank, setRank] = useState("");
  const [achievement, setAchievement] = useState("");
  const [file, setFile] = useState("");
  const [players, setPlayers] = useState("");




  // read the file and decode it
  const getFile = (e) => {
      console.log(e[0].name);
      setFile(e[0].name);
  }
  // Delete
  const deletePlayer = async(id) => {
      console.log(id);
      var r = window.confirm(`Are you sure you want to delete player ${id}`);
        if (r === true)
          db.players.delete(id);
              let allPlayers = await db.players.toArray();
              //set the players
              setPlayers(allPlayers);
  }

// Edit
  const editPlayer = async(id, data) => {
    console.log(id);
        await db.items.update(id, data)
}

  //submit 
  const getPlayerInfo = (e) => {
    e.preventDefault();
        let player = {
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            dateOfBirth:dateOfBirth,
            city: city,
            team: team,
            rank: rank,
            achievement:achievement,
            file:file

        }
        db.players.add(player).then(async() => {
            //retrieve all players inside the database
            let allPlayers = await db.players.toArray();
            //set the players
            setPlayers(allPlayers);
        });
}
useEffect(() => {

  //get all players from the database
  const getPlayers = async() => {
      let allPlayers = await db.players.toArray();
      setPlayers(allPlayers);
  }
  getPlayers();

}, [])

let playerData;
if(players.length > 0) {
      
  playerData = <div className="playerContainer">
          <thead className="thead-range-light">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">City</th>
            <th scope="col">Team</th>
            <th scope="col">Rank</th>
            <th scope="col">Achievements</th>
            <th scope="col">Photo</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
              {
                  players.map(player => {
                      return(
                        <tr key={player.first_name}>
                        <td>{player.first_name}</td>
                        <td>{player.last_name}</td>
                        <td>{player.gender}</td>
                        <td>{player.dateOfBirth}</td>
                        <td>{player.city}</td>
                        <td>{player.team}</td>
                        <td>{player.rank}</td>
                        <td>{player.achievement}</td>
                        <td>{player.file}</td>
                        <td><button className="btn btn-danger" onClick={() => deletePlayer(player.first_name)}>Delete</button></td>
                      </tr>
                      )
                                  
                                  
                  })
              }
             </div>
}else{
  playerData = <div className="message">
               <p>There are no player to show</p>
             </div>
}
  return (
    <div className='container my-3'>
      <h1>Players Management</h1>
      <hr />
      <form onSubmit={getPlayerInfo}>
          <div className="form-row">
            <div className="col">
              <div class="form-group">
                <label for="first_name">First Name</label>
                <input type="text" name="first_name" required  onChange={e => setFirstName(e.target.value)} class="form-control" placeholder="Enter First Name"/>
              </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label for="last_name">Last Name</label>
                <input type="text" name="last_name" required  onChange={e => setLastName(e.target.value)} class="form-control" placeholder="Enter Last Name"/>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="input-type">Gender</label>
            <div id="input-type" class="row">
                <div class="col-sm-2">
                    <label class="radio-inline">
                        <input name="gender" required value="Male"  onChange={e => setGender(e.target.value)}  type="radio" />Male
                    </label>
                </div>
                <div class="col-sm-2">
                    <label class="radio-inline">
                        <input name="gender" required value="Female"  onChange={e => setGender(e.target.value)}  type="radio" />Female
                    </label>
                </div>
            </div>
          </div>
          
          <div class="form-group">
                <label for="dateOfBirth">DOB</label>
                <input type="date" name="dateOfBirth"   onChange={e => setDateOfBirth(e.target.value)} class="form-control" placeholder="Enter Dob"/>
          </div>

          <div className="form-row">
            <div className="col">
              <div class="form-group">
                <label for="city">Select City:</label>
                <select class="form-control" name="city" required  onChange={e => setCity(e.target.value)}  >
                  <option value="Edmonton">Edmonton</option>
                  <option value="Calgary">Calgary</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div class="form-group">
                <label for="team">Select Team:</label>
                <select class="form-control" name="team" required  onChange={e => setTeam(e.target.value)}  >
                  <option value="Edmonton Oilers">Edmonton Oilers</option>
                  <option value="Calgary Flames">Calgary Flames</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="rank">Rank</label>
            <input type="number" name="rank" required  onChange={e => setRank(e.target.value)}  class="form-control" placeholder="Enter Rank"/>
          </div>

           <div class="form-group">
            <label for="achievements">Achievements:</label>
            <textarea class="form-control" rows="5" name="achievements" required  onChange={e => setAchievement(e.target.value)}></textarea>
          </div> 

          <div class="form-group">
            <label for="photo">Upload photo</label>
            <input type="file" class="form-control-file" required name="file"  onChange={e => getFile(e.target.files)}/>
          </div>
            
            <input type="submit" className="btn btn-primary" value="Submit" />
            <input type="reset" className="btn btn-warning ml-3" value="Clear" />
        </form>
        <table className="table mt-4 table-striped">
               <tbody>
               {playerData}
               </tbody>
        </table>

    </div>
  )
}
export default Players;