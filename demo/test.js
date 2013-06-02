$(document).ready(function() {
  var $list;

	function init() {
    $list = $('#sortable-list');
    if ($.browser.chrome) {
      //
    } else if ($.browser.safari) {
      document.body.setAttribute('contenteditable', true);
      $('body').removeClass('notice');
    } else if (!$.browser.chrome) {
      $('#js-error-notice')
        .text('Only Chrome / Safari is supported.')
      return;
    }

    initEvent();
    initHome();
  }

  function initEvent() {
    document.body.onpaste = function(e) {
      handleText(e.clipboardData.getData('text/html'));
    }
  }

  function initHome() {
    setTimeout(function() {
      $('#js-error-notice').fadeOut(400, function() {
        $('body').removeClass('notice');
        $('#js-sortable-container').fadeIn(600);
        $list.sortable();
      });
    }, 1200);
  }

	function handleText (text) {
    var i,
        content,
        html = '',
        arr = text.match(/<li>.*?<\/li>/ig);

    console.log(text);

    for (i = 0; arr && i < arr.length; i++) {
      content = arr[i].replace(/<([^>]+).*?>/ig, '');
      content = '<li class="sortable-item"><div>' + content + '</div></li>';
      html += content;
    }

    $list.html(html);
    $list.sortable();
	}

  init();
});
