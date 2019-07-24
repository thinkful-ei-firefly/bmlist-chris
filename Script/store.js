const store = (function(){

  const addExpanded = function(){
    this.items.map(item => item.expanded = false);
  };

  const toggleExpanded = function(id){
    const target = this.items.find(item => item.id === id);
    target.expanded = !target.expanded;
  };

  const addBookmarks = function(bookmarks){
    this.items = bookmarks;
    this.addExpanded();
  };

  const toggleIsAdding = function(){
    this.isAdding = !this.isAdding;
  };

  const setMinimum = function(newMinimum){
    this.minimum = newMinimum;
  };


  const setErrorMessage = function(message){
    this.errorMessage = message;
  };

  return {
    items: [],
    isAdding: false,
    minimum: 0,
    errorMessage: '',

    addBookmarks,
    toggleIsAdding,
    setMinimum,
    
    addExpanded,
    toggleExpanded,

    setErrorMessage,
  };
})();