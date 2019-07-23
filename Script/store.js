'use strict';



const store = (function(){

  const addBookmark = function(id, title, url, rating = 5, description = '') {
    this.bookmarks.push({ id, title, url, rating, description, });
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndUpdate = function(id, newData) {
    return Object.assign(this.findById(id), newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setBookmarkExpanded = function(id) {
   
    this.expanded = id;
    
  };

  return {
    bookmarks: [],
    error: null,
    addBookmark,
    showAdding: false,
    findById,
    findAndUpdate,
    findAndDelete,
    setBookmarkExpanded,
    filterRating: 5,
    expanded: null,
  };

}());