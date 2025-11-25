//
//
//
//スプライトの基本クラス
class ScorePop {
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

    //更新処理
    update() {
        if(this.vy < 64) this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;
        if((this.y>>4) > FIELD_SIZE_H * 16) this.kill = true;
    }

    //描画処理
    draw() {
        con.drawImage(chImgB, x, y, vx, vy);
    }
}

