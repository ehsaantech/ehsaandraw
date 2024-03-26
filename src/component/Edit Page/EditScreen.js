import { useParams } from "react-router-dom";
import {useLocation} from "react-router-dom";
import EhsaanDrawScreen from "../EhsaanDraw/EhsaanDraw";

function EditPage() {
    const { id } = useParams(); // Get the ID from the URL
    const { state } = useLocation(); // Get the state passed from the previous page
  
    // Now you have access to id, userName, and scenes
    const { userName, scenes } = state;
  
    // Render your edit page using the received data
    return (
      <div>
        <h1>Edit Page for ID: {id}</h1>
        <p>User Name: {userName}</p>
        <p>Scenes: {scenes}</p>
        {/* Now fetch EhsaanDrawScreen content based on the ID */}
        <EhsaanDrawScreen scenes={scenes} />
        {/* Add your edit form here */}
      </div>
    );
  }
  
  export default MainComponent;