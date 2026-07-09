import { useEffect, useState } from 'react';
import "../styles/About.css";

/*
{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }, 
*/

interface Post {
  id: number;
  title: string;
  body: string;
} 
// the structure of a each post returned from the API, userID not included since assignment doesnt need it
// honestly dont need it, but for clarity to give TS info on whats expected in each array

function About() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(12);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const showMore = () => {
    setVisibleItems((previous) => previous + 12);
  };

  return (
    <div>
      <h1 className='about-title'>About Page</h1>

      <div className="grid-container">
        {posts.slice(0, visibleItems).map((post) => (
          <div key={post.id} className="grid-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {visibleItems < posts.length && (
        <button className="showMore" onClick={showMore}>Show More</button>
      )}
    </div>
  );
}

export default About;