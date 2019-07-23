'use strict';

function main() {
  $('#rating').val(store.filterRating);

  api.getBookmarks()
    .then((bookmarks) => {


      bookmarks.forEach(bookmark => store.addBookmark(
        bookmark.id, 
        bookmark.title,
        bookmark.url,
        bookmark.rating,
        bookmark.desc
      ));

      bookmarkList.bindEventListeners();

      bookmarkList.generateBookmarkItems(store.bookmarks);

      bookmarkList.render();

    });

}

$(main);