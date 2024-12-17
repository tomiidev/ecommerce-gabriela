import React, { useEffect, useState } from "react";

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=YOUR_ACCESS_TOKEN`
      );
      const data = await response.json();
      setPosts(data.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="instagram-feed">
      {posts.map((post) => (
        <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer">
          <img
            src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
            alt={post.caption || "Instagram Post"}
          />
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
