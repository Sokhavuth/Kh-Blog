CKEDITOR.plugins.add( 'posting', {
  init: function( editor ) {
    editor.addCommand( 'insertNewPost', {
      exec: function( editor ) {
        //editor.insertHtml( '' );
        
        $(".submit").click();
      }

    });

    editor.ui.addButton( 'InsertNewPost', {
      label: 'ចុះ​ផ្សាយ',
      command: 'insertNewPost',
      toolbar: 'insert',
      icon: this.path + 'icons/submit.png'
    });

  }

});