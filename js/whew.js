$(function () {

	/**
	 * Load a page fragment and render in container.
	 */
	$("#top_links").on('click', 'span.nav-link', function () {
		var pageKey = $(this).attr('page-key');
		$("#top_links li").removeClass('active');
		$(this).parent('li').addClass('active');

		history.pushState({}, "Main", "?page=" + pageKey);

		$.get('/fragments/' + pageKey + '.html?cacheBreak=' + Date.now(), function (res) {
			$("#page_content").html(res);
		})
	});

	// If user is refresing, try to return to the previous page:
	var previousPageResults = location.search && /\?page=(.*)/ig.exec(location.search)
	if (previousPageResults.length == 2) {
		var prev_page = previousPageResults[1];
		$("#top_links span[page-key='" + prev_page + "']").click();
	} else {
		$("#top_links span[page-key='main']").click();
	}

	var currentYear = new Date().getFullYear();
	$("#current_year").text(currentYear);

});