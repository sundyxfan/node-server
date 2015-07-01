var Task = require('shell-task');

new Task('git pull origin master')
.then('git pull origin master')
.then('git add .', function (next) {
    setTimeout(next, 1000);
})
.then('git commit -m "commit"')
.then('git push -u origin master')
.run(function (err, next) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('done!');
    } 
});