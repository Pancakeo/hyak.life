$(function () {

	// just need this once, probably.
	var loadedPages = {};
	var minCurrentYear = 2019;

	/**
	 * Get the basename from the relative path (e.g. don't show the folder structure to the user.)
	 * @param {*} str 
	 */
	function base_name(str) {
		var base = new String(str).substring(str.lastIndexOf('/') + 1);
		if (base.lastIndexOf(".") != -1)
			base = base.substring(0, base.lastIndexOf("."));
		return base;
	}

	/**
	 * Fetch a page fragment. Plop into content area.
	 * @param {*} pageKey 
	 */
	var get_page = function (pageKey) {
		history.pushState({}, "Main", "?page=" + pageKey);
		var $fragment = $("#page_content #" + pageKey);
		var $allFragments = $("#page_content > div");
		$allFragments.hide();

		if (loadedPages[pageKey]) {
			$fragment.show();
			return;
		}

		var $loading = $("#loader");
		$loading.show();

		$.get('./fragments/' + pageKey + '.html?cacheBreak=' + Date.now(), function (res) {
			$loading.hide();
			$fragment.html(res);

			var currentYear = new Date().getFullYear();
			if (currentYear < minCurrentYear) {
				currentYear = minCurrentYear
			}

			$("#page_content").find(".current_year").text(currentYear);
			$fragment.show();
			loadedPages[pageKey] = true;
		});
	};

	/**
	 * User clicks on a navigation thing
	 */
	$("#top_links").on('click', 'span.nav-link', function () {
		var pageKey = $(this).attr('page-key');
		$("#top_links li").removeClass('active');
		$(this).parent('li').addClass('active');

		get_page(pageKey);
	});

	// If user is refreshing, try to return to the previous page:
	var previousPageResults = location.search && /\?page=(.*)/ig.exec(location.search)
	if (previousPageResults.length == 2) {
		var prev_page = previousPageResults[1];
		$("#top_links span[page-key='" + prev_page + "']").click();

	} else {
		$("#top_links span[page-key='main']").click();
	}

	var currentYear = new Date().getFullYear();
	if (currentYear < minCurrentYear) {
		currentYear = minCurrentYear
	}

	$(".current_year").text(currentYear);

});