;(function () {
	'use strict';
	console.log(111111);
	var $form_add_task = $('.add-task')
		,	new_task = ''
		, task_list = {}
		,	$task_list = $('.task-list')
		,	$delete_list
		;

	init();

	$form_add_task.on('submit', function(e) {
		e.preventDefault();
		var $input = $(this).find('input[type=text]');
		new_task = $input.val();
		if(!new_task) return;
		if(add_task(new_task)) {
			render_task_list();
			$input.val('');
		};

	})

	function init() {
		task_list = store.get('task_list') || [];
		render_task_list();
	}

	function add_delete_click() {
		$delete_list = $('.delete.action');
		$delete_list.on('click', function() {
			var index = $(this).parent().parent().data('index');
			delete_item(index);
		});
	}

	function delete_item(index) {
		task_list.splice(index, 1);
		store.set('task_list', task_list);
		render_task_list();
	}

	function add_task(new_task){
		task_list.push(new_task);
		store.set('task_list', task_list);

		return true;
	}

	function render_task_list() {
		$task_list.html('');
		for(var i=0; i < task_list.length; i++){
			var $task = render_task_tpl(task_list[i], i);
			$task_list.append($task);
		}
		add_delete_click();
	}

	function render_task_tpl(data, index) {
		var list_item_tpl = 
		'<div class="task-item" data-index="'+ index +'">' +
			'<span><input type="checkbox"></span>' +
			'<span class="task-content">'+ data +'</span>' +
			'<span class="float-right">' +
			'<span class="action delete"> 删除</span>' +
			'<span class="action"> 详细</span>' +
			'</span>' +
		'</div>';
		return $(list_item_tpl);
	}
})();