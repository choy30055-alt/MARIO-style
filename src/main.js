//
//メインループ
//
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width = SCREEN_SIZE_W * 2;
can.height = SCREEN_SIZE_H * 2;

con.mozimageSmoothingEnabled = false;
con.msimageSmoothingEnabled = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;

let chImg = new Image();
chImg.src ="image/spritemario.png";
//chImg.onload = draw;

//キーボード
let keyb = {};

//おじさんを作る
let ojisan = new Ojisan;
//フィールドを作る
let field = new Field();
//ブロックのオブジェクト
let block = [];
let item = [];
let kuribo = [];
let togezo =[];
let coin =[];
let fireball = [];
let nokonoko = [];
let jyugem = [];
let score = 0;
let scorepop = [];

//ゲームステート
let gameState = 'PLAYING';
let gameOverImage = null;

function updateObj(obj) {
    //スプライトのブロックを更新
    for(let i = obj.length - 1; i >= 0; i--) {
        obj[i].update();
        if(obj[i].kill) obj.splice(i, 1);
    }
}

//更新処理
function update() {

    //マップの更新
    field.update();

    //アイテムの更新
    updateObj(block);
    updateObj(item);
    updateObj(kuribo);
    updateObj(togezo);
    updateObj(coin);
    updateObj(fireball);
    updateObj(nokonoko);
    updateObj(jyugem);
    updateObj(scorepop);

    //おじさんの更新
    ojisan.update(); 
}

//スプライトの描画
function drawSprite(snum, x, y) {
    let sx = (snum&15)<<4;
    let sy = (snum>>4)<<4;
    
    vcon.drawImage(chImg, sx, sy, 16, 32, x, y, 16, 32);
}

function drawObj(obj) {
    //スプライトのブロックを表示
    for(let i = 0; i < obj.length; i++)
        obj[i].draw();
}



//描画処理
function draw() {
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    
    //マップを表示
    field.draw();

    //アイテムを表示
    drawObj(block);
    drawObj(item);
    drawObj(kuribo);
    drawObj(togezo);
    drawObj(coin);
    drawObj(fireball);
    drawObj(nokonoko);
    drawObj(jyugem);
    drawObj(scorepop);

    //おじさんを表示
    ojisan.draw();

    //仮想画面から実画面へ拡大転送
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H,
                  0, 0, SCREEN_SIZE_W * 2, SCREEN_SIZE_H * 2);
    //スコア情報
    con.font = "20px 'Impact";
    con.fillStyle = "white"; 
    con.fillText("MARIO", 10, 30);
    con.fillText(score, 10, 50);
}
//setInterval(mainLoop, 1000 / 60);

function gameStart() {  //スタートボタンでゲーム開始
    document.getElementById("mstart").style.visibility = "hidden";   //スタートボタン非表示
    startSound1.play();
    startSound1.addEventListener("ended", function(){startSound2.play();}); 
    startSound2.addEventListener("ended", function(){bgmSound.play();}); 
    bgmSound.addEventListener("ended", function(){bgmSound.play();}); 
    loadImageAssets();
    startTime = performance.now();
    ojisan.draw();

    kuribo.push(new Kuribo(163, 16, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 24, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 40, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 54, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 63, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 78, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 102, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 120, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 160, 0, 12, 0, ITEM_KURIBO));
    kuribo.push(new Kuribo(163, 162, 0, 12, 0, ITEM_KURIBO));

    nokonoko.push(new Nokonoko(163, 14, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 32, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 48, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 60, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 78, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 96, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 112, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 128, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 160, 0, 9, 0, ITEM_NOKONOKO));
    nokonoko.push(new Nokonoko(163, 162, 0, 9, 0, ITEM_NOKONOKO));

    jyugem.push(new Jyugem(107, 1, 1, 11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 40, 2, 11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 80, 3, 11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 100, 4, 11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 100, 1, -11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 130, 2, -11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 160, 3, -11, 0, ITEM_JYUGEM));
    jyugem.push(new Jyugem(107, 188, 4, -11, 0, ITEM_JYUGEM));

    mainLoop();
}

//ループ開始
/*window.onload = function() {
    startTime = performance.now();
    mainLoop();
} */

//メインループ
function mainLoop() {
    if(gameState === 'PLAYING') {
        let nowTime = performance.now();
        let nowFrame = (nowTime - startTime) / GAME_FPS;

        if(nowFrame > frameCount) {
            let c = 0;
            while(nowFrame > frameCount) {
                frameCount++;
                //更新処理
                update();
                if(++c >= 4)break;
            }
            //描画処理
            draw();
        }
    } else if (gameState === 'GAMEOVER') {
        drawGameOverImage();
        bgmSound.currentTime = 0; //連続再生
        setTimeout(() => {
            window.location.reload(true);
        },4000);
    }
    requestAnimationFrame(mainLoop);
}

//キーボードが押されたときに呼ばれる
document.addEventListener('keydown', (e) => {
    if(e.key == 'ArrowLeft') keyb.Left = true;
    if(e.key == 'ArrowRight') keyb.Right = true;
    if(e.key == 'z') keyb.BBUTTON = true;
    if(e.key == 'x') keyb.ABUTTON = true;
    /*if(e.key == 'x') {
        //block.push(new Block(368, 5, 5));
    }*/  
    if(e.key == 'a') field.scx--;
    if(e.key == 's') field.scx++;
    if(e.key == 'c') keyb.FBBUTTON = true;
})

//キーボードが離されたときに呼ばれる
document.addEventListener('keyup', (e) => {
    if(e.key == 'ArrowLeft') keyb.Left = false;
    if(e.key == 'ArrowRight') keyb.Right = false;
    if(e.key == 'z') keyb.BBUTTON = false;
    if(e.key == 'x') keyb.ABUTTON = false;
    //if(e.key == 'c') keyb.FBBUTTON = false;
})

const leftb = document.getElementById("LeftB");
const rightb = document.getElementById("RightB");
const abtn = document.getElementById("Abtn");
const bbtn = document.getElementById("Bbtn");
//タッチされたときに呼ばれる
leftb.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyb.Left = true;
})
rightb.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyb.Right = true;
})
abtn.addEventListener('touchstart', (e) => {
    e.preventDefault();  
    keyb.ABUTTON = true;
})
bbtn.addEventListener('touchstart', (e) => {
    e.preventDefault();  
    keyb.FBBUTTON = true;
})

//タッチが離されたときに呼ばれる
leftb.addEventListener('touchend', (e) => {
    keyb.Left = false; 
    e.preventDefault(); return false;
})
rightb.addEventListener('touchend', (e) => {
    keyb.Right = false;
    e.preventDefault(); return false;
})
abtn.addEventListener('touchend', (e) => {
    keyb.ABUTTON = false;
    e.preventDefault(); return false;
})
/*bbtn.addEventListener('touchend', (e) => {
    e.preventDefault();  
    keyb.FBBUTTON = false;
})*/

//画像の事前読み込み
function loadImageAssets() {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        gameOverImage = img;
        gameState = 'PLAYING'
    }
    img.src = "image/mrogameover.jpg";
}

//ゲームオーバーのトリガー
function triggerGameOver() {
    gameState = 'GAMEOVER';
}

//ゲームオーバー画像
function drawGameOverImage() {
    con.drawImage(gameOverImage, 0, 0, can.width, can.height);

    /*gameOverImage.src = "image/mrogameover.jpg"; 
    gameOverImage.onload = () =>{
        con.drawImage(gameOverImage, 0, 0, can.width, can.height);
    };*/

    //黒画面のテキスト表示
    /*con.fillStyle = 'black';
    con.fillRect(0, 0, can.width, can.height);
    con.fillStyle = 'white';
    con.font = '48px "Times New Roman", Times, serif';  
    con.textAlign = 'center';
    con.textBaseline = 'middle';
    const x = can.width / 2;
    const y = can.height / 2;
    con.fillText("GAMEOVER", x, y);*/
}
