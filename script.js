const tiles = document.querySelectorAll(".tile");
var playing = true;
var previousPlay = 'O';
const win_patterns = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
	[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
const message = document.querySelector("#message");


(function init() {
	tiles.forEach(tile => {
		tile.innerHTML = "";
		tile.onclick = _ => setTile(Array.from(tiles).indexOf(tile))
	})
})()

function resetMatch() {
	previousPlay = "O";
	toggleMessage("hidden", 0, "0px");
	tiles.forEach(tile => {
		tile.innerHTML = '';
		tile.style.color = "#fff";
	});
	playing = true;
}

function setTile(index) {
	if(tiles[index].innerHTML == "" && playing == true) {
		if(previousPlay == "O") {
			tiles[index].innerHTML = 'X';
			previousPlay = 'X';
		} else if(previousPlay == "X") {
			tiles[index].innerHTML = 'O';
			previousPlay = 'O';
		} else {
			alert("Something went wrong"); //just to make sure it won't be hijacked
		}
		testGameOver();
		testWin();
	}
};

function testGameOver() {
	let fullFrame = Array.from(tiles).map(tile => tile.innerHTML).indexOf("") == -1;
	if(fullFrame == true) {
		message.innerHTML = "Draw !";
		toggleMessage('visible', 1, '20px');
		setTimeout(function() {resetMatch()}, 1500);
	}
}

function testWin() {
	for(pattern of win_patterns) {
		let tile_1 = Array.from(tiles)[pattern[0]].innerHTML;
		let tile_2 = Array.from(tiles)[pattern[1]].innerHTML;
		let tile_3 = Array.from(tiles)[pattern[2]].innerHTML;
		if(tile_1 != '' && tile_1 == tile_2 && tile_2 == tile_3) {
			win(previousPlay, pattern)
		}
		
	};
};

function toggleMessage(visibility, opacity, top) {
	message.style.visibility = visibility;
	message.style.opacity = opacity;
	message.style.top = top;
}

function win(player, pattern) {
	for(let i of pattern) {
		tiles[i].style.color = "#f9ca24"
	}
	let seconds = 5;
	let messageTxt = (player, seconds) => {
		message.innerHTML =  `The winner is <span style="font-family: Fredoka One;">${player}</span> !!
		<p style="font-size: 40px; text-align: center; margin: 0;">${seconds}</p>`
	}
	messageTxt(player, 5);
	toggleMessage('visible', 1, '20px')
	playing = false;
	let timer = setInterval(function() {
		seconds--;
		messageTxt(player, seconds)
		if(seconds == 0) {
			clearInterval(timer);
			resetMatch();
		}
	}, 1000);
}