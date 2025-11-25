//
//定数の定義
//
const bgmSound = new Audio("./audio/mrobgm.mp3");
const startSound1 = new Audio("./audio/mroitsmario.mp3");
const startSound2 = new Audio("./audio/mroherego.mp3");
const jumpSound = new Audio("./audio/mrojump.mp3");
const blbSound = new Audio("./audio/mroblb.mp3");
const itemSound = new Audio("./audio/mroitem.mp3");
const yafuSound = new Audio("./audio/mroyafuu.mp3");
const pupSound = new Audio("./audio/mropup.mp3");
const lvdSound = new Audio("./audio/mrolvd.mp3");
const wahSound = new Audio("./audio/mrowaah.mp3");
const fumuSound = new Audio("./audio/mropeko.mp3");
const yaSound = new Audio("./audio/mroya.mp3");
const hahaSound = new Audio("./audio/mrohaha.mp3");
const coinSound = new Audio("./audio/mrocoin.mp3");
const miyaSound = new Audio("./audio/mromiya.mp3");
const fireSound = new Audio("./audio/mrofireball.mp3");
const firehitSound = new Audio("./audio/mroharetu.mp3");
const jyugemSound = new Audio("./audio/jyugem.mp3");
const gameoverSound = new Audio("./audio/mrogameover.mp3");

const GAME_FPS = 1000 / 60;  //FPS
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;

//一画面当たりのブロックの数
const MAP_SIZE_W = SCREEN_SIZE_W / 16;
const MAP_SIZE_H = SCREEN_SIZE_H / 16;

//マップデータのブロック数
const FIELD_SIZE_W = 256;
const FIELD_SIZE_H = 14;

const ITEM_KINO = 1;
const ITEM_KUSA = 2;
const ITEM_STAR = 4;
const ITEM_FIRE = 8;
const ITEM_KURIBO = 3;
const ITEM_TOGEZO =5;
const ITEM_COIN = 6;
const ITEM_FIREB = 7;
const ITEM_STOMPKURI = 9;
const ITEM_EXPL = 10;
const ITEM_NOKONOKO = 11;
const ITEM_URNOKONOKO = 12;
const ITEM_JYUGEM = 13;

//スプライトの基本クラス
class Sprite {
    constructor(sp, x, y, vx, vy) {
        this.sp = sp;
        this.x = x<<8;
        this.y = y<<8;
        this.ay = 0; 
        this.w =16;
        this.h =16;
        this.vx = vx;
        this.vy = vy;
        this.sz = 0;
        this.kill = false;
        this.count = 0;
    }

    //当たり判定
    checkHit(obj) {
        //物体1
        let left1 = (this.x>>4)      + 2;
        let right1 = left1 + this.w  - 4; 
        let top1 = (this.y>>4)       + 5 + this.ay;
        let bottom1 = top1 + this.h  - 7;

        //物体2
        let left2 = (obj.x>>4)      + 2;
        let right2 = left2 + obj.w  - 4; 
        let top2 = (obj.y>>4 )      + 5 + obj.ay;
        let bottom2 = top2 + obj.h  - 7;

        return(left1 <= right2 &&
            right1 >= left2 &&
            top1 <= bottom2 &&
            bottom1 >= top2);
    }

    //更新処理
    update() {
        if(this.vy < 64) this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;
        if((this.y>>4) > FIELD_SIZE_H * 16) this.kill = true;
    }

    //描画処理
    draw() {
        let an = this.sp;
        let sx = (an&15)<<4;
        let sy = (an>>4)<<4;
        let px = (this.x>>4) - (field.scx);
        let py = (this.y>>4) - (field.scy);
        let s;
        if(this.sz) s = this.sz;
        else s = 16;
        vcon.drawImage(chImg, sx, sy, 16, s, px, py, 16, 16);
    }
}

