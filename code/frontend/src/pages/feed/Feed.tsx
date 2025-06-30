import React, { useState, useEffect, useRef } from "react";
import Post from "../../components/post/Post";
import "./feed.css";
import api from "../../api/axios";
import WelcomeMessage from "../../components/welcomeMessage/welcomeMessage";
import { useAuth } from "../../api/Auth";
import LogInButton from "../../components/buttons/LogInButton";
import SignUpButton from "../../components/buttons/SignUpButton";
import NaggingFooter from "../../components/naggingFooter/NaggingFooter";
import { useLocation, useParams } from "react-router-dom";

interface PostListItem {
  id: string;
  createdAt: string;
  description: string;
}

interface FeedProps {
  username?: string;
}

function Feed({ username }: FeedProps) {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 10;
  const { user } = useAuth();
  const scrollTargetRef = useRef<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Remove the # character from the hash
    const hashValue = location.hash.replace("#", "");
    console.log(hashValue);
    console.log("Hash value:", hashValue);

    if (hashValue) {
      scrollTargetRef.current = hashValue;
    }
  }, [location]);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      let url: string;
      if (username) {
        url = `/posts/getUserPosts/${encodeURIComponent(username)}`;
        const response = await api.get<{ posts: PostListItem[] }>(url);
        setPosts(response.data.posts);
        setHasMore(false);
      } else {
        url = `/feed?limit=${PAGE_SIZE}`;
        if (nextCursor) {
          url = `/feed?createdAt=${encodeURIComponent(
            nextCursor
          )}&limit=${PAGE_SIZE}`;
        }
        interface FeedResponse {
          posts: PostListItem[];
          nextCursor: string | null;
        }
        const response = await api.get<FeedResponse>(url);
        const { posts: newPosts, nextCursor: newCursor } = response.data;
        const tempPost: PostListItem[] = [...posts, ...newPosts];
        setPosts(tempPost);
        setNextCursor(newCursor);
        setHasMore(!!newCursor && newPosts.length > 0);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (username) return;

    const onScroll = () => {
      if (loading || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        fetchPosts();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading, hasMore, nextCursor, username]);

  useEffect(() => {
    setPosts([]);
    setNextCursor(null);
    setHasMore(true);
    fetchPosts();
  }, [username]);

  return (
    <div className={user ? "loggedInfeedContainer" : "feedContainer"}>
      {!user && (
        <div className="welcome-for-logged-out">
          <WelcomeMessage />
          <SignUpButton />
          <LogInButton />
        </div>
      )}

      <main className="feedContent" ref={feedRef}>
        {posts.length === 0 && !loading && <div>Keine Posts gefunden.</div>}
        {posts.map((post) => (
          <div id={post.id} key={post.id} className="feed-post-container">
            <Post
              postId={post.id}
              autoScroll={post.id === scrollTargetRef.current}
            />
          </div>
        ))}
        {loading && <div className="loading">Loading more posts...</div>}
        {!hasMore && <div className="no-more-posts-message">No more posts</div>}
      </main>
      {!user && <NaggingFooter />}
    </div>
  );
}

export function UserFeedRoute() {
  const { user } = useParams<{ user: string }>();
  return <Feed username={user} />;
}

export default Feed;
