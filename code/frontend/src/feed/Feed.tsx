import React, { useState, useEffect, useRef } from "react";
import TestPost from "../TestPost";
import "./feed.css";
import Post from "../Post";

function Feed() {
  const [posts, setPosts] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 10;

  const fetchPosts = () => {
    if (loading) return;
    setLoading(true);
//random shit to differentiate test posts
    setTimeout(() => {
      setPosts((prev) => {
        const newPosts = [];
        for (let i = 0; i < PAGE_SIZE; i++) {
          newPosts.push(Math.floor(Math.random() * 100) + 1);
        }
        return [...prev, ...newPosts];
      });
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const feed = feedRef.current;
      if (!feed || loading || !hasMore) return;

      if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 100) {
        fetchPosts();
      }
    };

    const feed = feedRef.current;
    feed?.addEventListener("scroll", onScroll);
    return () => {
      feed?.removeEventListener("scroll", onScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="feedContainer">
        
      <main className="feedContent" ref={feedRef}>^
        <Post/>
        {posts.map((postId, idx) => (
          <TestPost key={idx} postId={postId} />
        ))}
        {loading && <div className="loading">Loading more posts...</div>}
      </main>
    </div>
  );
}

export default Feed;
