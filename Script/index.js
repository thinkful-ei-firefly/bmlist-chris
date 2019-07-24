
'use strict';

/* global app api*/

$(document).ready(function() {
  api.getBookmarks();
  app.bindEventListeners(); 
});

$(main);