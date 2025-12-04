//
//おじさんクラス
//
class Ojisan {
    constructor(x, y) {
        this.x = x<<4;
        this.y = y<<4;
        this.ay = 16;
        this.w = 16;
        this.h = 16;
        this.vx = 0;
        this.vy = 0;
        this.anim = 0;
        this.snum = 0;
        this.acou = 0;
        this.dirc = 0;
        this.coinCount = 0;
        this.coinGet = false;
        this.MAX_COUNT = 5;
        this.jump = 0;
        this.kinoko = 0;
        this.coin = 0;
        this.type = TYPE_MINI;
        this.reload = 0;
        //this.button = document.getElementById("Bbtn");
        //this.shootfireball = 0;
        this.scoreValue = 100;
        //this.coinValue = 1;
        this.loseValue = -100;
        this.kill = false;
        this.kuriboHit = 0;
        this.kuriboAttack = 0;
        this.togezoHit = 0;
        this.togezoAttack = 0;
        this.nokonokoHit = 0;
        this.nokonokoAttack = 0;
        this.fire = 0;
        this.isGoal = false;
    }

    //床の判定
    checkFloor() {
        if(this.vy <= 0) return;
        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);
        let p = this.type == TYPE_MINI?2:0;

        if(field.isBlock(lx + 1 + p, ly + 31) ||
          field.isBlock(lx + 14 - p, ly + 31)) { 
            if(this.anim == ANIME_JUMP) this.anim = ANIME_WALK;
            this.jump = 0;
            this.vy = 0;
            this.y = ((((ly + 31)>>4)<<4) - 32)<<4;
        }
    }

    //天井の判定
    checkCeil() {
        if(this.vy >= 0) return;
        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);
        let ly2 = ly + (this.type == TYPE_MINI?21:5);
        let bl;
        if(bl = field.isBlock(lx + 8, ly2)) { 
            this.jump = 15;
            this.vy = 0;
            let x = (lx + 8)>>4;
            let y = (ly2)>>4;

            //ブロック別のアイテム生成(ランダム)
            if(bl == 371) { //ブロックAの場合
                const randomValueA = Math.floor(Math.random() * 4); //0,1,2,3
                switch(randomValueA) {
                    case 0:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(234, x, y, 0, 0, ITEM_KINO));
                        break;
                    case 1:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(384, x, y, 0, 0, ITEM_COIN));
                        score += SCORE_COIN;
                        coinSound.play();
                        break;
                    case 2:
                        block.push(new Block(368, x, y));
                        item.push(new Item(254, x, y, 0, 0, ITEM_FIRE));
                        break;
                    case 3:
                        blbSound.currentTime = 0; //連続再生
                        blbSound.play();
                        block.push(new Block(bl, x, y, 1, 20, -60));
                        block.push(new Block(bl, x, y, 1, -20, -60));
                        block.push(new Block(bl, x, y, 1, 20, -20));
                        block.push(new Block(bl, x, y, 1, -20, -20));
                        break;
                }
            }

            if(bl == 368) { //？ブロックAの場合
                const randomValueB = Math.floor(Math.random() * 4); //0,1,2,3
                switch(randomValueB) {
                    case 0:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(234, x, y, 0, 0, ITEM_KINO));
                        break;
                    case 1:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(384, x, y, 0, 0, ITEM_COIN));
                        score += SCORE_COIN;
                        coinSound.play();
                        break;
                    case 2:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        if(this.type == TYPE_BIG) {
                        item.push(new Item(254, x, y, 0, 0, ITEM_FIRE));
                        }
                        break;
                    case 3:
                        item.push(new Item(384, x, y, 0, 0, ITEM_COIN));
                        score += SCORE_COIN;
                        coinSound.play();
                        item.push(new Item(384, x + 1, y, 0, 0, ITEM_COIN));
                        item.push(new Item(384, x + 2, y, 0, 0, ITEM_COIN));
                        item.push(new Item(384, x + 3, y, 0, 0, ITEM_COIN));
                        kuribo.push(new Kuribo(97, x + 4, 0, 0, 0, ITEM_KURIBO));
                        block.push(new Block(374, x, y));
                        break;
                }
            }

            if(bl == 496) { //？ブロックBの場合
                const randomValueC = Math.floor(Math.random() * 4); //0,1,2,3
                switch(randomValueC) {
                    case 0:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(234, x, y, 0, 0, ITEM_KINO));
                        break;
                    case 1:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(384, x, y, 0, 0, ITEM_COIN));
                        score += SCORE_COIN;
                        coinSound.play();
                        break;
                    case 2:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        if(this.type == TYPE_BIG) {
                        item.push(new Item(254, x, y, 0, 0, ITEM_FIRE));
                        }
                        break;
                    case 3:
                        block.push(new Block(373, x, y));
                        item.push(new Item(234, x, y, 0, 0, ITEM_KINO));
                        break;
                }
            }

            if(bl == 373) { //ブロックBの場合
                const randomValueC = Math.floor(Math.random() * 4); //0,1,2,3
                switch(randomValueC) {
                    case 0:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(234, x, y, 0, 0, ITEM_KINO));
                        break;
                    case 1:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        item.push(new Item(384, x, y, 0, 0, ITEM_COIN));   
                        score += SCORE_COIN;
                        coinSound.play();
                        break;
                    case 2:
                        block.push(new Block(bl, x, y)); //ブロックを揺らす
                        if(this.type == TYPE_BIG) {
                        item.push(new Item(254, x, y, 0, 0, ITEM_FIRE));
                        }
                        break;
                    case 3:
                        item.push(new Item(486, x, y, 0, 0, ITEM_KUSA));
                        block.push(new Block(374, x, y));
                        break;
                }
            }

            if(bl == 374) { //ブロックCの場合
                return;
            }

            if(bl == 499) { //ブロックD(隠)の場合
                return;
            }

            if(bl == 493) {
                //block.push(new Block(493, x, y, 0, 0));
                block.push(new Block(499, x, y, 0, 0, 0));
                item.push(new Item(499, x, y, 0, 0, ITEM_FLAG));
                item.push(new Item(493, x, y, 0, 0, ITEM_FLAG));
                this.isGoal = true;
                this.anim = ANIME_FLAG;
                this.y -= 200;
                this.x += 50;
                this.vy = 0;
                setTimeout(() => {
                    //this.anim = ANIME_WALK;
                    this.vx = 2;
                    this.x += this.vx;
                },1000);

            }
50
            /*if(bl == 496) {
                if(this.type == TYPE_MINI) {
                    block.push(new Block(bl, x, y));
                } else {
                    this.coincount++;
                    item.push(new Item(384, x, y, 0, 0, ITEM_COIN));
                    if(this.coincount == this.MAX_COUNT) { 
                        block.push(new Block(374, x, y));
                        hahaSound.play();
                        this.coincount = 0;
                        return;
                    }
                }      
            }*/
        }     
    }

    //横の壁の判定
    checkWall() {
        let lx = ((this.x + this.vx)>>4);
        let ly = ((this.y + this.vy)>>4);
        let p = this.type == TYPE_MINI?16+8:9;
        //右側のチェック
        if(field.isBlock(lx + 15, ly + p)  ||
            (this.type == TYPE_BIG && (
           field.isBlock(lx + 15, ly + 15) ||
           field.isBlock(lx + 15, ly + 24)))) { 
            this.vx = 0;
            this.x -= 8;
        }
        else
            //左側のチェック
        if(field.isBlock(lx, ly + 9)  ||
            (this.type == TYPE_BIG && (
           field.isBlock(lx, ly + 15) ||
           field.isBlock(lx, ly + 24)))) { 
            this.vx = 0;
            this.x += 8;
        }
    }

    //ジャンプ処理
    updateJump() {
        //ジャンプ
        if(keyb.ABUTTON) {
            if(this.jump == 0) {
                jumpSound.currentTime = 0; //連続再生
                jumpSound.play();
                this.anim = ANIME_JUMP;
                this.jump = 1;
            }
            if(this.jump < 15) this.vy = -(64 - this.jump) ;
        }
        if(this.jump) this.jump++; 
    }

    //横方向の移動
    updateWalkSub(dir) {
        //最高速まで加速
        if(dir == 0 && this.vx < MAX_SPEED) this.vx ++;
        if(dir == 1 && this.vx > -MAX_SPEED) this.vx --;
        //ジャンプしてない時
        if(!this.jump) {
            //立ちポーズだった時はカウンタリセット
            if(this.anim == ANIME_STAND) this.acou = 0;
            //アニメを歩きアニメ
            this.anim = ANIME_WALK;
            //方向を設定
            this.dirc = dir;
            //逆方向の時はブレーキをかける
            if(dir == 0 && this.vx < 0) this.vx++;
            if(dir == 1 && this.vx > 0) this.vx--;
            //逆に強い加速の時はブレーキアニメ
            if(dir == 1 && this.vx > 8 ||
                dir == 0 && this.vx < -8)
                this.anim = ANIME_BRAKE;
        }
    }

    //歩く処理
    updateWalk() {
        //横移動
        if(keyb.Left) {
            this.updateWalkSub(1);
        } else if(keyb.Right) {
            this.updateWalkSub(0);
        } else {
            if(!this.jump) {
                if(this.vx > 0) this.vx -= 1;
                if(this.vx < 0) this.vx += 1;
                if(!this.vx) this.anim = ANIME_STAND;
            }
        }
    }

    //ファイアボールの発射
    shootFireball() {
        if(keyb.FBBUTTON && this.type == TYPE_FIRE && this.reload ==0) {
            this.snum =263;
            if(this.dirc) this.snum += 48; //左向きは+48を使う
            this.reload =20;
            fireSound.currentTime = 0; //連続再生
            fireSound.play();
            let direc = this.dirc;
            if(this.dirc == 1) {direc = -1;} else {direc = 1;}
            fireball.push(new Fireball(112, this.x>>4, this.y>>4, direc, ITEM_FIREB));
                setTimeout(() => {
                    keyb.FBBUTTON = false;
                    //if(this.reload > 0) this.reload = 0; 
                }, 300);
        }
            //if(this.reload > 0) this.reload--;    
    }
   
    //スプライトを変える処理
    updateAnim() {
        //スプライトの決定
        switch(this.anim) {
            case ANIME_STAND:
                this.snum = 0;
                break;
            case ANIME_WALK:
                this.snum = 2 + ((this.acou / 6) % 3); //3で割る0,1,2
                break;
            case ANIME_JUMP:
                this.snum = 6;
                break;
            case ANIME_BRAKE:
                this.snum = 5;
                break;
            case ANIME_FLAG:
                this.snum = 8;
                break;
        }
        //ちっちゃいおじさんの時は+32
        if(this.type == TYPE_MINI) {
            this.snum += 32;
            if(this.dirc) {
                this.snum += 48; //左向きは+48を使う
            }
        }
        //ちっちゃいおじさんの時は+0
        if(this.type == TYPE_BIG) {
            this.snum += 0;
            if(this.dirc) {
                this.snum += 48; //左向きは+48を使う
            }
        }
         //ファイアおじさんの時は+256
        if(this.type == TYPE_FIRE) {
            if(keyb.FBBUTTON){
                this.snum += 263;
            } else {
                this.snum += 256;}
            if(this.dirc) {
                this.snum += 48; //左向きは+48を使う
            }
        }
    }

    //ゲームオーバー判定
    checkGameOver() {
        if(this.y > 2850 || lifePoint < 0.5) { //崖に落ちたら,マイナス1000点で
            triggerGameOver();
            wahSound.play();
            gameoverSound.play();    
            this.y = 1000;
            this.vy -= 300;
            if(lifePoint < 0) { lifePoint = 0;}
            this.kill =true;
        }
    }

    //毎フレーム毎の更新処理
    update() {
        //キノコを採った時のエフェクト
        if(this.kinoko) {
            if(this.type == TYPE_FIRE) {
                this.kinoko = 0;
            } else {
                //pupSound.currentTime = 0; //連続再生
                pupSound.play();
                let anim = [32, 14, 32, 14, 32, 14,  0, 32, 14, 0];
                //let anim = [14, 32, 14, 32, 14, 32,  32, 0, 14, 32];
                this.snum = anim[this.kinoko>>2];
                this.h = this.snum == 32?16:32;
                if(this.dirc) this.snum += 48; //左向きは+48を使う
                if(++this.kinoko == 40)/*anim.length<<4*/ {
                    yafuSound.play();
                    this.type = TYPE_BIG;
                    this.ay = 0;
                    this.kinoko = 0; 
               }
            }
            return;
        }
        
        //コインを取った時のエフェクト
        if(this.coinGet) {
            this.coinGet = false;
            score += SCORE_COIN;
            coinc++;
            const coinSound = new Audio("./audio/mrocoin.mp3");
            coinSound.play();
            /*if(++this.coinCount >= 15) {
                hahaSound.play();
                this.coinCount = 0;
            } */
        } 
        
        //クリボとの戦いの時のエフェクト
        //LOSE_ぶつかった時
        if(this.kuriboHit) {
            //ludSound.currentTime = 0; //連続再生
            lvdSound.play();
            this.y -= 8;
            this.snum = 94;
            this.h = this.snum == 94?16:32;
            lifePoint += this.loseValue / 100;
            this.loseValue = 0;
            if(++this.kuriboHit == 40) {
               this.kuriboHit = 0; 
               miyaSound.play();
               this.snum = 32;
               this.h = this.snum == 32?16:32;
               this.type = TYPE_MINI;
               this.ay = 16;
               this.loseValue = -100;
            }
            return;
        } 
        //WIN_踏んだ時
        if(this.kuriboAttack) {
            fumuSound.play();
            if(this.type == TYPE_BIG) {
                this.snum =6;
            } else if(this.type == TYPE_FIRE){
                this.snum = 262;
            } else{
                this.snum = 38; 
            } 
            if(this.dirc) this.snum += 48; //左向きは+48を使う
            this.y -= 12;
            if(this.dirc) {this.x -= 20;
            } else {this.x += 20;} 
            if(++this.kuriboAttack == 20) {
               this.kuriboAttack = 0; 
               yaSound.play();
            }
            return;
        }

        //トゲゾーとの戦いの時のエフェクト
        //LOSE_ぶつかった時
        if(this.togezoHit) {
            //lvdSound.currentTime = 0; //連続再生
            lvdSound.play();
            this.y -= 8;
            this.snum = 94;
            this.h = this.snum == 94?16:32;
            lifePoint += this.loseValue / 100;
            this.loseValue = 0;
            if(++this.togezoHit == 40) {
               this.togezoHit = 0; 
               miyaSound.play();
               this.snum = 32; 
               this.h = this.snum == 32?16:32;
               this.type = TYPE_MINI;
               this.ay = 16;
               this.loseValue = -100;
            }
            return;
        } 
        //LOSE_踏んだ時
        if(this.togezoAttack) {
            fumuSound.play();
            if(this.type == TYPE_BIG) {
                this.snum =6;
            } else if(this.type == TYPE_FIRE){
                this.snum = 262;
            } else{
                this.snum = 38; 
            }  
            if(this.dirc) this.snum += 48; //左向きは+48を使う
            this.y -= 8;
            if(++this.togezoAttack == 40) {
               this.togezoAttack = 0; 
               yaSound.play();
            }
            return;
        }

        //ノコノコとの戦いの時のエフェクト
        //LOSE_ぶつかった時
        if(this.nokonokoHit) {
            //lvdSound.currentTime = 0; //連続再生
            lvdSound.play();
            this.y -= 8;
            this.snum = 94;
            this.h = this.snum == 94?16:32;
            lifePoint += this.loseValue / 100;
            this.loseValue = 0;
            if(++this.nokonokoHit == 40) {
               this.nokonokoHit = 0; 
               miyaSound.play();
               this.snum = 32; 
               this.h = this.snum == 32?16:32;
               this.type = TYPE_MINI;
               this.ay = 16;
               this.loseValue = -100;
            }
            return;
        } 
        //WIN_踏んだ時
        if(this.nokonokoAttack) {
            fumuSound.play();
            if(this.type == TYPE_BIG) {
                this.snum =6;
            } else if(this.type == TYPE_FIRE){
                this.snum = 262;
            } else{
                this.snum = 38; 
            } 
            if(this.dirc) this.snum += 48; //左向きは+48を使う
            this.y -= 12;
            if(this.dirc) {this.x -= 20;
            } else {this.x += 20;} 
            if(++this.nokonokoAttack == 20) {
               this.nokonokoAttack = 0; 
               yaSound.play();
            }
            return;
        }

        //ファイアフラワーを採った時のエフェクト
        if(this.fire) {
            //pupSound.currentTime = 0; //連続再生
            pupSound.play();
            let anim = [256, 0, 256, 0, 256, 0, 256, 0, 256, 0];
            this.snum = anim[this.fire>>2];
            this.h = this.snum == 32?16:32;
            if(this.dirc) this.snum += 48; //左向きは+48を使う
            if(++this.fire == 40) {
                hahaSound.play();
                this.type = TYPE_FIRE;
                this.ay = 0;
                this.fire = 0; 
            }
            return;
        }

        //アニメのカウンタ
        this.acou++;
        if(Math.abs(this.vx) == MAX_SPEED) this.acou++;
        this.updateAnim();

        this.updateJump();
        this.updateWalk();
        this.shootFireball();
        if(this.reload > 0) this.reload--;    
        this.checkGameOver();
        
        //重力・空気抵抗
        if(this.isGoal) {
            this.vy += GOAL_GRAVITY;
        } else {
            if(this.vy < AIR_RESIST) this.vy += GRAVITY; //重力空気抵抗
        }
         
        //横の壁のチェック
        this.checkWall();

        //床のチェック
        this.checkFloor();

        //天井のチェック
        this.checkCeil();

        //実際に座標を変えてる
        this.x += this.vx;
        this.y += this.vy;
    }

    //毎フレーム毎の描画処理
    draw() {
        let px = (this.x>>4) - field.scx;
        let py = (this.y>>4) - field.scy;
        let sx = (this.snum&15)<<4;
        let sy = (this.snum>>4)<<4;
        let w = this.w;
        let h = this.h;
        py += (32 - h); 
        vcon.drawImage(chImg, sx, sy, w, h, px, py, w, h);
    }
}