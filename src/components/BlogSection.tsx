import React, { useState } from "react";
import { BlogPost } from "../types";
import { BLOG_POSTS } from "../data";
import { Search, Filter, Clock, Calendar, Heart, MessageSquare, ArrowUpRight, X, User, Send, Smile, Sparkles } from "lucide-react";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null);

  // Comments form
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const categories = ["All", "AI Workflows", "Security", "Modern Workflows"];

  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Likes increment
  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
    
    // If currently reading expanded view, update it too
    if (expandedPost && expandedPost.id === postId) {
      setExpandedPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  // Submit Comments in Local State
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim() || !expandedPost) return;

    const newComment = {
      id: `comment_${Date.now()}`,
      author: commentAuthor,
      content: commentContent,
      timestamp: new Date().toISOString().split('T')[0]
    };

    setPosts(prev => prev.map(p => {
      if (p.id === expandedPost.id) {
        const updatedComments = [...p.comments, newComment];
        // Sync expanded state as well
        setExpandedPost({ ...p, comments: updatedComments });
        return { ...p, comments: updatedComments };
      }
      return p;
    }));

    setCommentAuthor("");
    setCommentContent("");
  };

  return (
    <div className="space-y-8 text-left">
      {/* Blog Search & Category Filter Row */}
      <div className="bg-[#121212] border border-[#333] rounded-none p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#666]" />
          <input
            type="text"
            placeholder="Search keywords, posts, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050505] border border-[#333] rounded-none pl-10 pr-4 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#F27D26] transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2 text-xs text-[#666] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category triggers */}
        <div className="flex flex-wrap gap-1 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded-none ${
                selectedCategory === cat
                  ? "bg-[#F27D26] text-black font-extrabold"
                  : "bg-[#050505] hover:bg-[#333] text-[#AAAAAA] border border-[#333] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Blog Post Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[#121212] p-10 text-center rounded-none border border-[#333]">
          <p className="text-[#AAAAAA] text-xs italic">No matching blog entries found. Clear filters or adjust search string.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setExpandedPost(post)}
              className="bg-[#121212] border border-[#333] rounded-none overflow-hidden hover:border-[#F27D26]/60 transition-all hover:translate-y-[-2px] shadow-lg flex flex-col justify-between cursor-pointer group animate-fade-in"
            >
              <div>
                {/* Image header */}
                <div className="relative aspect-video overflow-hidden border-b border-[#333] bg-[#0A0A0A]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-none text-[9px] font-mono tracking-wider uppercase font-bold text-[#F27D26] border border-[#333]">
                    {post.category}
                  </div>
                </div>

                {/* Body metadata */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#666]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#F27D26]" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F27D26]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-[#F27D26] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed line-clamp-3 font-normal">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="px-5 py-4 border-t border-[#333] flex justify-between items-center bg-[#0d0f10]">
                <div className="flex gap-3 text-[10px] font-mono text-[#AAAAAA]">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-500/80 hover:scale-110 transition-transform" />
                    <span>{post.likes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#F27D26]/80" />
                    <span>{post.comments.length}</span>
                  </span>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F27D26] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Expanded Article Over-layer Reading modal */}
      {expandedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#050505]/95 backdrop-blur-md p-2 sm:p-4">
          <div className="w-full max-w-3xl bg-[#121212] h-full rounded-none overflow-hidden border border-[#333] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Expanded Header tools */}
            <div className="bg-[#0A0A0A] border-b border-[#333] px-6 py-4 flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-[#F27D26] bg-[#F27D26]/10 px-2.5 py-1 rounded-none border border-[#F27D26]/20 font-bold">
                Blogging Mode
              </span>
              <button
                onClick={() => setExpandedPost(null)}
                className="p-1.5 bg-[#121212] border border-[#333] rounded-none text-[#AAAAAA] hover:text-white transition-all hover:border-red-500/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Reader Pane */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-[#0A0A0A]/30">
              
              {/* Header Titles */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs font-mono text-[#666]">
                  <span className="bg-[#F27D26]/10 text-[#F27D26] px-2.5 py-0.5 rounded-none border border-[#F27D26]/20">
                    {expandedPost.category}
                  </span>
                  <span>|</span>
                  <span>{expandedPost.publishedAt}</span>
                  <span>|</span>
                  <span>{expandedPost.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {expandedPost.title}
                </h2>
                <p className="text-xs text-[#AAAAAA] font-normal leading-relaxed italic border-l-2 border-[#F27D26] pl-3 py-1">
                  {expandedPost.summary}
                </p>
              </div>

              {/* Cover visual banner */}
              <div className="aspect-video rounded-none overflow-hidden border border-[#333] bg-[#0A0A0A]">
                <img
                  src={expandedPost.coverImage}
                  alt={expandedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Main reading context styled for distraction-free luxury */}
              <div className="text-xs text-[#c6c6cd] leading-relaxed font-normal whitespace-pre-wrap space-y-4 prose prose-invert max-w-none">
                {expandedPost.content}
              </div>

              {/* Likes trigger in Expanded view */}
              <div className="pt-6 border-t border-[#333] flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(expandedPost.id, e)}
                  className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#F27D26] bg-[#F27D26]/10 border border-[#F27D26]/20 px-4 py-2 rounded-none hover:bg-[#F27D26]/20 transition-all active:scale-[97%]"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Count: {expandedPost.likes} Likes</span>
                </button>
                <div className="flex gap-1">
                  {expandedPost.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono bg-[#121212] text-[#AAAAAA] border border-[#333] px-2 py-0.5 rounded-none">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments list panel */}
              <div className="space-y-6 pt-6 border-t border-[#333]">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <MessageSquare className="w-4.5 h-4.5 text-[#F27D26]" />
                  Recruiter Feedback Loop ({expandedPost.comments.length})
                </h4>

                {/* Submissions Loop */}
                {expandedPost.comments.length === 0 ? (
                  <p className="text-[#AAAAAA] text-xs italic">No developer comments submitted here yet. Be the first!</p>
                ) : (
                  <div className="space-y-3">
                    {expandedPost.comments.map(c => (
                      <div key={c.id} className="bg-[#121212] border border-[#333] rounded-none p-4 space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#AAAAAA]">
                          <span className="font-bold text-white flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-[#F27D26]" />
                            {c.author}
                          </span>
                          <span>{c.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#AAAAAA] font-normal leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit New Comment Box */}
                <form onSubmit={handleAddComment} className="bg-[#0A0A0A] border border-[#333] p-4 rounded-none space-y-4">
                  <span className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-wider block border-b border-[#333] pb-1">
                    Submit Recruitment Comment
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Recruiters Sarah)"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      required
                      className="w-full bg-[#121212] border border-[#333] rounded-none px-3 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#F27D26] transition-colors"
                    />
                    <div className="flex items-center text-[10px] text-gray-500 font-mono gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                      <span>Saves instantly in local session state.</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter message text..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333] rounded-none px-3 py-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#F27D26] transition-colors"
                  />

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#F27D26] hover:bg-[#ff9647] rounded-none text-[10px] font-mono tracking-widest uppercase font-bold text-black transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publish Comment
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export { BlogSection };
