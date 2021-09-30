import { useState } from "react";
import{ useHistory} from 'react-router-dom'; 

const Create = () => {
    const[title, setTitle] = useState(''); 
    const[body, setBody] = useState(''); 
    const[genre, setGenre] = useState('Social'); 
    const[author, setAuthor] = useState('Eugene Pirono'); 
    const[isPending, setIsPending] = useState(false); 
    const history = useHistory(); 


    const handleSubmit = (e) => {
        e.preventDefault(); 
        const blog = { title, author, body, genre}; 

        setIsPending(true); 

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then( () => {
            console.log('New Blog Added!'); 
            setIsPending(false); 
            
            history.push('/'); 
        });
        
    }
    return (  
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label> Blog title:</label>
                <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value) }
                />
                 <label> Author:</label>
                <input 
                    type="text" 
                    required 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value) }
                />
                <label> Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={ (e) => setBody(e.target.value)}
                ></textarea>
                <label>Genre:</label>
                <select
                    value = {genre}
                    onChange = { (e) => setGenre(e.target.value)}
                >
                    <option value="Social">Social</option>
                    <option value="Professional">Professional</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}




            </form>
        </div>


    );
}
 
export default Create;