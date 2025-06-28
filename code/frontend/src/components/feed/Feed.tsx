import React, { useState, useEffect, useRef } from "react";
import Post from "../Post";
import "./feed.css";
import api from "../../api/axios";

interface PostListItem {
  id: string;
  createdAt: string;
  description: string;
}

function Feed() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 10;

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params: any = { limit: PAGE_SIZE };
      if (nextCursor) params.createdAt = nextCursor;
      interface FeedResponse {
        posts: PostListItem[];  

        nextCursor: string | null;
      }
      const response = await api.get<FeedResponse>("/feed?limit=10");
      //const response = await api.get<FeedResponse>("http://localhost:3001/api/feed?limit=10");
      console.log("Feed response:", response.data);
      const { posts: newPosts, nextCursor: newCursor } = response.data;
      setPosts((prev) => [...prev, ...newPosts]);
      setNextCursor(newCursor);
      setHasMore(!!newCursor && newPosts.length > 0);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
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
  }, [loading, hasMore, nextCursor]);

  return (
    <div className="feedContainer">
      <main className="feedContent" ref={feedRef}>
        {posts.length === 0 && !loading && <div>Keine Posts gefunden.</div>}
        {posts.map((post) => (
          <Post key={post.id} postId={post.id} />
        ))}
        {loading && <div className="loading">Loading more posts...</div>}
        {!hasMore && <div>No more posts</div>}
      </main>
    </div>
  );
}

export default Feed;
