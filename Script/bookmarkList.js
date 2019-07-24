'use strict';

const app = (function () {

  // generating dom for bookmarks
  function generateBookmarkEl(item) {

    if (item.expanded) {
      return `<div class='bookmark bookmark-border'>
      <div class='title-delete-container'>
        <button id='js-expand-btn' data-id="${item.id}">-</button>
        <div class='clearFix' style='clear:both;'>
          <span class='bookmarkTitle clear'>${item.title}</span>
          <span class="bookmark-rating clear">Rating: ${item.rating}</span>
        </div>
        <button id='js-delete-btn' data-id="${item.id}">x</button> 
      </div>
      <p>${item.desc}</p>
      <a href='${item.url}' target='_blank'>${item.url}</a>
      </div>`;
    
    } else{
      return `<div class='bookmark bookmark-border'>
    <div class='title-delete-container'>
     <button id='js-expand-btn' data-id="${item.id}">+</button>
     
    <div class='clearFix' style='clear:both;'>
      <span class='bookmarkTitle clear'>${item.title}</span>
      <span class='bookmark-rating clear'>Rating: ${item.rating}</span>
     </div>
      <button id='js-delete-btn' data-id="${item.id}">x</button>
      </div>
    </div>`;
    }
  }
  
  // set the store with mapping
  function generateBookmarkString() {
    
    const filteredArray = store.items.filter(
      item => item.rating >= store.minimum
    );

    const bookmarkArray = filteredArray.map(item => 
      generateBookmarkEl(item)
    );
    
    return bookmarkArray.join('');
    
  }

  // rendering to DOM
  function render() {


    if(store.errorMessage) {
      $('.js-error-message').html(`<p>${store.errorMessage}</p>`).fadeIn('slow').fadeOut(500).fadeIn   ('slow').fadeOut(500).fadeIn('slow');
      $('.js-error-message').removeClass('hidden');
    }

    if(!store.errorMessage) {
      $('.js-error-message').html('');
      $('.js-error-message').addClass('hidden');
    }

    if (store.isAdding) {
      $('#js-add-btn, #header').addClass('hidden');
      $('.js-adding-item-container').removeClass('hidden');

    
    } else if (!store.isAdding) {
      $('#js-add-btn, #header').removeClass('hidden');
      $('.js-adding-item-container').addClass('hidden');
    }

    const bookmarkString = generateBookmarkString();
    $('.bookmark-container').html(bookmarkString);
  }
      

  // handler for add bookmark
  function handleAddBookmark() {
    $('.js-add-bookmark').on('click', () => {
      store.toggleIsAdding();
      render();
    });
  }

  // clearing text fields 
  function clearInputFields() {
    $('#js-set-title').val('');
    $('#js-set-url').val('');
    $('#js-set-desc').val('');
    $('input[name=js-set-rating]').prop('checked',false);
  }

  // error handling
  function handleErrors(error, data) {
    error.message = data.message;
    store.setErrorMessage(error.message);
    render();
    store.setErrorMessage('');
    return Promise.reject(error);
  }

  // handler for bookmark submit
  function handleSubmitNewBookmark() {
    $('.js-adding-item-container').on('click', '#js-submit-bookmark', (event) => {
      event.preventDefault();

      const newItem = {

        title: $('#js-set-title').val(),
        url: $('#js-set-url').val(),
        desc: $('#js-set-desc').val(),
        rating: $('input[name=js-set-rating]:checked', '.set-rating').val()

      };

      //trying something for error handling
      let error = null;
      api.createBookmark(newItem)
        .then(res => {
          if (!res.ok) {
            error = {code: res.status};
          }
          return res.json();
        })
        .then(data => {
          if (error) {

            return handleErrors(error, data);
          }
          store.toggleIsAdding();
          clearInputFields();
          api.getBookmarks();
        });
    });
  }

  // handler for delete event
  function handleDeleteBookmark() {

    $('.bookmark-container').on('click', '#js-delete-btn', event => {
      const id = $(event.target).data('id');
      let error = null;
      api.deleteBookmark(id)
        .then(res => {
          if (!res.ok) {
            error = {code: res.status};
          }
          return res.json();
        })
        .then(data => {
          if (error) {

            return handleErrors(error, data);
          }
          api.getBookmarks();
        });
    });
  }

  // handler for expand button
  function handleExpandButton() {
    $('.bookmark-container').on('click', '#js-expand-btn', event => {
      const id = $(event.target).data('id');
      store.toggleExpanded(id);
      render();
    });
  }

  // handler for cancel button
  function handleCancelSubmit() {
    $('#js-cancel-submit').click(function(){
      store.toggleIsAdding();
      clearInputFields();
      render();
    });
  }


  // handling our filter bookmarks
  function handleFilterItems() {
    $('#js-filter-ratings').change(function(){
      store.setMinimum($('#js-filter-ratings').val());
      render();
    });
  }


  function bindEventListeners() {
    handleAddBookmark();
    handleSubmitNewBookmark();
    handleDeleteBookmark();
    handleCancelSubmit();
    handleFilterItems();

    
    handleExpandButton();
  }
  return {
    render,
    bindEventListeners,

    generateBookmarkEl,
    generateBookmarkString,
    handleErrors,
  };
})();