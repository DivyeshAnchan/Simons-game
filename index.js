let gamepattern = []
let buttoncolors = ['red', 'blue', 'green', 'yellow']
let userchosencolor = []
let userClickedPattern = []
let level = 0
let started = false
function colorshift(randomnum) {
  $('#' + randomnum)
    .addClass('op')
    .css('background', 'lightblue')

  setTimeout(function () {
    $('#' + randomnum)
      .removeClass('op')
      .css('background', '')
  }, 50)

  playsound(randomnum)
}
function nextsequence() {
  userClickedPattern = []
  $('#level-title').html('level ' + ++level)
  let randomnum = Math.floor(Math.random() * 4)
  let randomcolor = buttoncolors[randomnum]
  gamepattern.push(randomcolor)
  $('#' + randomcolor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playsound(randomcolor)
}
function checkanswer(answer) {
  if (userClickedPattern[answer] === gamepattern[answer]) {
    console.log('success')
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(() => {
        nextsequence()
      }, 1000)
    }
  } else {
    userchosencolor = []
    gamepattern = []

    let mytime = setTimeout(() => {
      $('body').addClass('game-over')
      var audio = new Audio('sounds/wrong.mp3')
      audio.play()
      $('#level-title').html('Game Over, Press Any Key to Restart')
    }, 200)
    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 500)
    startover()
  }
}
function startover() {
  level = 0
  started = false
}
$('.btn').click(function () {
  userchosencolor = $(this).attr('id')
  userClickedPattern.push(userchosencolor)
  playsound(userchosencolor)
  colorshift(userchosencolor)
  checkanswer(userClickedPattern.length - 1)
})
function playsound(randomCol) {
  var audio = new Audio('sounds/' + randomCol + '.mp3')
  audio.play()
}
$(document).keypress(function (e) {
  if (!started) {
    nextsequence()
    started = true
  }
})
